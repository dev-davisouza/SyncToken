import Table from "@/components/Table";
import useFichaContext from "@/hooks/useFichaContext";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import useRelatorioContext from "@/hooks/useRelatorioContext";
import useTriggerContext from "@/hooks/useTriggerContext";
import { removeFields } from "@/Middlewares/filterFields";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Links } from "@/context/Links";
import Loading from "@/components/Loader";

export default function ReportDetailTable() {
  const navigate = useNavigate();
  const { updatedTrigger } = useTriggerContext();
  const { id } = useParams();
  const { perPage, setPerPage } = usePaginatorContext();
  const { fetchRelatorioByDate } = useRelatorioContext();
  const [pessoas, setPessoas] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadPessoas() {
      try {
        const [fetchedPessoas, total] = await fetchRelatorioByDate(id, perPage);
        if (fetchedPessoas == undefined) {
          navigate(Links.RELATORIOS);
        }

        const fieldsToRemove = [
          "Status",
          "DocType",
          "NdaFicha",
          "isUnderInvestigation",
        ];
        const filteredPessoas = fetchedPessoas.map((pessoa) =>
          removeFields(pessoa, fieldsToRemove)
        );
        setCount(total);
        setPessoas(filteredPessoas);
      } catch (error) {
        console.error("Erro ao carregar as fichas:", error);
      }
    }

    loadPessoas();
  }, [id, perPage, updatedTrigger]);

  useEffect(() => {
    // Resetar perPage ao valor padrão sempre que a rota mudar
    setPerPage(10);
  }, [id]);

  const date = new Date(`${id}T00:00:00-03:00`);
  // JSX Return
  return count ? (
    <Table
      caption={`Relatório  ${date.toLocaleDateString("pt-BR", {
        timeZone: "America/Recife", // Especifica o fuso horário
      })}`}
      query={pessoas}
      count={count}
      hooks={useFichaContext}
    ></Table>
  ) : (
    <Loading />
  );
}
