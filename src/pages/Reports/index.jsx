import Container from "@/components/Container";
import ReportTable from "./ReportTable";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import Message from "@/components/Message";
import useMessageContext from "@/hooks/useMessageContext";

export default function Reports() {
  const { setPerPage } = usePaginatorContext();
  const { id } = useParams();
  const { messageContent } = useMessageContext();

  useEffect(() => {
    // Resetar perPage ao valor padrão sempre que a rota mudar
    setPerPage(10);
  }, [id]);

  return (
    <Container>
      {messageContent && <Message />}
      <ReportTable />
    </Container>
  );
}
