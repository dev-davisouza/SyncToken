import { createContext, useState } from "react";

const MessageContext = createContext();
MessageContext.displayName = "MessageContext";

export function MessageProvider({ children }) {
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setTypeMessage] = useState(null);

  return (
    <MessageContext.Provider
      value={{ setMessageContent, messageContent, setTypeMessage, messageType }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export default MessageContext;
