import ReportDetailTable from "./ReportDetailTable";
import Container from "@/components/Container";
import Message from "@/components/Message";
import useMessageContext from "@/hooks/useMessageContext";

/* 
ALTERE O COMPOENNTE DE MESSAGE PARA QUE O 
TRIGGER SEMPRE ATUALIZE O ESTADO E MENSAGEM SEJA EXIBIDA SEMPRE
*/
export default function ReportDetail() {
  const { messageContent } = useMessageContext();

  return (
    <Container>
      {messageContent && <Message />}
      <ReportDetailTable />
    </Container>
  );
}
