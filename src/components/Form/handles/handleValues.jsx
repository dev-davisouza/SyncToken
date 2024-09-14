export default function handleValues(value) {
  // Verifica se o valor é undefined ou null
  if (value === undefined || value === null) {
    return ""; // Retorna uma string vazia ou algum valor padrão
  }

  // Continua com as verificações se o valor não for undefined ou null
  if (value.includes("A ser atendido")) {
    return "stts_0";
  } else if (value.includes("Em atendimento")) {
    return "stts_1";
  } else if (value.includes("Atendimento encerrado")) {
    return "stts_2";
  } else {
    return value;
  }
}
