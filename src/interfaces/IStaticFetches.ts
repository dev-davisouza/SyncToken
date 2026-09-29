// src/interfaces/IStaticFetches.ts

export interface IFetchModel {
  DocType: "DocType";
  NdaFicha: "NdaFicha";
  NIS_CPF: "NIS_CPF";
  Nome: "Nome";
  Endereço: "Endereço";
  Ação: "Ação";
  created_at: "created_at";
  last_update: "last_update";
  Prioridade: "Prioridade";
  Status: "Status";
  benefit_situation: "benefit_situation";
  isUnderInvestigation: "isUnderInvestigation";
}

export interface IFetchBenefitSituations {
  Bloqueado: "Bloqueado";
  Cancelado: "Cancelado";
  Suspenso: "Suspenso";
  Liberado: "Liberado";
  "Não contemplado": "Não contemplado";
  Desconhecido: "Desconhecido";
}

export interface IFetchDocTypes {
  CPF: "CPF";
  NIS: "NIS";
}

export interface IFetchAções {
  "Alteração de endereço": "Alteração de endereço";
  "Atualização cadastral": "Atualização cadastral";
  Consulta: "Consulta";
  "Criação de cadastro": "Criação de cadastro";
  "Declaração escolar": "Declaração escolar";
  "Exclusão de pessoa": "Exclusão de pessoa";
  "Exclusão e Inclusão de pessoa": "Exclusão e Inclusão de pessoa";
  "Gestão de bloqueio/cancelamento": "Gestão de bloqueio/cancelamento";
  "Gestão de pessoa": "Gestão de pessoa";
  "Inclusão de pessoa": "Inclusão de pessoa";
  "Informarção de renda": "Informarção de renda";
  Transferência: "Transferência";
}

export interface IFetchStatusChoices {
  stts_0: "A ser atendido";
  stts_1: "Em atendimento";
  stts_2: "Atendimento encerrado";
}

export interface IFetchIcon {
  url: string;
}

export interface IStaticInfosResponse {
  actions: IFetchAções;
  statusChoices: IFetchStatusChoices;
  docTypes: IFetchDocTypes;
  model: IFetchModel;
  periods: string[];
  benefitSituations: IFetchBenefitSituations;
}
