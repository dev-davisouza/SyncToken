// src/constants/tableData.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFicha } from "@/interfaces/recordTypes";
import { filterData, renameHeaders } from "@/utils/dataTransform";

/**
 * tableData é um utilitário específico (por isso não está na pasta utils),
 * onde os dados que vem de `fetchContext` são manipulados manualmente
 * para serem usados nas pages.
 *
 * Como basicamente, o objetivo da aplicação gira em torno das fichas
 * e dos relatórios, então neste caso, não terei a preocupação de
 * tornar este código genérico.
 *
 */
export default function FichaTableData<K extends keyof IFicha>({
  pessoasAll,
  anyOtherFieldstoRemove,
}: FichaTableDataProps<K>) {
  // Filtra dados, removendo propriedades específicas
  const filteredPessoas = filterData(
    pessoasAll,
    anyOtherFieldstoRemove as string[]
  );

  // Renomeia os cabeçalhos das pessoas filtradas
  const renamedHeadersPessoasQuery = filteredPessoas.map((filteredPessoa) => {
    return renameHeaders(filteredPessoa, {
      NdaFicha: "N°",
      NIS_CPF: "NIS/CPF",
      created_at: "Data de registro",
      benefit_situation: "Situação do benefício",
      last_update: "Última Atualização",
    });
  });

  return renamedHeadersPessoasQuery;
}

interface FichaTableDataProps<K extends keyof IFicha> {
  pessoasAll: IFicha[];
  anyOtherFieldstoRemove: K[]; // Array contendo chaves de IFicha a serem removidas
}

export interface FichaTableDataPrevReturn extends Record<string, any> {
  "N°"?: number;
  "NIS/CPF"?: string;
  Nome?: string;
  Endereço?: string;
  Ação?: string;
  "Data de registro"?: string;
  "Última atualização"?: string;
  Prioridade?: string;
  Status?: string;
  DocType?: string;
  "Situação do benefício"?: string;
  isUnderInvestigation?: boolean | null;
}
