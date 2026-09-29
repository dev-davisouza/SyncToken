import { apiPath } from "@/context/Links";
import { fetchData } from "@/service/fetch";

export default async function handleInvestigation(
  selectedPeople: string[],
  isUnderInvestigation = true
) {
  try {
    selectedPeople.forEach(async (NIS_CPF) => {
      fetchData(`${apiPath}/pessoas-all/${NIS_CPF}/`, "PATCH", {
        isUnderInvestigation: isUnderInvestigation,
      });
    });

    return true;
  } catch (error) {
    console.error(error);
  }
}
