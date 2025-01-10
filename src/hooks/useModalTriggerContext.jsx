import { useContext } from "react";
import ModalTriggerContext from "@/context/ModalTriggerContext";

export default function useModalTriggerContext() {
  const { activateModalTrigger, modalTrigger } =
    useContext(ModalTriggerContext);

  return {
    activateModalTrigger: () => activateModalTrigger(),
    modalTrigger,
  };
}
