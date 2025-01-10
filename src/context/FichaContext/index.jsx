import { createContext, useEffect, useState, useMemo } from "react";
import { apiPath } from "@/context/Links";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import useTriggerContext from "@/hooks/useTriggerContext";
import useAuthContext from "@/hooks/useAuthContext";

const FichaContext = createContext();
FichaContext.displayName = "FichaContext";

export function FichaProvider({ children }) {
  // Token de acesso a API
  const { access } = useAuthContext();
  // Triggers
  const { updatedTrigger } = useTriggerContext();
  // Chamando o Paginador
  const { perPage } = usePaginatorContext();
  // Estados
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [fichas, setFichas] = useState([]);
  const [tableFichas, setTableFichas] = useState([]);
  const [totalFichas, setTotalFichas] = useState(0);

  useEffect(() => {
    access &&
      fetch(`${apiPath}/pessoas/?page_size=${perPage}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: access,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setTotalFichas(data.count);
          setFichas(data.results);
          setLoading(false);
        });
  }, [perPage, updatedTrigger, access]);

  // Memoriza `tableFichas` para evitar reprocessamentos desnecessários
  const memoizedTableFichas = useMemo(() => {
    return fichas
      ? fichas.map((item) => {
          const { DocType, last_update, isUnderInvestigation, ...rest } = item;
          return rest;
        })
      : [];
  }, [fichas, updatedTrigger]);

  useEffect(() => {
    fichas.length > 0
      ? setTableFichas(memoizedTableFichas)
      : setTableFichas([]);
  }, [memoizedTableFichas, updatedTrigger]);

  return (
    <FichaContext.Provider
      value={{
        fichas,
        totalFichas,
        tableFichas,
        loading, // Passa o estado de carregamento
        setLoading,
      }}
    >
      {children}
    </FichaContext.Provider>
  );
}

export default FichaContext;

/* NA BOA MANO
   DE REPENDE ESTOUROU UMA INFINIDADE DE ERROS
*/
