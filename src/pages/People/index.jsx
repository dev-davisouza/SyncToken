import Container from "@/components/Container";
import Table from "@/components/Table";
import useFichaContext from "@/hooks/useFichaContext";
import mapperTheaders from "@/Middlewares/mapperTheaders";
import { useEffect, useMemo, useState } from "react";
import { removeFields } from "@/Middlewares/filterFields";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import { useParams } from "react-router-dom";
import useMessageContext from "@/hooks/useMessageContext";
import Message from "@/components/Message";
import useTriggerContext from "@/hooks/useTriggerContext";

export default function People() {
  const { updatedTrigger } = useTriggerContext();
  const { id } = useParams();
  const { setPerPage, perPage } = usePaginatorContext();
  const { fetchAllPessoas } = useFichaContext();
  const { messageContent } = useMessageContext();
  const [pessoas, setPessoas] = useState([]);
  const [totalPessoas, setTotalPessoas] = useState(0);

  // Busque as pessoas
  useEffect(() => {
    async function getAllPessas() {
      const [response, count] = await fetchAllPessoas();
      setTotalPessoas(count);
      setPessoas(response);
    }
    getAllPessas();
  }, [perPage]);

  // Filtra `fichas` somente quando eles mudarem
  const filteredPessoas = useMemo(() => {
    const fieldsToRemove = ["Status", "DocType", "NdaFicha"];
    if (pessoas.length > 0)
      return pessoas.map((pessoa) => removeFields(pessoa, fieldsToRemove));
    else return [];
  }, [pessoas, updatedTrigger]);

  useEffect(() => {
    // Resetar perPage ao valor padrão sempre que a rota mudar
    setPerPage(10);
  }, [id]);

  return (
    filteredPessoas.length > 0 &&
    totalPessoas > 0 && (
      <Container>
        {messageContent && <Message />}
        <Table
          caption={"Pessoas Registradas"}
          query={filteredPessoas}
          count={totalPessoas}
          headerMiddleware={mapperTheaders}
          hooks={useFichaContext}
        />
      </Container>
    )
  );
}

/* 
  DEIXA RESPONSIVO AÊ MISERA E COMPRETA AÍ O BAGUI
  DA PÁGINA DE UPDATES
*/
