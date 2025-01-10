import { apiPath } from "@/context/Links";

export default async function fetchPeriods(access) {
  try {
    const response = await fetch(`${apiPath}/periods`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: access,
      },
    });
    const periods = await response.json();
    return periods;
  } catch (error) {
    console.error("Erro ao pegar relatorio:", error);
    throw new Error("Erro ao pegar relatorio:", error);
  }
}
