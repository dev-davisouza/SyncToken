// Função para formatar o NIS ou CPF no input
export default function handleNIS_CPF(docType, value) {
  // Remove qualquer caractere que não seja número
  let numericValue = value.replace(/\D/g, "");

  // Limita o valor a no máximo 11 dígitos
  numericValue = numericValue.substring(0, 11);

  if (docType === "NIS") {
    // Formata o NIS dinamicamente: 0000000000-0
    numericValue = numericValue.replace(/(\d{5})(\d)/, "$1$2");
    numericValue = numericValue.replace(/(\d{10})(\d{1})$/, "$1-$2");
  } else if (docType === "CPF") {
    // Formata o CPF dinamicamente: 000.000.000-00
    numericValue = numericValue.replace(/(\d{3})(\d)/, "$1.$2");
    numericValue = numericValue.replace(/(\d{3})(\d)/, "$1.$2");
    numericValue = numericValue.replace(/(\d{3})(\d{2})$/, "$1-$2");
  }
  return numericValue;
}
