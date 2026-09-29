// src/pages/Queue/handleQuery.tsx

import { MiniBallButton } from "@/components/MiniBall";
import {
  ActionButton,
  ActionContainer,
  Card,
  CardItem,
  CardNumber,
  CardValue,
  Td,
  Tr,
} from "@/components/Table/style";
import { Links } from "@/context/Links";
import { QueryRowType } from "@/interfaces/recordTypes";
import { reducerStatus } from "@/hooks/useSttsColor";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import type { QueueActions } from "./useQueueActions";

/* ============================================================
 *  DESKTOP — Linhas da tabela
 * ============================================================ */
export function HandleQuery(query: QueryRowType[], actions: QueueActions) {
  return (
    <>
      {query.map((obj) => (
        <Tr key={String(obj["NIS/CPF"])}>
          {Object.values(obj).map((cell, index) => {
            const { isStts, content } = checkIsStatus(
              cell,
              String(obj["NIS/CPF"]),
              actions,
            );
            return isStts ? (
              content
            ) : (
              <Td key={`${String(obj["NIS/CPF"])}-${index}`}>{cell}</Td>
            );
          })}

          <td>
            <ActionContainer>
              <ActionButton
                onClick={() => actions.handleOpenModal(String(obj["NIS/CPF"]))}
                title="Excluir um registro é permanente!"
              >
                <FaRegTrashCan />
              </ActionButton>
              <ActionButton
                onClick={() =>
                  (window.location.href = `${Links.CRIAR_FICHA}/${obj["NIS/CPF"]}`)
                }
              >
                <FaPenToSquare />
              </ActionButton>
            </ActionContainer>
          </td>
        </Tr>
      ))}
    </>
  );
}

/* ============================================================
 *  MOBILE — CARD ÚNICO
 *  Recebe `index` como prop (vem do Table), NÃO recalcula.
 * ============================================================ */
export function QueueCard({
  row,
  index,
  actions,
}: {
  row: QueryRowType;
  index: number;
  actions: QueueActions;
}) {
  const navigate = useNavigate();
  const id = String(row["NIS/CPF"]);

  return (
    <Card>
      <CardNumber>#{index + 1}</CardNumber>

      {Object.entries(row).map(([key, value]) => {
        const isStatus = typeof value === "string" && value.includes("stts");

        if (isStatus) {
          const currentStatus = actions.optimisticStatuses[id] ?? String(value);
          const [title, color] = reducerStatus(currentStatus);
          return (
            <CardItem key={key}>
              <div>{key}</div>
              <MiniBallButton
                $color={color}
                title={title}
                onClick={() => actions.handleStatusUpdate(id, currentStatus)}
              />
            </CardItem>
          );
        }

        return (
          <CardItem key={key}>
            <div>{key}</div>
            <CardValue>{String(value ?? "-")}</CardValue>
          </CardItem>
        );
      })}

      <ActionContainer $opacity={1}>
        <ActionButton
          onClick={() => actions.handleOpenModal(id)}
          title="Excluir um registro é permanente!"
        >
          <FaRegTrashCan />
        </ActionButton>
        <ActionButton onClick={() => navigate(`${Links.CRIAR_FICHA}/${id}`)}>
          <FaPenToSquare />
        </ActionButton>
      </ActionContainer>
    </Card>
  );
}

/* ============================================================
 *  Helper
 * ============================================================ */
function checkIsStatus(
  cell: string | number | boolean | null,
  id: string,
  actions: QueueActions,
) {
  if (typeof cell === "string" && cell.includes("stts")) {
    const currentStatus = actions.optimisticStatuses[id] ?? cell;
    const [title, color] = reducerStatus(currentStatus);

    return {
      isStts: true,
      content: (
        <Td key={`${id}-stts`}>
          <MiniBallButton
            $color={color}
            title={title}
            onClick={() => actions.handleStatusUpdate(id, currentStatus)}
          />
        </Td>
      ),
    };
  }
  return { isStts: false, content: null };
}
