import { statusColors } from "@/context/Model";

export const YELLOW = statusColors.yellow;
export const GREEN = statusColors.green;
export const RED = statusColors.red;

const reducer = (Status) => {
  if (Status === "stts_0") {
    return ["A ser atendido", YELLOW];
  }

  if (Status === "stts_1") {
    return ["Em atendimento", GREEN];
  }
  if (Status === "stts_2") {
    return ["Atendimento encerrado", RED];
  }
  throw new Error(`Status desconhecido: ${Status}`);
};

export const reducerColor = (color) => {
  if (color === YELLOW) {
    return ["A ser atendido", YELLOW];
  }

  if (color === GREEN) {
    return ["Em atendimento", GREEN];
  }

  if (color === RED) {
    return ["Atendimento encerrado", RED];
  } else {
    return undefined;
  }
};

export default reducer;
