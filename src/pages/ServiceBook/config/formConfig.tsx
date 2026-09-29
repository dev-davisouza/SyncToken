// src/pages/ServiceBook/config/formConfig.tsx

import useFetchContext from "@/hooks/useFetchContext";
import { extractValues } from "@/utils/apiHelpers";

export default function useFormConfig() {
  const { model, ações, benefitSituations, docTypes, statusChoices } =
    useFetchContext();

  const textFields = [model.NIS_CPF, model.Nome, model.Endereço];
  const selectFields = {
    [model.Ação]: extractValues(ações),
    [model.DocType]: extractValues(docTypes),
    [model.Prioridade]: ["Sim", "Não"],
    [model.Status]: extractValues(statusChoices),
    [model.benefit_situation]: extractValues(benefitSituations),
  };

  return { textFields, selectFields };
}
