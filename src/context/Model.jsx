export const ServiceBookModel = {
  N: 0,
  NIS_CPF: "",
  Nome: "",
  Endereço: "",
  Ação: "",
  Data: "",
  Prioridade: "",
  Status: [],
};

export const ReportDetailModel = {
  data: "",
  pessoas: [],
};

export const Prioridades = ["Não", "Sim"];

export const docTypes = ["CPF", "NIS"];

export const statusColors = {
  yellow: "#ff0",
  green: "#2cd601",
  red: "#cc0000",
};

export const benefitSituations = [
  "Bloqueado",
  "Cancelado",
  "Suspenso",
  "Liberado",
  "Não contemplado",
];

export const dataMsg =
  "Você não pode alterar a data, por padrão ela é sempre definida com o valor da data atual e será salva desta forma para fins de segurança e consistência nos dados.";

export const updateMsg =
  "A versão <b>1.1 de SyncToken</b> já está disponível! Esta atualização trouxe algumas melhorias no desempenho do site. Aproveite!";
