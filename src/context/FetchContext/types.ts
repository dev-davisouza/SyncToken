// src/context/FetchContext/types.ts

import { IFicha } from "@/interfaces/recordTypes";
import IRelatorio from "@/interfaces/IRelatorios";
import { ReactNode } from "react";
import {
  IFetchAções,
  IFetchBenefitSituations,
  IFetchDocTypes,
  IFetchModel,
  IFetchStatusChoices,
} from "@/interfaces/IStaticFetches"; // Importando as interfaces dos dados estáticos

// Define o tipo para o contexto
export interface FetchContextType {
  readonly fichas: IFicha[];
  readonly pessoasAll: IFicha[];
  readonly relatorios: IRelatorio[];
  readonly fichasCount: number;
  readonly pessoasAllCount: number;
  readonly relatoriosCount: number;

  // Dados estáticos
  readonly ações: IFetchAções;
  readonly statusChoices: IFetchStatusChoices;
  readonly docTypes: IFetchDocTypes;
  readonly model: IFetchModel;
  readonly periods: string[];
  readonly benefitSituations: IFetchBenefitSituations;
}

// Define o tipo das props do provider
export interface FetchProviderProps {
  children: ReactNode;
}
