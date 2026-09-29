import { IServiceBook } from "../type";

const handleLabel = (name: keyof IServiceBook): string => {
  const labelMap: Record<string, string> = {
    NIS_CPF: "NIS/CPF",
    Nome: "Nome",
    Endereço: "Endereço",
    Ação: "Ação",
    DocType: "Tipo de Documento",
    Prioridade: "Prioridade",
    Status: "Status de Atendimento",
    benefit_situation: "Situação do Benefício",
  };

  return labelMap[name] || (name as string);
};

export default handleLabel;
