import Container from "@/components/Container";
import useMessageContext from "@/hooks/useMessageContext";
import Message from "@/components/Message";
import List from "@/pages/Benefits/List";

export default function Benefits() {
  const { messageContent } = useMessageContext();
  return (
    <Container>
      {messageContent && <Message />}
      <List />
    </Container>
  );
}
