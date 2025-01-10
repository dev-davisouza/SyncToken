import { useContext } from "react";
import PeopleSelectorContext from "@/context/PeopleSelectorContext";

export default function usePeopleSelectorContext() {
  const { selectedPeople, setSelectedPeople } = useContext(
    PeopleSelectorContext
  );

  return {
    selectedPeople,
    setSelectedPeople,
    handlePerson: (NIS_CPF) => {
      if (!selectedPeople.some((personId) => personId == NIS_CPF)) {
        setSelectedPeople((prev) => [...prev, NIS_CPF]);
      } else {
        setSelectedPeople((prev) => {
          const newPeople = [...prev];
          const index = newPeople.findIndex((personId) => personId == NIS_CPF);
          if (index !== -1) {
            newPeople.splice(index, 1);
          }

          return newPeople;
        });
      }
    },
  };
}
