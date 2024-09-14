import { createContext, useEffect, useState } from "react";

const PaginatorContext = createContext();
PaginatorContext.displayName = "PaginatorContext";

export function PaginatorProvider({ children }) {
  // Estados
  const [perPage, setPerPage] = useState(10);
  const [direction, setDirection] = useState("down");

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
