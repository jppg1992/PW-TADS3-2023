const express = require("express");
const app = express();
const port = 3000;
let db = require("./db/db.json");
let dbF = require("./db/db.fibonacci.json");
const { render } = require("ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let imprime_db = db.pessoas;
  res.render("index", { imprime_db });
});

app.get("/fibonacci", (req, res) => {
  const imprime = dbF.fibonacci;
  res.render("fibonacci", { imprime });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  if (req.body.nome.length > 3 && req.body.email.length > 10) {
    const novaPessoa = {
      id: db.pessoas.length,
      nome: req.body.nome,
      email: req.body.email,
    };
    db.pessoas.push(novaPessoa);
    console.log(novaPessoa.id, novaPessoa.nome, novaPessoa.email);
    console.log(db.pessoas);
    res.redirect("/");
  } else {
    throw new Error("Tamanho dos campos devem ser respeitados !!");
  }
});

app.listen(port, () => {
  console.log(`App running on url: http://localhost:${port}/ !!`);
});
