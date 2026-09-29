import useSocketContext from "@/hooks/useSocketContext";
import { IServiceBook } from "../type";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HandleFocus(name: keyof IServiceBook): boolean {
  const { flashMessages } = useSocketContext();

  for (const message of flashMessages) {
    const { msg } = message;
    let firstPart = msg.split(" ")[0]; // Pega apenas a parte antes do espaço
    // Remove tags HTML caso existam
    firstPart = firstPart.replace(/<\/?[^>]+(>|$)/g, "");

    // Remove dois pontos (caso existam)
    firstPart = firstPart.replace(/:/g, "");

    if (firstPart == name) {
      return true;
    }
  }
  return false;
}
