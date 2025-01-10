import { createContext, useState } from "react";

const PeopleSelectorContext = createContext();
PeopleSelectorContext.displayName = "PeopleSelectorContext";

export function PeopleSelectorProvider({ children }) {
  const [selectedPeople, setSelectedPeople] = useState([]);
  return (
    <PeopleSelectorContext.Provider
      value={{ selectedPeople, setSelectedPeople }}
    >
      {children}
    </PeopleSelectorContext.Provider>
  );
}

export default PeopleSelectorContext;
