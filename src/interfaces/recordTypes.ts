// src/interfaces/recordTypes.ts

/**
 * @file recordTypes.ts
 * @description Definição de tipos e interfaces para manipulação de dados no sistema.
 */

/**
 * Representa um objeto genérico onde as chaves são strings e os valores podem ser booleanos, strings, números ou null.
 */
export type QueryRowType = Record<string, boolean | string | number | null>;

/**
 * Interface que representa uma ficha de usuário, herdando de QueryRowType.
 * @interface IFicha
 * @extends {QueryRowType}
 *
 * @property {number} NdaFicha - Número identificador da ficha.
 * @property {string} NIS_CPF - Número de Identificação Social (NIS) ou CPF.
 * @property {string} Nome - Nome completo do indivíduo.
 * @property {string} Endereço - Endereço residencial do indivíduo.
 * @property {string} Ação - Tipo de ação relacionada à ficha.
 * @property {string} created_at - Data de criação da ficha.
 * @property {string} last_update - Data da última atualização da ficha.
 * @property {string} Prioridade - Nível de prioridade da ficha.
 * @property {string} Status - Status atual da ficha.
 * @property {string} DocType - Tipo de documento associado à ficha.
 * @property {string} benefit_situation - Situação do benefício do indivíduo.
 * @property {boolean | null} isUnderInvestigation - Indica se está sob investigação.
 */
export interface IFicha extends QueryRowType {
  NdaFicha: number;
  NIS_CPF: string;
  Nome: string;
  Endereço: string;
  Ação: string;
  created_at: string;
  last_update: string;
  Prioridade: string;
  Status: string;
  DocType: string;
  benefit_situation: string;
  isUnderInvestigation: boolean | null;
}

/**
 * Interface que representa a resposta ao buscar uma lista de pessoas.
 * @interface IPessoasFetch
 *
 * @property {number} count - Quantidade total de registros.
 * @property {string | null} next - URL da próxima página de resultados (ou null se não houver próxima página).
 * @property {string | null} previous - URL da página anterior de resultados (ou null se não houver página anterior).
 * @property {IFicha[]} results - Lista de fichas retornadas pela consulta.
 */
export interface IPessoasFetch {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: IFicha[];
}

export type handleQueryGlobalType<T extends QueryRowType> = (
  query: T[]
) => React.JSX.Element | React.JSX.Element[];
