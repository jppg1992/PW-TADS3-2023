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
    qtd_pizzas_grandes: { type: Sequelize.INTEGER, allowNull: false },
    qtd_pizzas_medias: { type: Sequelize.INTEGER, allowNull: false },
    qtd_pizzas_pequenas: { type: Sequelize.INTEGER, allowNull: false },
    tele_entrega: { type: Sequelize.BOOLEAN, allowNull: false },
    total_a_pagar: { type: Sequelize.DOUBLE, allowNull: false },
    pedido_enviado: { type: Sequelize.BOOLEAN, defaultValue: false },
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
  res.render("home");
});

app.get("/pedidos", (req, res) => {
  Pedido.findAll({
    attributes: ["*"],
    order: [["data_hora", "DESC"]], //ordenar por nome, ASC
    raw: true, // <-- Retornar um array de objetos
  }).then((pedidos) => {
    //chamamos o array de objeto de ‘estudantes’ acima
    if (Array.isArray(pedidos)) {
      const pedidosTratados = pedidos.map((p) => {
        return {
          ...p,
          data_hora: new Date(p.data_hora).toLocaleString("pt-BR", {
            timezone: "UTC",
          }),
          tele_entrega: p.tele_entrega ? "Sim" : "Não",
          pedido_nao_enviado: p.pedido_enviado ? false : true,
        };
      });
      res.render("pedidos", { pedidos: pedidosTratados });
    }
  });
});

app.get("/novo-pedido", (req, res) => {
  res.sendFile(__dirname + "/public/static-pages/form-pedido.html");
});

app.post("/inserir-pedido", (req, res) => {
  pedido = {
    cliente_nome: req.body.nome,
    cliente_endereco: req.body.endereco,
    qtd_pizzas_grandes: parseInt(req.body.pizzaG),
    qtd_pizzas_medias: parseInt(req.body.pizzaM),
    qtd_pizzas_pequenas: parseInt(req.body.pizzaP),
    tele_entrega: req.body.tipo_entrega === "tele",
    total_a_pagar: parseFloat(req.body.total),
  };

  Pedido.create(pedido).then(
    (pedido) => {
      res.render("cadastrado", {
        pedido: pedido.codigo_pedido,
        total: pedido.total_a_pagar,
      });
    },
    (error) => {
      res.send("erro: ", new Error(error).message);
    }
  );
});

app.get("/enviar-pedido/:codigo", (req, res) => {
  const cod = parseInt(req.params.codigo);

  Pedido.update(
    { pedido_enviado: true },
    {
      where: {
        codigo_pedido: cod,
      },
    }
  )
    .then(() => {
      res.render("enviado");
    })
    .catch((error) => {
      res.render("Erro ao enviar pedido: ", {
        msg: new Error(error).message,
      });
    });
});

app.get("/pesquisar-pedido", (req, res) => {
  res.render("pesquisa");
});

app.post("/carregar-pedido", (req, res) => {
  const codigo = parseInt(req.body.pedido);

  Pedido.findByPk(codigo).then((p) => {
    console.log("🚀 ~ file: app.js:148 ~ Pedido.findByPk ~ p:", p);

    if (p) {
      const pedidoTratado = {
        ...p.dataValues,
        data_hora: new Date(p.dataValues.data_hora).toLocaleString("pt-BR", {
          timezone: "UTC",
        }),
        tele_entrega: p.dataValues.tele_entrega ? "Sim" : "Não",
        pedido_enviado: p.dataValues.pedido_enviado ? "Sim" : "Não",
      };

      res.render("dados-pedido", { pedido: pedidoTratado });
    } else {
      res.render("erro", { msg: "Erro: Pedido não encontrado" });
    }
  });
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
