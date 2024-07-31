import { useState, useEffect } from "react";

export function useRelatorios() {
  const apiPath = import.meta.env.VITE_API_URL;

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
