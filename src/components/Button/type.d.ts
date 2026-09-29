// src/components/Button/type.ts

/**
 * Interface para o componente de botão personalizado.
 *
 * @property {("button" | "submit" )} type - Define o tipo do botão.
 * @property {React.ReactNode} [children] - Elementos filhos a serem renderizados dentro do botão.
 * @property {(event: React.MouseEvent<HTMLButtonElement>) => void} [onClick] - Callback executado ao clicar no botão.
 * @property {string} [$padding] - Padding opcional do botão, permitindo customização do espaçamento interno.
 */
export interface IButtonProps {
  type: ButtonTypes;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  $padding?: string;
}

export type ButtonTypes = "button" | "submit";
