import { useContext } from "react";
import PeopleSelectorContext from "@/context/PeopleSelectorContext";
import { PeopleSelectorContextType } from "@/context/PeopleSelectorContext/types";

export default function usePeopleSelectorContext() {
  const initalContext = useContext(
    PeopleSelectorContext
  ) as PeopleSelectorContextType;

  const handlePerson = (NIS_CPF: string) => {
    if (!initalContext.selectedPeople.some((personId) => personId == NIS_CPF)) {
      initalContext.setSelectedPeople((prev) => [...prev, NIS_CPF]);
    } else {
      initalContext.setSelectedPeople((prev) => {
        const newPeople = [...prev];
        const index = newPeople.findIndex((personId) => personId == NIS_CPF);
        if (index !== -1) {
          newPeople.splice(index, 1);
        }

        return newPeople;
      });
    }
  };
  return {
    ...initalContext,
    handlePerson,
  };
}
