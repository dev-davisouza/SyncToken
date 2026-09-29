import Container from "@/components/Container";
import Message from "@/context/SocketContext/FlashMessage";
import List from "./components/List";
import useSocketContext from "@/hooks/useSocketContext";

export default function Benefits() {
  const { flashMessages } = useSocketContext();
  return (
    <Container>
      {flashMessages.length > 0 && <Message />}
      <List />
    </Container>
  );
}
