import { useEffect, useState } from "react";
import { ReportDetailModel } from "../../context/Model";
import { useNavigate } from "react-router-dom";

// Função para formatar a data como YYYY-MM-DD no horário local
const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const apiPath = import.meta.env.VITE_API_URL;

export function useRelatorio(date) {
  const [relatorio, setRelatorio] = useState({ ...ReportDetailModel });
  useEffect(() => {
    fetch(`${apiPath}/relatorios/${date}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRelatorio(data);
      })
      .catch((err) => console.error("Erro ao buscar Relatorios:", err));
  }, []);
  return relatorio;
}

export function usePessoaFromRelatorio(date) {
  const [relatorioPessoas, setRelatorioPessoas] = useState([]);
  const relatorio = useRelatorio(date);

  useEffect(() => {
    if (relatorio.pessoas && relatorio.pessoas.length > 0) {
      const fetchPessoas = async () => {
        const pessoasData = await Promise.all(
          relatorio.pessoas.map((pk) =>
            fetch(`${apiPath}/pessoas-all/${pk}`, {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }).then((resp) => resp.json())
          )
        );
        setRelatorioPessoas(pessoasData);
      };
      fetchPessoas();
    }
  }, [relatorio.pessoas]);

  return relatorioPessoas;
}
