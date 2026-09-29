// src/hooks/usePaginatorContext.ts

import { useContext } from "react";
import PaginatorContext from "@/context/PaginatorContext";
import { PaginatorContextType } from "@/context/PaginatorContext/types";

export default function usePaginatorContext() {
  const initalContext = useContext(PaginatorContext) as PaginatorContextType;

  function handlePerPage(type: "more" | "less") {
    // Handle Per Page
    initalContext.setPerPage((prevPerPage) =>
      type === "more" ? prevPerPage + 10 : prevPerPage - 10
    );

    // Handle direction
    initalContext.setDirection(type === "more" ? "down" : "up");
  }

  return {
    handlePerPage,
    ...initalContext,
  };
}
