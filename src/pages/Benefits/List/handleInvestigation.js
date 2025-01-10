import { apiPath } from "@/context/Links";

/**
 *
 * @param {[]} selectedPeople
 */
export default async function handleInvestigation(
  selectedPeople,
  isUnderInvestigation = true
) {
  try {
    selectedPeople.forEach(async (NIS_CPF) => {
      await fetch(`${apiPath}/pessoas-all/${NIS_CPF}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isUnderInvestigation: isUnderInvestigation }),
      });
    });

    return true;
  } catch (error) {
    console.error(error);
  }
}
