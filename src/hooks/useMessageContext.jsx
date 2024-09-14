import { useContext } from "react";
import MessageContext from "@/context/MessageContext";

export default function useMessageContext() {
  const { setMessageContent, messageContent, setTypeMessage, messageType } =
    useContext(MessageContext);

  return {
    setMessageContent,
    messageContent,
    setTypeMessage,
    messageType,
  };
}
