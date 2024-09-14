export default async function fetchRelatorios() {
  try {
    const response = await fetch(`${apiPath}/relatorios`);

    const relatorios = await response.json();
    return relatorios.pessoas.results;
  } catch (error) {
    console.error("Erro ao pegar relatorios:", error);
    throw new Error("Erro ao pegar relatorios:", error);
  }
}
