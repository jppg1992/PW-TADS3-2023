const express = require("express");
const app = express();
const porta = 3001;
const ipDoServidor = "127.0.0.1";

//inclui o componente body-parser na aplicacao
const bodyParser = require("body-parser");

//configuracao de uso do body-parser
//parse application/x-www-form-urlencoded
// (dados vem no body da req. HTTP)
app.use(bodyParser.urlencoded({ extended: false }));

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

app.get("/inserir-noticia", function (req, res) {
  pool.query(
    ` INSERT INTO noticias ( titulo, resumo, conteudo,
data_criacao) VALUES ( 'titulo teste', 'resumo teste', 'conteudo
teste', now())`,
    (error, results, fields) => {
      if (error) throw error;
      //senao esta conectado!
    }
  );
  res.send("noticia cadastrada com sucesso");
});
app.get("/listar-noticias", (req, res) => {
  pool.query(
    `SELECT codigo, titulo, resumo 
                  FROM noticias 
                  ORDER BY data_criacao DESC`,
    function (error, result, fields) {
      if (error) return error;
      var saidaHTMLListar = "<h2>Lista de Notícias</h2>";
      saidaHTMLListar =
        saidaHTMLListar + "<table border='1'style='width:100%'> ";

      saidaHTMLListar = saidaHTMLListar + "<tr> ";
      saidaHTMLListar =
        saidaHTMLListar + "<th>código</th><th>título</th><th>resumo</th>";

      saidaHTMLListar = saidaHTMLListar + "</tr> ";
      // para cada linha da tabela no BD - gera a linha de tabela HTML
      Object.keys(result.rows).forEach(function (key) {
        //console.log(row.nome + " " + row.turma)
        var row = result.rows[key];
        console.log("🚀 ~ file: app.js:59 ~ key:", row);
        saidaHTMLListar = saidaHTMLListar + "<tr> ";
        saidaHTMLListar =
          saidaHTMLListar +
          " <td>" +
          row.codigo +
          "</td><td>" +
          row.titulo +
          "</td><td>" +
          row.resumo +
          "</td>";

        saidaHTMLListar = saidaHTMLListar + "</tr> ";
      });
      saidaHTMLListar = saidaHTMLListar + "</table>";
      res.send(saidaHTMLListar);
    }
  );
});
app.get("/consultar-noticia/:codigo", (req, res) => {
  var codigo = req.params.codigo;
  //res.send("rota consultar a noticia de codigo = "+codigo)
  pool.query(
    "SELECT * FROM noticias WHERE codigo = " + codigo,
    function (error, results, fields) {
      if (error) {
        console.error("Erro ao executar a consulta:", error);
        res.status(500).send("Erro ao consultar o registro");
      } else {
        if (results.length === 0) {
          res.status(404).send("Registro não encontrado");
        } else {
          const registro = results.rows[0];
          res.send(`
  
  <h1>Dados do Registro</h1>
  <p><b>Código:</b> ${registro.codigo}</p>
  <p><b>Título:</b> ${registro.titulo}</p>
  <p><b>Conteúdo:</b> ${registro.conteudo}</p>
  <p><b>Data de criação:<b> ${registro.data_criacao}</p>
  `);
        }
      }
    }
  );
});

app.get(`/form-cadastrar-noticia`, (req, res) => {
  res.sendFile(__dirname + "/pages/cadastro-noticia.html");
});

app.post("/processar-cadastrar-noticia", (req, res) => {
  var titulo = req.body.titulo;
  var resumo = req.body.resumo;
  var conteudo = req.body.conteudo;

  pool.query(
    ` INSERT INTO noticias ( titulo, resumo, conteudo,
data_criacao) VALUES ( '${titulo}',
'${resumo}', '${conteudo}', now())`,
    (error, results, fields) => {
      if (error) throw error;
      //senao esta conectado!
    }
  );
  res.redirect("/listar-noticias");
});

app.post("/excluir-noticia/:codigo", (req, res) => {});

app.listen(porta, ipDoServidor, () => {
  console.log(
    "\n Aplicacao web executando em http://" + ipDoServidor + ":" + porta
  );
});
