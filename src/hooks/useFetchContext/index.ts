import { useContext } from "react";
import FetchContext from "@/context/FetchContext";
import { FetchContextType } from "@/context/FetchContext/types";
import {
  editFicha,
  fetchPessoa,
  fetchPessoas,
  fetchRelatorioByDate,
  deletePessoa,
  fetchRelatoriosWithFilter,
} from "./fetches";

export default function useFetchContext() {
  const initialConxtext = useContext(FetchContext) as FetchContextType;

  async function searchPeople(nome: string, perPage = 10, filter?: string) {
    const fetchedResults = filter
      ? await fetchPessoas(`Nome=${nome}&${filter}`, perPage)
      : await fetchPessoas(`Nome=${nome}`, perPage);
    return fetchedResults;
  }

  return {
    ...initialConxtext,
    editFicha,
    fetchRelatorioByDate,
    fetchPessoa,
    fetchPessoas,
    fetchRelatoriosWithFilter,
    searchPeople,
    deletePessoa,
  };
}
