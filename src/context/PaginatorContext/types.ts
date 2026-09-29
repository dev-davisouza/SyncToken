import { SetStateAction } from "react";

export type PaginatorDirectionsType = "down" | "up";

export interface PaginatorContextType {
  perPage: number;
  setPerPage: React.Dispatch<SetStateAction<number>>;
  direction: PaginatorDirectionsType;
  setDirection: React.Dispatch<SetStateAction<PaginatorDirectionsType>>;
}
