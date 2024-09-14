import { createContext, useState } from "react";

const TriggerContext = createContext();
TriggerContext.displayName = "TriggerContext";

export function TriggerProvider({ children }) {
  const [updatedTrigger, setUpdateTrigger] = useState(false);
  return (
    <TriggerContext.Provider value={{ updatedTrigger, setUpdateTrigger }}>
      {children}
    </TriggerContext.Provider>
  );
}

export default TriggerContext;
