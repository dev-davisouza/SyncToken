// src/components/Table/type.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleQueryGlobalType, QueryRowType } from "@/interfaces/recordTypes";

export interface TablePropsBase {
  caption: string;
  query: QueryRowType[];
  handleQuery?: handleQueryGlobalType<QueryRowType>;
  /** Renderização customizada dos cards no mobile */
  renderCard?: (row: QueryRowType, index: number) => ReactNode;
  count?: number;
  extraHeader?: ReactNode;
  isForSelection: boolean;
}

export interface TableForSelectionProps extends TablePropsBase {
  isForSelection: true;
  handleQuery: handleQueryGlobalType<any>;
}

export interface TableNotForSelectionProps extends TablePropsBase {
  isForSelection: false;
  handleQuery?: handleQueryGlobalType<any>;
}

/**
 * Tipo que define as propriedades para uma tabela de dados, garantindo que
 * `handleQuery` seja obrigatório quando `isForSelection` for `true` e
 * opcional caso contrário.
 *
 * @typedef {TableForSelectionProps | TableNotForSelectionProps} TableProps
 */
export type TableProps = TableForSelectionProps | TableNotForSelectionProps;
