import QueueTable from "@/components/QueueTable";
import Container from "@/components/Container";
import { Legend } from "@/components/MiniBall";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Message from "@/components/Message";
import { usePeopleFichas } from "@/components/QueueTable/handles.jsx";

export default function Queue() {
  const [queueMessage, setQueueMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.message) {
      setQueueMessage(location.state.message);
      // Limpar a mensagem do estado de navegação
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <Container>
      <Message type="success" msg={queueMessage} />
      <Legend />
      <QueueTable />
    </Container>
  );
}
