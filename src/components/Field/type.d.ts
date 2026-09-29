// src/components/Field/type.d.ts

export interface IBaseField {
  name: string;
  label: string;
  type: "text" | "select";
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  note?: string;
  autoFocus?: boolean;
}

/**
 * Interface para `Field` do tipo "select", adicionando `options`
 */
export interface ISelectField extends IBaseField {
  type: "select";
  options: string[];
}

/**
 * Interface para `Field` do tipo "text", sem `options`
 */
export interface ITextField extends IBaseField {
  type: "text";
  options?: never; // Garante que `options` não será aceito para `text`
}

/**
 * `IField` aceita tanto `ITextField` quanto `ISelectField`
 */
export type IField = ISelectField | ITextField;
