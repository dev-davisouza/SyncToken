import { apiPath } from "@/context/Links";

export default async function fetchAllPessoas(
  perPage = 10,
  filterFetchAll = null,
  access
) {
  try {
    const response = filterFetchAll
      ? await fetch(
          `${apiPath}/pessoas-all/?page_size=${perPage}&${filterFetchAll}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: access,
            },
          }
        )
      : await fetch(`${apiPath}/pessoas-all/?page_size=${perPage}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: access,
          },
        });

    const pessoas = await response.json();
    return [pessoas.results, pessoas.count];
  } catch (error) {
    console.error("Erro ao pegar pessoas:", error);
    throw new Error("Erro ao pegar pessoas:", error);
  }
}
