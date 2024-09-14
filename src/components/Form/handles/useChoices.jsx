import fetchAções from "@/context/FichaContext/fetchAções";
import fetchStatus from "@/context/FichaContext/fetchStatus";
import { docTypes, Prioridades } from "@/context/Model";

export default async function loadChoices(selectFields, setChoices) {
  let choiceMap = {};

  for (const field of selectFields) {
    if (field === "DocType") choiceMap[field] = docTypes;
    if (field === "Ação") choiceMap[field] = await fetchAções();
    if (field === "Prioridade") choiceMap[field] = Prioridades;
    if (field === "Status") choiceMap[field] = await fetchStatus();
  }

  setChoices(choiceMap);
}
