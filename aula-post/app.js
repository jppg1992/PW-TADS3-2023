const express = require("express");
const app = express();
const port = 3000;
let db = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let imprime_db = db.pessoas;
  res.render("index", { imprime_db });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  let salva_db = db.pessoas;
  salva_db.push(salva_db.length + 1, nome, email);

  res.render("index");
});

app.listen(port, () => {
  console.log(`App running on url: http://localhost:${port}/ !!`);
});
