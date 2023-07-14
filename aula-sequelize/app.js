const express = require("express");
const app = express();
const porta = 3000;
const { Sequelize, where } = require("sequelize");
// Node.js body parsing middleware.
var bodyParser = require("body-parser");
//configuracao de uso do body-parser
//parse application/x-www-form-urlencoded (dados vem no body da req. HTTP)
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json (se os dados viessem em formato JSON na requisição)
//app.use(bodyParser.json())

//declara um diretório padrão
//para o node carregar arquivos estáticos
app.use(express.static("public"));

const sequelize = new Sequelize("aprender_bd", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("conexão com o banco de dados realizada com sucesso");
  })
  .catch(() => {
    console.log("erro ao realizar a conexão com o banco de dados");
  });

//cria o modelo Estudante (representa a tabela alunos no BD)
const Estudante = sequelize.define(
  "alunos",
  {
    //colunas da tabela alunos no banco de dados
    codigo: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: Sequelize.STRING(30), allowNull: false },
    idade: { type: Sequelize.INTEGER, allowNull: false },
  },
  {
    //configurações
    createdAt: false, //tabela do bd sem este campo padrao do Sequ.
    updatedAt: false, //tabela do bd sem este campo padrao do Sequ.
  }
);

app.get("/", (req, res) => {
  res.redirect("/teste-listar-estudantes");
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/public/pages/cadastro.html");
});

app.post("/inserir-estudante", (req, res) => {
  var umEstudanteObjeto = {
    nome: req.body.nome,
    idade: parseInt(req.body.idade),
  };

  //create - comando para inserir o objeto no banco
  Estudante.create(umEstudanteObjeto);
  res.redirect("/teste-listar-estudantes");
});

app.get("/teste-alterar-no-banco", (req, res) => {
  var umEstudanteObjetoIdadeNova = {
    nome: "Fulano Silva", //opcional por, pois alterou so a idade
    idade: "55", //alterada apenas o valor da idade
  };
  //update --> altera o objeto no banco
  //where codigo = 4
  Estudante.update(
    umEstudanteObjetoIdadeNova,

    {
      where: { codigo: 4 },
    }
  );

  res.send("registro alterado com sucesso no bd");
});

app.get("/excluir-aluno/:id", (req, res) => {
  var codigoEstudanteExcluir = parseInt(req.params.id);
  //destroy --> deleta um objeto da aplicacao no banco
  //where codigo = codigoEstudanteExcluir
  Estudante.destroy({
    where: { codigo: codigoEstudanteExcluir },
  });
  res.redirect("/teste-listar-estudantes");
});

app.get("/alterar-estudante/:codigo/:nomeNovo", (req, res) => {
  var codigo = parseInt(req.params.codigo);

  var estudanteAlterar = { nome: req.params.nomeNovo };
  Estudante.update(estudanteAlterar, {
    where: {
      codigo: codigo,
    },
  });

  res.redirect("/teste-listar-estudantes");
});

app.get("/teste-listar-estudantes", (req, res) => {
  //o comando FindAll lista todos os objetos do banco
  //equivale ao select * from tabela

  Estudante.findAll({
    attributes: ["codigo", "nome", "idade"],
    order: [["nome", "DESC"]], //ordenar por nome, ASC
    raw: true, // <-- Retornar um array de objetos
  })
    .then((estudantes) => {
      //chamamos o array de objeto de ‘estudantes’ acima
      if (Array.isArray(estudantes)) {
        //gerando a tabela HTML
        var html = "<table border='1'>";
        html += `<tr>
    
    <th>Código</th>
    <th>Nome</th>
    <th>Idade</th>
    <th>Ações</th>
    </tr>`;

        //para cada objeto estudante, cria a linha dele na tabela HTML
        estudantes.forEach((estudante) => {
          html += `<tr>
    
    <td>${estudante.codigo}</td>
    <td>${estudante.nome}</td>
    <td>${estudante.idade}</td>
    <td> <a href="/excluir-aluno/${estudante.codigo}">X</a></td>
    </tr>`;
        });
        html += "</table>";
        //enviando a resposta HTML
        res.send(html);
      } else {
        res.send("Não foram encontrados estudantes.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao obter estudantes.");
    });
});

app.listen(porta, () => {
  console.log(`Aplicação web executando em http://localhost:${porta}`);
});
