// Define o tipo para o contexto
export interface SocketContextType {
  socket: WebSocket | null;
  trigger: boolean;
  flashMessages: MsgFormatType[];
}

export type MsgFormatType = { msg: string; type: MsgTypes };

export type MsgTypes = "success" | "error" | "info";
