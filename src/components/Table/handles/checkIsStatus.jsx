import { reducerStatus } from "@/reducers/reducerSttsColor";
import { MiniBallButton } from "@/components/MiniBall";
import { Td } from "../style";
import getNextStatus from "./getNextStatus";

export default function checkIsStatus(
  cell,
  id,
  cellIndex,
  editFicha,
  getFicha
) {
  if (typeof cell === "string" && cell.includes("stts")) {
    const [title, color] = reducerStatus(cell);
    return {
      content: (
        <Td key={cellIndex}>
          <MiniBallButton
            color={color}
            title={title}
            onClick={async () =>
              editFicha(await getFicha(id), {
                Status: getNextStatus(cell),
              })
            }
          />
        </Td>
      ),
      isStts: true,
    };
  } else {
    return {
      content: null,
      isStts: false,
    };
  }
}
