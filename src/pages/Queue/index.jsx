import { useEffect } from "react";
import Table from "@/components/Table";
import Container from "@/components/Container";
import { Legend } from "@/components/MiniBall";
import useFichaContext from "@/hooks/useFichaContext";
import mapperTheaders from "@/Middlewares/mapperTheaders";
import { useParams } from "react-router-dom";
import Message from "@/components/Message";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import { updateMsg } from "@/context/Model";
import useMessageContext from "@/hooks/useMessageContext";

export default function Queue() {
  const { id } = useParams();
  const { tableFichas, totalFichas } = useFichaContext();
  const { setPerPage } = usePaginatorContext();
  const { setMessageContent, setTypeMessage, messageContent } =
    useMessageContext(); // Desestrutura a mensagem e o tipo, se existirem

  if (!tableFichas) {
    return <div>Carregando dados...</div>;
  }

  useEffect(() => {
    // Resetar perPage ao valor padrão sempre que a rota mudar
    setPerPage(10);
  }, [id]);

  // É preciso se trancar por dentro e jogar a chave fora...
  useEffect(() => {
    if (!sessionStorage.getItem("msg")) {
      setMessageContent(updateMsg);
      setTypeMessage("info");
      sessionStorage.setItem("msg", true);
    }
  }, [sessionStorage.getItem("msg")]);

  return (
    <Container>
      {messageContent === updateMsg ? (
        <Message bolder interval={10000} />
      ) : (
        <Message />
      )}
      <Legend />
      {tableFichas && (
        <Table
          caption={"Fila das Fichas"}
          count={totalFichas}
          query={tableFichas}
          bodyExtraEmptySpace={true}
          headerExtraEmptySpace={true}
          hooks={useFichaContext}
        />
      )}
    </Container>
  );
}
