import FichaContext from "@/context/FichaContext";
import { useContext } from "react";
import editFicha from "./editFicha";
import getFicha from "./getFicha";
import handleRemove from "./handleRemove";
import { useNavigate } from "react-router-dom";
import useMessageContext from "../useMessageContext";
import useTriggerContext from "../useTriggerContext";
import fetchModel from "./fetchModel";
import fetchAllPessoas from "./fetchAllPessoas";
import usePaginatorContext from "../usePaginatorContext";
import useAuthContext from "../useAuthContext";
import fetchAções from "./fetchAções";
import fetchBenefitSituations from "./fetchBenefitSituations";
import fetchStatus from "./fetchStatus";

export const checkFicha = (obj, array) => {
  return array.some((ficha) => ficha.NIS_CPF === obj.NIS_CPF);
};

export default function useFichaContext() {
  const { access } = useAuthContext();
  const { perPage } = usePaginatorContext();
  const { activateTrigger } = useTriggerContext();
  const navigate = useNavigate();
  const { setMessageContent, setTypeMessage } = useMessageContext();
  const { fichas, dispatch, totalFichas, tableFichas, loading, setLoading } =
    useContext(FichaContext);

  return {
    editFicha: (ficha, dataToChange) =>
      editFicha(
        dispatch,
        ficha,
        dataToChange,
        activateTrigger,
        setMessageContent,
        setTypeMessage,
        access // Recebe do contexto
      ),
    getFicha: (NIS_CPF) => getFicha(NIS_CPF, access),
    handleRemove: (NIS_CPF) =>
      handleRemove(
        NIS_CPF,
        navigate,
        activateTrigger,
        setMessageContent,
        setTypeMessage,
        access // Recebe do contexto
      ),
    fetchModel: () => fetchModel(access), // Recebe do contexto
    fetchAllPessoas: (filterFetchAll = null) =>
      fetchAllPessoas(perPage, filterFetchAll, access),
    fetchAções: () => fetchAções(access),
    fetchBenefitSituations: () => fetchBenefitSituations(access),
    fetchStatus: () => fetchStatus(access),
    fichas,
    totalFichas,
    tableFichas,
    loading,
    setLoading,
  };
}
