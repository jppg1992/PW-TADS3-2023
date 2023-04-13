if (true) {
  var a = 10;
  // let b = 20
}

let b = 30;

a = "global";

const naoMuda = (valor) => {
  let x = "let";
  console.log(
    `variavel const não muda e só é lida dentro de um escopo!!!  ${valor}\n`,
    `variavel var é mutavel e global pode ser utilizada em toda a aplicação ${a} \n`,
    `variavel let é mutavel e só é manipulada dentro de um determinado escopo "${x}" \n`
  );
};

naoMuda("não muda !!!");
