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

export const checkFicha = (obj, array) => {
  return array.some((ficha) => ficha.NIS_CPF === obj.NIS_CPF);
};

export default function useFichaContext() {
  const { perPage } = usePaginatorContext();
  const { activateTrigger } = useTriggerContext();
  const navigate = useNavigate();
  const { setMessageContent, setTypeMessage } = useMessageContext();
  const { fichas, dispatch, totalFichas, tableFichas, loading } =
    useContext(FichaContext);

  return {
    editFicha: (ficha, dataToChange) =>
      editFicha(
        dispatch,
        ficha,
        dataToChange,
        activateTrigger,
        setMessageContent,
        setTypeMessage
      ),
    getFicha: (NIS_CPF) => getFicha(NIS_CPF),
    handleRemove: (NIS_CPF) =>
      handleRemove(
        NIS_CPF,
        navigate,
        activateTrigger,
        setMessageContent,
        setTypeMessage
      ),
    fetchModel: () => fetchModel(),
    fetchAllPessoas: () => fetchAllPessoas(perPage),
    fichas,
    totalFichas,
    tableFichas,
    loading,
  };
}
