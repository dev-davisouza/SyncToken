import { useContext } from "react";
import TriggerContext from "@/context/TriggerContext";

export default function useTriggerContext() {
  const { updatedTrigger, setUpdateTrigger } = useContext(TriggerContext);

  return {
    updatedTrigger,
    activateTrigger: () => setUpdateTrigger((prev) => !prev),
  };
}
