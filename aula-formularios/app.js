const express = require("express");
const app = express();
const porta = 8085;
const ipDoServidor = "127.0.0.1";
//rotas:
app.get("/", (req, res) => {
  res.redirect("/form-media-provas");
});

app.get("/form-media-provas", (req, res) => {
  res.sendFile(__dirname + "/pages/formulario.html");
});

app.post("/calcular-media-provas", function (requisicao, resposta) {
  resposta.send("entrou na rota de processamento de dados de form");
});

app.listen(porta, ipDoServidor, function () {
  console.log(
    "\n Aplicacao web executando em http://" + ipDoServidor + ":" + porta
  );
});
