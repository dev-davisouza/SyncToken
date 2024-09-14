import RelatorioContext from "@/context/RelatorioContext";
import { useContext } from "react";
import fetchRelatorioByDate from "./fetchRelatorioByDate";
import fetchRelatorios from "./fetchRelatorios";

export default function useRelatorioContext() {
  const { relatorios, setRelatorios, relatoriosCount } =
    useContext(RelatorioContext);

  return {
    fetchRelatorios: () => fetchRelatorios(),
    fetchRelatorioByDate: (date, perPage) =>
      fetchRelatorioByDate(date, perPage),
    relatorios,
    relatoriosCount,
  };
}
