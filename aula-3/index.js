const express = require("express");

const app = express();

const port = 3000;

app.get("/oi/:nome", (req, res) => {
  const nome = req.params.nome;
  console.log(nome);
  res.send(`Hello World ${nome}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
