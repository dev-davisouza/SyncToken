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

export const statusColors = {
  yellow: "#ff0",
  green: "#2cd601",
  red: "#cc0000",
};

export const dataMsg =
  "Você não pode alterar a data, por padrão ela é sempre definida com o valor da data atual e será salva desta forma para fins de segurança e consistência nos dados.";
