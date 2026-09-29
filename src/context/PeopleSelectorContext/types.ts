export interface PeopleSelectorContextType {
  selectedPeople: string[];
  setSelectedPeople: React.Dispatch<React.SetStateAction<string[]>>;
}
