import { createContext, useState } from "react";
import { PeopleSelectorContextType } from "./types";

const PeopleSelectorContext = createContext<
  PeopleSelectorContextType | undefined
>(undefined);

PeopleSelectorContext.displayName = "PeopleSelectorContext";

export function PeopleSelectorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  return (
    <PeopleSelectorContext.Provider
      value={{ selectedPeople, setSelectedPeople }}
    >
      {children}
    </PeopleSelectorContext.Provider>
  );
}

export default PeopleSelectorContext;
