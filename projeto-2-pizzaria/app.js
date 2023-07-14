const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const path = require("path");

const port = 3000;
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

const sequelize = new Sequelize("pizzaria_do_luigi", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

//cria o modelo Estudante (representa a tabela alunos no BD)
const Pedido = sequelize.define(
  "pedidos",
  {
    //colunas da tabela alunos no banco de dados
    codigo_pedido: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cliente_nome: { type: Sequelize.STRING(40), allowNull: false },
    cliente_endereco: { type: Sequelize.STRING(80), allowNull: false },
    qtd_pizzzas_grandes: { type: Sequelize.INTEGER, allowNull: false },
    qtd_pizzas_medias: { type: Sequelize.INTEGER, allowNull: false },
    qtd_pizzas_pequenas: { type: Sequelize.INTEGER, allowNull: false },
    tele_entrega: { type: Sequelize.BOOLEAN, allowNull: false },
    total_a_pagar: { type: Sequelize.DOUBLE, allowNull: false },
    data_hora: { type: Sequelize.DATE, allowNull: false },
  },
  {
    //configurações
    createdAt: false, //tabela do bd sem este campo padrao do Sequ.
    updatedAt: false, //tabela do bd sem este campo padrao do Sequ.
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("conexão com o banco de dados realizada com sucesso");
  })
  .catch(() => {
    console.log("erro ao realizar a conexão com o banco de dados");
  });
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./public/views");

app.get("/", (req, res) => {
  Pedido.findAll({
    attributes: ["*"],
    order: [["data_hora", "DESC"]], //ordenar por nome, ASC
    raw: true, // <-- Retornar um array de objetos
  }).then((pedidos) => {
    //chamamos o array de objeto de ‘estudantes’ acima
    if (Array.isArray(pedidos)) res.render("home", pedidos);
  });
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
