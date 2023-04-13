/**
 * FUNÇÕES E PROGRAMAÇÃO FUNCIONAL
 * Programação Funcional é um paradigma de programação
 *
 */

// funções não nomeadas ou arrow functions

soma = (n1, n2) => {
  return n1 + n2;
};

function somando(n1, n2) {
  return n1 + n2;
}

async function somar(n1, n2) {
  console.log("iniciou a função somar");
  return await (n1 + n2);
}

function add(...valores) {
  //return valores.reduce((acumulador, atual) => acumulador + atual);
  let soma = 0;
  valores.forEach((valor) => {
    soma += valor;
  });

  return soma;
}

somar(1, 9)
  .then((res) => console.log("reposta somar: ", res))
  .catch((err) => console.log("erro somar:", err))
  .finally(() => console.log("Finalizou a função somar !!!"));

console.log("resultado função soma: ", soma(1, 9));

console.log("resultado função somando", somando(1, 9));

console.log(
  "resultado de add: ",
  add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
);
