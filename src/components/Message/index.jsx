import { useState, useEffect } from "react";
import { BolderMsg, MessageContent } from "./style";
import useMessageContext from "@/hooks/useMessageContext";

export default function Message({ interval = 3000, bolder = false }) {
  const { messageContent, messageType, setMessageContent } =
    useMessageContext();

  const [visible, setVisible] = useState(false);

  // handle visible
  useEffect(() => {
    if (!messageContent) {
      setVisible(false);
      return;
    }

    setVisible(true);

    // Scrolla até o topo do componente da mensagem
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const timer = setTimeout(() => {
      setVisible(false);
      // Limpa a mensagem após o timer
      setTimeout(() => setMessageContent(null), 300);
    }, interval);

    return () => clearTimeout(timer);
  }, [messageContent]);

  return (
    <>
      {visible && (
        <MessageContent $type={messageType}>
          {bolder ? (
            <BolderMsg dangerouslySetInnerHTML={{ __html: messageContent }} />
          ) : (
            <p>{messageContent}</p>
          )}
        </MessageContent>
      )}
    </>
  );
}
