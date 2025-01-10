import { docTypes, Prioridades } from "@/context/Model";

export default async function loadChoices(
  selectFields,
  setChoices,
  fetchAções,
  fetchStatus,
  fetchBenefitSituations
) {
  let choiceMap = {};

  for (const field of selectFields) {
    try {
      if (field === "DocType") choiceMap[field] = docTypes;
      if (field === "Ação") choiceMap[field] = await fetchAções();
      if (field === "Prioridade") choiceMap[field] = Prioridades;
      if (field === "Status") choiceMap[field] = await fetchStatus();
      if (field === "benefit_situation")
        choiceMap[field] = await fetchBenefitSituations();
    } catch (error) {
      console.error(`Erro ao carregar dados para o campo ${field}:`, error);
    }
  }
  setChoices(choiceMap);
}
