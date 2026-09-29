// src/context/usePaginatorContext.tsx

import { createContext, useState } from "react";
import { PaginatorDirectionsType, PaginatorContextType } from "./types";

const PaginatorContext = createContext<PaginatorContextType | undefined>(
  undefined
);
PaginatorContext.displayName = "PaginatorContext";

export function PaginatorProvider({ children }: { children: React.ReactNode }) {
  const [perPage, setPerPage] = useState(10);
  const [direction, setDirection] = useState<PaginatorDirectionsType>("down");

  return (
    <PaginatorContext.Provider
      value={{
        perPage,
        setPerPage,
        direction,
        setDirection,
      }}
    >
      {children}
    </PaginatorContext.Provider>
  );
}

export default PaginatorContext;
