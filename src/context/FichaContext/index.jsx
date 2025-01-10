import { createContext, useEffect, useReducer, useState, useMemo } from "react";
import FichaReducer from "@/reducers/FichaReducer";
import { apiPath } from "@/context/Links";
import { SET_FICHAS } from "@/reducers/FichaReducer";
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
  const [fichas, dispatch] = useReducer(FichaReducer, []);
  const [tableFichas, setTableFichas] = useState([]);
  const [totalFichas, setTotalFichas] = useState(0);

  useEffect(() => {
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
        dispatch({ type: SET_FICHAS, payload: data.results });
        setLoading(false);
      });
  }, [perPage, updatedTrigger]);

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
        dispatch,
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
