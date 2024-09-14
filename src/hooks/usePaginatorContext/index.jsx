import PaginatorContext from "@/context/PaginatorContext";
import { useContext } from "react";

export default function usePaginatorContext() {
  const { perPage, setPerPage, direction, setDirection } =
    useContext(PaginatorContext);

  return {
    perPage,
    setPerPage,
    direction,
    setDirection,
  };
}
