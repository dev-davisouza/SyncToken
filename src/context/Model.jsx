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

export const Prioridades = ["Não", "Sim"];

export const Ações = [
  "Atualização cadastral",
  "Exclusão de pessoa",
  "Criação de cadastro",
  "Alteração de endereço",
  "Transferência",
  "Gestão de pessoa",
].sort((a, b) => a.localeCompare(b));

export const Status = [
  {
    stts_0: ["A ser atendido", "#ff0"],
  },
  {
    stts_1: ["Em atendimento", "#2cd601"],
  },
  {
    stts_2: ["Atendimento encerrado", "#cc0000"],
  },
];

export const dataMsg =
  "Você não pode alterar a data, por padrão ela é sempre definida com o valor da data atual e será salva desta forma para fins de segurança e consistência nos dados.";
