import { useEffect, useState } from "react";
import apiPath from "@/context/Api";

export function usePessoasRelatorio() {
  const [fichas, setFichas] = useState("");

  // Função para formatar a data como YYYY-MM-DD no horário local
  const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayString = getLocalDateString(new Date());

  useEffect(() => {
    fetch(`${apiPath}/pessoas/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log(todayString);
        const filteredFichas = data.filter(
          (ficha) => ficha.created_at === todayString
        );
        setFichas(filteredFichas);
      })
      .catch((err) => console.log(err));
  }, []);

  return fichas;
}
