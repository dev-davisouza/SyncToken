import { useContext } from "react";
import SocketContext from "@/context/SocketContext";
import { SocketContextType } from "@/context/SocketContext/types";

export default function useSocketContext() {
  return useContext(SocketContext) as SocketContextType;
}
