import { createContext, useState } from "react";

const ModalTriggerContext = createContext();
ModalTriggerContext.displayName = "ModalTriggerContext";

export function ModalTriggerProvider({ children }) {
  const [modalTrigger, setModalTrigger] = useState(false);

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
