import { ActionButton, ActionContainer, Td, Tr } from "../style";
import checkIsStatus from "./checkIsStatus";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Links } from "@/context/Links";

/* 
query: [[{}], [{}], [{}]]
*/

export function handleQuery(
  query,
  bodyExtraEmptySpace,
  handleOpenModal,
  navigate,
  direction,
  editFicha,
  getFicha
) {
  /* 
    De alguma forma ele está me retornando um array de arrays que 
    contém um único objeto, por isso uso o flat()
  */
  const q = query.flat(); // .flat() => query: [{}, {}, {}]

  return q.map((obj) => (
    <Tr key={obj.NIS_CPF} direction={direction}>
      {Object.values(obj).map((cell, cellIndex) => {
        const { isStts, content } = checkIsStatus(
          cell,
          obj.NIS_CPF,
          cellIndex,
          editFicha,
          getFicha
        );
        return isStts ? content : <Td key={cellIndex}>{cell}</Td>;
      })}

      {/* Action buttons */}
      <td>
        <ActionContainer className="ActionContainer">
          <ActionButton
            onClick={() => {
              handleOpenModal(obj.NIS_CPF);
            }}
            title="Excluir um registro é permanente!"
          >
            <FaRegTrashCan />
          </ActionButton>
          <ActionButton
            onClick={() => navigate(`${Links.CRIAR_FICHA}/${obj.NIS_CPF}`)}
          >
            <FaPenToSquare />
          </ActionButton>
        </ActionContainer>
      </td>
    </Tr>
  ));
}
