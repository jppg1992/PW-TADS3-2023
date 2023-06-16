const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/calculadora.html");
});

app.get("/calcular-imc", (req, res) => {
  //obtem os dados da requisicao, e faz a comversao para float
  var peso = parseFloat(req.query.peso);
  var altura = parseFloat(req.query.altura);
  //calcula o imc
  var imc = peso / (altura * altura);

  let classifica = "";

  if (imc < 18.5) classifica = "Magreza";
  else if (imc >= 18.5 && imc <= 24.9) classifica = "Normal";
  else if (imc >= 25 && imc <= 29.9) classifica = "Sobrepeso";
  else if (imc >= 30 && imc <= 34.9) classifica = "Obesidade Grau I";
  else if (imc >= 35 && imc <= 39.9) classifica = "Obesidade Grau II";
  else if (imc >= 40) classifica = "Obesidade Grau III";

  res.send(
    `<h3>IMC = ${peso} kg / (${altura} X ${altura}) = ${imc.toFixed(
      2
    )} kg/m²</h3> <br\>Esta pessoa é classificada em ${classifica}`
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
