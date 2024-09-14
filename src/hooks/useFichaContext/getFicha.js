import { apiPath } from "@/context/Links";

/* 
dataToChange: {key: value, key2: value2...}
*/

export default async function getFicha(NIS_CPF) {
  try {
    const response = await fetch(`${apiPath}/pessoas-all/${NIS_CPF}`);

    const ficha = await response.json();
    return ficha;
  } catch (error) {
    console.error("Erro ao pegar ficha:", error);
    throw new Error("Erro ao pegar ficha:", error);
  }
}