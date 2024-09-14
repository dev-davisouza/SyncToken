import { apiPath } from "@/context/Links";

export default async function fetchAllPessoas(perPage = 10) {
  try {
    const response = await fetch(
      `${apiPath}/pessoas-all/?page_size=${perPage}`
    );

    const pessoas = await response.json();
    return [pessoas.results, pessoas.count];
  } catch (error) {
    console.error("Erro ao pegar pessoas:", error);
    throw new Error("Erro ao pegar pessoas:", error);
  }
}
