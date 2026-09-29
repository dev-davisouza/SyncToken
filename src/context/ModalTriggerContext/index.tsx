import { createContext, useState } from "react";
import { ModalTriggerContextType } from "./types";

const ModalTriggerContext = createContext<ModalTriggerContextType | undefined>(
  undefined
);
ModalTriggerContext.displayName = "ModalTriggerContext";

export function ModalTriggerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalTrigger, setModalTrigger] = useState(false);

  /** Só usar no pelo que dá bom! */
  function activateModalTrigger() {
    setModalTrigger((prev) => !prev);
  }

  return (
    <ModalTriggerContext.Provider
      value={{ activateModalTrigger, modalTrigger }}
    >
      {children}
    </ModalTriggerContext.Provider>
  );
}

export default ModalTriggerContext;
