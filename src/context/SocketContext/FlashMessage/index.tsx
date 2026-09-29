// src/context/SocketContext/FlashMessage/index.tsx

import useSocketContext from "@/hooks/useSocketContext";
import { useState, useEffect } from "react";
import { MessageContainer, MessageContent } from "./style";
import { MsgFormatType } from "../types";

export default function Message() {
  const { flashMessages } = useSocketContext(); // Mensagens recebidas do context
  const [currentMessages, setCurrentMessages] = useState<MsgFormatType[]>([]);
  const [timeouts, setTimeouts] = useState<{ [key: string]: number }>({});
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50); // Fixa a mensagem após 50px de rolagem
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (flashMessages.length > 0) {
      setCurrentMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];

        flashMessages.forEach((newMsg) => {
          const key = String(newMsg.msg + newMsg.type);
          const existingMsgIndex = updatedMessages.findIndex(
            (msg) => msg.msg === newMsg.msg && msg.type === newMsg.type
          );

          if (existingMsgIndex !== -1) {
            clearTimeout(timeouts[key]);
          } else {
            updatedMessages.push(newMsg);
          }

          const newTimer = setTimeout(() => {
            setCurrentMessages((msgs) =>
              msgs.filter(
                (msg) => msg.msg !== newMsg.msg || msg.type !== newMsg.type
              )
            );
            setTimeouts((prev) => {
              const updatedTimeouts = { ...prev };
              delete updatedTimeouts[key];
              return updatedTimeouts;
            });
          }, 5000);

          setTimeouts((prev) => ({ ...prev, [key]: newTimer }));
        });

        return updatedMessages;
      });
    }
  }, [flashMessages, timeouts]);

  return (
    <MessageContainer>
      {currentMessages.length > 0 &&
        currentMessages.map(({ msg, type }) => (
          <MessageContent key={msg + type} type={type} isFixed={isFixed}>
            <p dangerouslySetInnerHTML={{ __html: msg }} />
          </MessageContent>
        ))}
    </MessageContainer>
  );
}
