export const statusColors = {
  yellow: "#ff0",
  green: "#2cd601",
  red: "#cc0000",
};

export const YELLOW = statusColors.yellow;
export const GREEN = statusColors.green;
export const RED = statusColors.red;

export const reducerStatus = (Status: string) => {
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

export function reducerColor(color: string) {
  if (color === YELLOW) {
    return ["A ser atendido", YELLOW];
  }

  if (color === GREEN) {
    return ["Em atendimento", GREEN];
  }

  if (color === RED) {
    return ["Atendimento encerrado", RED];
  } else {
    return [null, null];
  }
}

export const statusVerboseToCode = (
  status: string
): "stts_0" | "stts_1" | "stts_2" => {
  if (status === "A ser atendido") {
    return "stts_0";
  }

  if (status === "Em atendimento") {
    return "stts_1";
  }

  if (status === "Atendimento encerrado") {
    return "stts_2";
  } else {
    return "stts_0";
  }
};
