import { Links } from "@/context/Links";
import { NavigateFunction } from "react-router-dom";

export function handleViewRelatorio(id: string, navigate: NavigateFunction) {
  navigate(`${Links.RELATORIOS}/${id}`);
}
