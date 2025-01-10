import Container from "@/components/Container";
import Form from "@/components/Form";
import useHeaders from "@/hooks/useHeaders";
import useFichaContext from "@/hooks/useFichaContext";
import filterFields from "@/Middlewares/filterFields";
import handleSubmit from "./handleSubmit";
import sortFields from "@/Middlewares/sortFields";
import useMessageContext from "@/hooks/useMessageContext";
import Message from "@/components/Message";
import { useEffect, useState } from "react";

export default function ServiceBook() {
  const { fichas, fetchModel } = useFichaContext();
  const fieldsToRemove = ["last_update", "NdaFicha", "created_at"];
  const selectFields = [
    "DocType",
    "Ação",
    "Prioridade",
    "Status",
    "benefit_situation",
  ];
  const { messageContent } = useMessageContext(); // Desestrutura a mensagem
  // Estado para armazenar os cabeçalhos ou dados que você precisa após a chamada de fetchModel
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    async function getModel() {
      const response = await fetchModel();
      const model = Object.values(response);
      setHeaders(model);
    }
    getModel();
  }, []);

  return (
    <Container>
      {messageContent && <Message />}
      {headers.length > 0 && (
        <Form
          Legend="Livro de atendimento"
          textFields={sortFields(filterFields(headers, fieldsToRemove), [
            "DocType",
          ])}
          selectFields={selectFields}
          handleSubmit={handleSubmit}
        />
      )}
    </Container>
  );
}
