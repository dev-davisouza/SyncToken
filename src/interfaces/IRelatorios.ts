import { IFicha } from "./recordTypes";

export default interface IRelatorio {
  readonly data: string;
  readonly total_pessoas: number;
  readonly pessoas: IFicha[];
}

export interface IRelatoriosFetch {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: IRelatorio[];
}
