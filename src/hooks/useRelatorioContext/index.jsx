import RelatorioContext from "@/context/RelatorioContext";
import { useContext } from "react";
import fetchRelatorioByDate from "./fetchRelatorioByDate";
import fetchPeriods from "./fetchPeriods";
import fetchRelatoriosWithFilter from "./fetchRelatoriosWithFilter";
import useAuthContext from "../useAuthContext";

export default function useRelatorioContext() {
  const { relatorios, setRelatorios, relatoriosCount } =
    useContext(RelatorioContext);
  const { access } = useAuthContext();

  return {
    fetchRelatorioByDate: (date, perPage) =>
      fetchRelatorioByDate(date, perPage, access),
    relatorios,
    fetchRelatoriosWithFilter: async (filter, perPage) =>
      fetchRelatoriosWithFilter(filter, perPage, access),
    fetchPeriods: async () => fetchPeriods(access),
    relatoriosCount,
  };
}
