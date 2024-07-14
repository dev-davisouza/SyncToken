import { useState, useEffect } from "react";
import apiPath from "@/context/Api";

export function useRelatorios() {
  const [relatorios, setRelatorios] = useState([]);
  useEffect(() => {
    fetch(`${apiPath}/relatorios/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRelatorios(Object.values(data));
      })
      .catch((err) => console.error("Erro ao buscar Relatorios:", err));
  }, []);
  return relatorios;
}
