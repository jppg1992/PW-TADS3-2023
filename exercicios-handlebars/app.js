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

app.get("/exemplo-usuario-complexo", (req, res) => {
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

app.get("/exemplo-array-usuarios", (req, res) => {
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

app.get("/operacoes-fundamentais/:num1/:num2", (req, res) => {
  const n1 = parseFloat(req.params.num1);
  const n2 = parseFloat(req.params.num2);

  const operacoes = {
    n1,
    n2,
    soma: n1 + n2,
    subtracao: n1 - n2,
    multiplicacao: n1 * n2,
    divisao: (n1 / n2).toFixed(2),
  };
  res.render("operacoes", { operacoes });
});

app.get("/mostrar-dois-objetos", (req, res) => {
  const objetos = {
    empresa: {
      nome: "Santa Clara Material Ortopédico",
      cnpj: "123456789.001/23",
      tel: "(53) 3085-4586",
      end: "Av. Ipiranga, 2.742",
    },
    gato: {
      nome: "Fred",
      idade: 5,
      peso: 2.8,
    },
  };

  res.render("objetos", { objetos });
});

app.get("/", (req, res) => {
  res.redirect("/exemplo-usuario");
});

app.listen(porta, ipDoServidor, () => {
  console.log(
    "\n Aplicacao web executando em http://" + ipDoServidor + ":" + porta
  );
});
