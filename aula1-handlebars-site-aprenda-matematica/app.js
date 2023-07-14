const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const porta = 8085;
const ipDoServidor = "127.0.0.1";

// Configurar o Handlebars como o motor de templates da aplicacao
app.engine(
  ".handlebars",
  exphbs.engine({ extname: ".handlebars", defaultLayout: "main" })
);
app.set("view engine", "handlebars");

//rotas:
app.get("/exemplo-usuario", function (req, res) {
  var umUsuarioTeste = {
    nome: "João Godinho",
    telefone: "99953-3642",
    email: "j_paulo_g@hotmail..com",
    endereco: {
      rua: `Rua Otávio Santos`,
      nro: "140",
      bairro: "Sante Cecilia",
      cidade: "Bagé",
      uf: "RS",
      cep: "96400-000",
      complemento: "Perto Antigo Campo do Brasil",
    },
  };

  res.render("mensagem", { usuario: umUsuarioTeste }); //chama o método
  // render que renderiza o template mensagem.handlebars, armazenado
  // no diretório Views do projeto, e passando um objeto umUsuarioTeste
});

app.get("/exemplo-usuario-complexo", function (req, res) {
  var usuarioObjComplexo = {
    nome: "Cláudia Castro Rodrigues ALterada",
    telefone: "(53)99792-1296",
    email: "claudiarodriguesalterada@gmail.com",
    endereco: {
      rua: "Santa Clara Alterada",
      numero: "2583 Alt",
      complemento: "Apto 510 Alterado",
      cidade: "Bagé Alterada",
      uf: "RS",
    },
  };

  res.render("mensagem_2", { usuario_novo: usuarioObjComplexo });
  //chama o método render que renderiza o template mensagem_2.handlebar,
  //armazenado no diretório Views do projeto, e passando um objeto
  //usuarioObjComplexo
});

app.get("/exemplo-array-usuarios", function (req, res) {
  var qtdCidades = 4;
  var cidadeArray = [
    { cidade: "Bagé", estado: "RS" },
    { cidade: "Curitiba", estado: "PR" },
    { cidade: "Florianópolis", estado: "SC" },
    { cidade: "Porto Alegre", estado: "RS" },
    { cidade: "Dom Pedrito", estado: "RS" },
    { cidade: "São Paulo", estado: "SP" },
    { cidade: "Natal", estado: "RN" },
  ];
  res.render("cidades", {
    saida: { qtdCidades: qtdCidades, array_de_cidades: cidadeArray },
  });
  //chama o método render que renderiza o template cidades.handlebar,
  //armazenado no diretório Views do projeto, e passando um objeto
  //array_de_cidades
});

app.get("/", (req, res) => {
  res.redirect("/exemplo-usuario");
});

app.listen(porta, ipDoServidor, () => {
  console.log(
    "\n Aplicacao web executando em http://" + ipDoServidor + ":" + porta
  );
});
