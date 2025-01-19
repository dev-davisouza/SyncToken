import { apiPath } from "@/context/Links";

export default async function fetchRelatoriosWithFilter(
  filter,
  perPage = 10,
  access
) {
  try {
    // Serializa o objeto `filter` em uma query string
    const queryString = new URLSearchParams(filter).toString();

    // Monta a URL com os parâmetros serializados
    const response = await fetch(
      `${apiPath}/relatorios/?page_size=${perPage}&${queryString}/`,
      {
        method: "GET",
        headers: {
          Authorization: access,
          "Content-type": "application/json",
        },
      }
    );
    const relatorios = await response.json();
    return [relatorios.count, relatorios.results];
  } catch (error) {
    console.error("Erro ao pegar relatorios:", error);
    throw new Error("Erro ao pegar relatorios:", error);
  }
}
