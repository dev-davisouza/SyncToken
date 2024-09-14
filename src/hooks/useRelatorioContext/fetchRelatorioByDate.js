import { apiPath } from "@/context/Links";

export default async function fetchFichasByDate(date, perPage = 10) {
  try {
    const response = await fetch(
      `${apiPath}/relatorios/${date}/?pessoas_page_size=${perPage}`
    );

    const relatorio = await response.json();
    return [relatorio.pessoas, relatorio.total_pessoas];
  } catch (error) {
    console.error("Erro ao pegar relatorio:", error);
    throw new Error("Erro ao pegar relatorio:", error);
  }
}
