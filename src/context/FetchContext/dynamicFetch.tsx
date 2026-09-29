// src/context/FetchContext/dynamicFetch.ts

import { useEffect, useState } from "react";
import { IFicha } from "@/interfaces/recordTypes";
import IRelatorio from "@/interfaces/IRelatorios";
import fetchAll from "@/service/fetch";
import useSocketContext from "@/hooks/useSocketContext";
import usePaginatorContext from "@/hooks/usePaginatorContext";

interface FetchState {
  fichas: IFicha[];
  pessoasAll: IFicha[];
  relatorios: IRelatorio[];
  fichasCount: number;
  pessoasAllCount: number;
  relatoriosCount: number;
}

export default function useFetchDatabaseData() {
  const { trigger } = useSocketContext();
  const { perPage } = usePaginatorContext();
  // Estado único para armazenar dados e contagens
  const [data, setData] = useState<FetchState>({
    fichas: [],
    pessoasAll: [],
    relatorios: [],
    fichasCount: 0,
    pessoasAllCount: 0,
    relatoriosCount: 0,
  });

  /* sabendo que meu perPage por padrão é 10, 
    então eu sei que se ele mudar eu irei refazer os fetches. 
    Porém eu sei que que quando eu fizer um fetch com perPage ingual a 20, 
    os 10 primeiros que haviam aparecido quando perPage era 10 irão fazer 
    parte dos 20 registros, então um useMemo aqui cai bem, não? 
  */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAll(perPage);
        if (fetchedData) {
          setData({
            fichas: fetchedData.fichas || [],
            pessoasAll: fetchedData.pessoasAll || [],
            relatorios: fetchedData.relatorios || [],
            fichasCount: fetchedData.fichasCount as number,
            pessoasAllCount: fetchedData.pessoasAllCount as number,
            relatoriosCount: fetchedData.relatoriosCount as number,
          });
        } else {
          console.error("fetchAll retornou null");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [trigger, perPage]);

  return { ...data };
}
