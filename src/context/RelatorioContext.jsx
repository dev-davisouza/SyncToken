import { createContext, useEffect, useState } from "react";
import FichaReducer from "@/reducers/FichaReducer";
import { apiPath } from "@/context/Links";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import useTriggerContext from "@/hooks/useTriggerContext";

const RelatorioContext = createContext();
RelatorioContext.displayName = "RelatorioContext";

export function RelatorioProvider({ children }) {
  // Triggers
  const { updatedTrigger } = useTriggerContext();
  // Estados
  const [relatorios, setRelatorios] = useState([]);
  const [relatoriosCount, setRelatoriosCount] = useState(0);
  const { perPage } = usePaginatorContext();

  // Get dos relatórios
  useEffect(() => {
    fetch(`${apiPath}/relatorios/?page_size=${perPage}`)
      .then((resp) => resp.json())
      .then((data) => {
        setRelatoriosCount(data.count);
        setRelatorios(data.results);
      });
  }, [perPage, updatedTrigger]);

  return (
    <RelatorioContext.Provider
      value={{
        relatorios,
        setRelatorios,
        relatoriosCount,
      }}
    >
      {children}
    </RelatorioContext.Provider>
  );
}

export default RelatorioContext;
