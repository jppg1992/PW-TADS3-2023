const express = require("express");
const app = express();
const porta = 8085;
const ipDoServidor = "127.0.0.1";

//inclui o componente body-parser na aplicacao
const bodyParser = require("body-parser");

//configuracao de uso do body-parser
//parse application/x-www-form-urlencoded
// (dados vem no body da req. HTTP)
app.use(bodyParser.urlencoded({ extended: false }));

//rotas:
app.get("/", (req, res) => {
  res.redirect("/form-media-provas");
});

app.get("/form-media-provas", (req, res) => {
  res.sendFile(__dirname + "/pages/formulario.html");
});

app.post("/calcular-media-provas", function (req, res) {
  //obtem os dados da requisicao, e faz a comversao para Integer
  var valor_nota_1 = parseInt(req.body.cp_nota_p1);
  var valor_nota_2 = parseInt(req.body.cp_nota_p2);
  var valor_nota_3 = parseInt(req.body.cp_nota_p3);
  //processar dados
  var media = (valor_nota_1 + valor_nota_2 + valor_nota_3) / 3;
  //montar dinamicamente a saida
  var html_montado = "<h3>dados processados com sucesso</h3>";
  html_montado = html_montado + "média = " + media;
  if (media > 6) {
    html_montado = html_montado + "<br /> situação = aprovado(a)";
  } else {
    html_montado = html_montado + "<br /> situação = reprovado(a)";
  }
  //enviar a saida montada ao cliente
  res.send(html_montado);
});

app.get("/calcular-media-provas-exemplo-2", (req, res) => {
  //obtem os dados da requisicao, e faz a comversao para Integer
  var valor_nota_1 = parseInt(req.query.cp_nota_p1);
  var valor_nota_2 = parseInt(req.query.cp_nota_p2);
  var valor_nota_3 = parseInt(req.query.cp_nota_p3);
  //processar dados
  var media = (valor_nota_1 + valor_nota_2 + valor_nota_3) / 3;
  //montar dinamicamente a saida
  var html_montado = "<h3>dados processados com sucesso VIA MÉTODOGET</h3>";
  html_montado =
    html_montado +
    "parâmetros pegos da URL = " +
    valor_nota_1 +
    ", " +
    valor_nota_2 +
    " e " +
    valor_nota_3 +
    " <br /><br />";

  html_montado = html_montado + "média = " + media;

  if (media > 6) {
    html_montado = html_montado + "<br /> situação = aprovado(a)";
  } else {
    html_montado = html_montado + "<br /> situação = reprovado(a)";
  }
  //enviar a saida montada ao cliente
  res.send(html_montado);

  res.send("entrou");
});

app.get("/form-avancado", (req, res) => {
  res.sendFile(__dirname + "/pages/form-avancado.html");
});

app.post("/processar-dados-form2", (req, res) => {
  var pagina_dinamica = " ";
  pagina_dinamica = pagina_dinamica + "<br /> nome = " + req.body.nome_pessoa;
  pagina_dinamica = pagina_dinamica + "<br /> idade = " + req.body.idade;

  pagina_dinamica =
    pagina_dinamica + "<br /> cidade = " + req.body.cidade_atual;
  pagina_dinamica =
    pagina_dinamica + "<br /> faixa etária = " + req.body.faixa_etaria;
  pagina_dinamica =
    pagina_dinamica +
    "<br /> comidas preferidas = " +
    req.body.comidas_preferidas;
  res.send(pagina_dinamica);
});

app.listen(porta, ipDoServidor, () => {
  console.log(
    "\n Aplicacao web executando em http://" + ipDoServidor + ":" + porta
  );
});
