const express = require("express");
const app = express();

app.get("/local", (req, res) => {
  res.send("IF-Sul <u> Campus Bagé </u>");
});

app.get("/local/:meuNome", (req, res) => {
  res.send(
    `${req.params.meuNome} seja bem vindo ao IF-Sul <u> Campus Bagé </u> !!`
  );
});

app.get("/dobro/:numero", (req, res) => {
  const numero = parseInt(req.params.numero);
  const dobro = numero * 2;

  res.send(`O dobro do número ${numero} é ${dobro} !!!!`);
});

app.get("/somar/:n1/:n2", (req, res) => {
  const n1 = parseInt(req.params.n1);
  const n2 = parseInt(req.params.n2);
  const soma = n1 + n2;

  res.send(`A soma de  ${n1} + ${n2} é = a ${soma}!!!!`);
});

app.listen(3030, "localhost");

console.log("Aplicação web executando em http://localhost:3030");
