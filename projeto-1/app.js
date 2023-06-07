const express = require("express");
const app = express();
const porta = 8080;
const ipDoServidor = "127.0.0.1";
//rotas do site:
//requisicao para a raiz do site: /
//redireciona a requisicao para a roda abaixo /pagina-inicial
app.get("/", (req, res) => {
  res.redirect("/pagina-inicial");
});
//Coloque o seu código aqui (no Visual Studio Code)

app.get("/pagina-inicial", function (req, res) {
  res.sendFile(__dirname + "/paginas_estaticas/pagina-inicial.html");
});

app.get("/calculo-areas", function (req, res) {
  res.sendFile(__dirname + "/paginas_estaticas/calculo-areas.html");
});

app.get("/juros", (req, res) =>
  res.sendFile(__dirname + "/paginas_estaticas/juros.html")
);

app.get("/conjuntos-numericos", (req, res) =>
  res.sendFile(__dirname + "/paginas_estaticas/conjuntos-numericos.html")
);

app.get("/fatorial", (req, res) =>
  res.sendFile(__dirname + "/paginas_estaticas/fatorial.html")
);

/////////////////////////////////////////////////////////////////////////////
//////////////////////  rotas dinamicas /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

app.get("/operacoes-fundamentais/:numero1/:numero2", (req, res) => {
  //converte string para integer
  //se não receber um numero, o valor ficara NAN
  var num1 = parseInt(req.params.numero1);
  var num2 = parseInt(req.params.numero2);
  //cria uma variável para ir concatenando o conteúdo da pagina
  var saidaHTML = "";
  saidaHTML = saidaHTML + "<h2>Aprendendo Matemática Fácil</h2>";
  saidaHTML = saidaHTML + "<h3>Operações fundamentais:</h3>";
  saidaHTML = saidaHTML + "<br />numeros: " + num1 + " e " + num2 + "<br />";
  saidaHTML = saidaHTML + "<br /><b>soma:</b> " + (num1 + num2);
  saidaHTML = saidaHTML + "<br /><b>subtração:</b> " + (num1 - num2);
  saidaHTML = saidaHTML + "<br /><b>multiplicação:</b> " + num1 * num2;
  saidaHTML = saidaHTML + "<br /><b>divisão:</b> " + num1 / num2;
  saidaHTML = saidaHTML + "<br /><br /><a href='/pagina-inicial'>voltar</a>";
  //envia a página montada para o cliente
  res.send(saidaHTML);
});

if (i % 2 === 0)
  app.get("/tabuada/:n", (req, res) => {
    var n = parseInt(req.params.n);

    //cria uma variável para ir concatenando o conteúdo da pagina
    var saidaHTML = "";
    saidaHTML = saidaHTML + "<h2>Aprendendo Matemática Fácil</h2>";
    saidaHTML = saidaHTML + `<h3>Tabuada do ${n}:</h3>`;

    for (i = 1; i <= 10; i++) {
      if (i % 2 > 0) {
      }
      saidaHTML = saidaHTML + `<br /> ${n} x ${i} = ${n * i}<br />`;
    }
    saidaHTML = saidaHTML + "<br /><br /><a href='/pagina-inicial'>voltar</a>";

    //envia a página montada para o cliente
    res.send(saidaHTML);
  });

app.get("/tabuada-completa", (req, res) => {
  //cria uma variável para ir concatenando o conteúdo da pagina
  var saidaHTML = "";
  saidaHTML = saidaHTML + "<h2>Aprendendo Matemática Fácil</h2>";

  for (j = 1; j <= 10; j++) {
    saidaHTML = saidaHTML + `<br/><br/>  <h3>Tabuada do ${j}:</h3>`;
    for (i = 1; i <= 10; i++) {
      saidaHTML = saidaHTML + `<br /> ${j} x ${i} = ${j * i}<br />`;
    }
  }
  saidaHTML = saidaHTML + "<br /><br /><a href='/pagina-inicial'>voltar</a>";

  //envia a página montada para o cliente
  res.send(saidaHTML);
});

//Coloque o seu código aqui (no Visual Studio Code)
app.listen(porta, ipDoServidor, () => {
  console.log(
    "\n Aplicacao web executando em http://" + ipDoServidor + ":" + porta
  );
});
