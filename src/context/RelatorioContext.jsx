import { createContext, useEffect, useState } from "react";
import { apiPath } from "@/context/Links";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import useTriggerContext from "@/hooks/useTriggerContext";
import useAuthContext from "@/hooks/useAuthContext";

const RelatorioContext = createContext();
RelatorioContext.displayName = "RelatorioContext";

export function RelatorioProvider({ children }) {
  // Token de acesso
  const { access } = useAuthContext();
  // Triggers
  const { updatedTrigger } = useTriggerContext();
  // Estados
  const [relatorios, setRelatorios] = useState([]);
  const [relatoriosCount, setRelatoriosCount] = useState(0);
  const { perPage } = usePaginatorContext();

  // Get dos relatórios
  useEffect(() => {
    access &&
      fetch(`${apiPath}/relatorios/?page_size=${perPage}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: access,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setRelatoriosCount(data.count);
          setRelatorios(data.results);
        });
  }, [perPage, updatedTrigger, access]);

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
