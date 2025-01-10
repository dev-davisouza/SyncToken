import ReportDetailTable from "./ReportDetailTable";
import Container from "@/components/Container";
import Message from "@/components/Message";
import useMessageContext from "@/hooks/useMessageContext";

export default function ReportDetail() {
  const { messageContent } = useMessageContext();

  return (
    <Container>
      {messageContent && <Message />}
      <ReportDetailTable />
    </Container>
  );
}
