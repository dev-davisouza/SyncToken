import { io } from "socket.io-client";
import { apiPath } from "@/context/Links";
/*
const socket = io(apiPath, {
  path: "/ws/socket.io/",
  transports: ["websocket"], // Garante a compatibilidade entre transporte websocket e polling
});

// Verificar conexão
 socket.on("connect", () => {
  console.log("Conectado ao servidor WebSocket:", socket.id);
});

// Lidar com erros
socket.on("connect_error", (error) => {
  console.error("Erro de conexão com o WebSocket:", error);
}); 

export default socket;
*/
