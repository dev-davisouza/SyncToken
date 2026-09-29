import { createContext, useEffect, useRef } from "react";
import { MsgFormatType, SocketContextType } from "./types";
import { wsPath } from "@/context/Links";
import IBackEndSocketEvent from "@/interfaces/IBackEndSocketEvent";
import { useState } from "react";

const SocketContext = createContext<SocketContextType | undefined>(undefined);
SocketContext.displayName = "SocketContext";

// Acrescentando a barra obrigatória do Django
const SOCKET_URL = `${wsPath}/`;

// Provider Function
export function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const socketRef = useRef<WebSocket | null>(null);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [flashMessages, setFlashMessages] = useState<MsgFormatType[]>([]);

  // Stabilishing the websocket connection
  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);

    // Evento básico de conexão
    socket.onopen = () => {
      console.log("Conexão WebSocket estabelecida.");
    };

    // Escutar mensagens enviadas pelo backend
    socket.onmessage = (event) => {
      try {
        // Converter o texto JSON em um objeto
        const data = JSON.parse(event.data);
        const { type, message } = data as IBackEndSocketEvent;

        switch (type) {
          case "connect":
            setFlashMessages((prevMessages) => [
              ...prevMessages,
              { msg: message, type: "info" },
            ]);
            break;
          case "form_error":
            setFlashMessages((prevMessages) => [
              ...prevMessages,
              { msg: message, type: "error" },
            ]);
            break;
          case "update":
          case "create":
            setTrigger((prev) => !prev);
            setFlashMessages((prevMessages) => [
              ...prevMessages,
              { msg: message, type: "success" },
            ]);
            break;

          default:
            console.warn("Tipo de mensagem desconhecido:", type);
        }
      } catch (error) {
        console.error("Erro ao processar mensagem do WebSocket:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
      console.warn("Conexão WebSocket encerrada.");
    };

    // Salvar a instância do socket na ref
    socketRef.current = socket;

    return () => {
      // Desconectar quando o componente for desmontado
      socket.close();
    };
  }, []);

  // Limpa as mensagens após 5 segundos
  useEffect(() => {
    if (flashMessages.length > 0) {
      const timer = setTimeout(() => {
        setFlashMessages([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [flashMessages]);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, trigger, flashMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
