// src/context/FetchContext/staticFetch.ts

import { useEffect, useState } from "react";
import { fetchStaticInfos } from "@/service/fetch";
import {
  IFetchAções,
  IFetchBenefitSituations,
  IFetchDocTypes,
  IFetchModel,
  IFetchStatusChoices,
} from "@/interfaces/IStaticFetches";

export default function useFetchStaticData() {
  const [ações, setAções] = useState<IFetchAções>({} as IFetchAções);
  const [statusChoices, setStatusChoices] = useState<IFetchStatusChoices>(
    {} as IFetchStatusChoices
  );
  const [docTypes, setDocTypes] = useState<IFetchDocTypes>(
    {} as IFetchDocTypes
  );
  const [model, setModel] = useState<IFetchModel>({} as IFetchModel);
  const [periods, setPeriods] = useState<string[]>([]);
  const [benefitSituations, setBenefitSituations] =
    useState<IFetchBenefitSituations>({} as IFetchBenefitSituations);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staticData = await fetchStaticInfos();
        if (staticData) {
          const {
            actions,
            statusChoices,
            docTypes,
            model,
            periods,
            benefitSituations,
          } = staticData;

          setAções(actions);
          setStatusChoices(statusChoices);
          setDocTypes(docTypes);
          setModel(model);
          setPeriods(periods);
          setBenefitSituations(benefitSituations);
        } else {
          console.error("fetchStaticInfos retornou null");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return { ações, statusChoices, docTypes, model, periods, benefitSituations };
}
