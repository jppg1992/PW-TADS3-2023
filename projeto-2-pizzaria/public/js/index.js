function validarForm_confirmarPedido() {
  //calculo do total a pagar

  var total_a_pagar = 0;

  var qtd_pizza_grande = parseInt(document.getElementById("pizzaG").value);

  total_a_pagar = total_a_pagar + qtd_pizza_grande * 60;

  var qtd_pizza_media = document.getElementById("pizzaM").value;

  total_a_pagar = total_a_pagar + qtd_pizza_media * 50;

  var qtd_pizza_pequena = document.getElementById("pizzaP").value;

  total_a_pagar = total_a_pagar + qtd_pizza_pequena * 40;

  //calculo da taxa de entrega
  //entrega por motoboy ou entrega no balcao da loja ao cliente
  var radioBoxes = document.getElementsByName("tipo_entrega");

  for (var i = 0; i < radioBoxes.length; i++) {
    if (radioBoxes[i].checked) {
      if (radioBoxes[i].value == "tele") {
        total_a_pagar = total_a_pagar + 10;
      }

      if (radioBoxes[i].value == "balcao") {
        total_a_pagar = total_a_pagar + 0;
      }
    }
  }

  const inputTotal = document.getElementById("total");
  inputTotal.value = total_a_pagar;

  var opcao = confirm(
    "Total a pagar R$ " + total_a_pagar + " - Confirma o envio do pedido?"
  );

  if (opcao == true) {
    alert("Pedido enviado com sucesso");

    return true;
  } else {
    alert("Pedido não enviado");
    return false;
  }
}

