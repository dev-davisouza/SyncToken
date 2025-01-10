import { io } from "socket.io-client";
import { apiPath } from "@/context/Links";

const socket = io(apiPath);

// Evento para verificar a conexão
socket.on("connect", () => {
  console.log("Conectando ao servidor: ", socket.id);
});

// Exemplo: Enviar mensagem para o servidor
export const enviarMensagem = (msg) => {
  socket.emit("Mensagem do capira", msg);
};

// Exemplo: Receber resposta do servidor
socket.on("respostinha do pretu", (dados) => {
  console.log("Resposta do servidor negru: ", dados);
});

export default socket;
