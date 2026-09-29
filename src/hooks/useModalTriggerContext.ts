import { useContext } from "react";
import ModalTriggerContext from "@/context/ModalTriggerContext";
import { ModalTriggerContextType } from "@/context/ModalTriggerContext/types";

export default function useModalTriggerContext() {
  return useContext(ModalTriggerContext) as ModalTriggerContextType;
}
