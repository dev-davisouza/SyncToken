// src/components/Form/type.ts

import { QueryRowType } from "@/interfaces/recordTypes";

export interface IForm<T> {
  legend: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  textSubmit: string;
  textFields?: string[];
  selectFields?: TselectField<T>;
  order?: string[];
  handleValue?: (name: string, value: string) => string;
  handleDisabled?: (name: string, values: QueryRowType) => boolean;
  handleLabel?: (name: keyof T) => string;
  handleFocus?: (name: keyof T) => boolean;
}

/**
 * Define o tipo correto para os `selectFields`
 * Exemplo:
 * {
 *    country: ["Brasil", "Argentina", "EUA"],
 *    city: ["João Pessoa", "Ushuaia", "New York"]
 * }
 */
type TselectField<T> = Record<keyof T, string[]>;
