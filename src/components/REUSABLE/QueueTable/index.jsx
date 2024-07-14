import { useEffect, useState } from "react";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loader";
import {
  ActionButton,
  ActionContainer,
  Card,
  CardItem,
  CardNumber,
  CardValue,
  StyledCaption,
  StyledFlexContainer,
  StyledTable,
  Td,
  Th,
  Tr,
} from "./styles";
import {
  handleRemove,
  usePeopleFichas,
  handleStatusChange,
  handleEdit,
} from "./handles";
import { MiniBallButton } from "@/components/MiniBall";

export default function QueueTable(
  headers = [],
  values = [],
  LastEmptyTh = false
) {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [fichas, setFichas, isLoading] = usePeopleFichas(updateTrigger);
  const navigate = useNavigate(); // useNavigate no componente principal

  // Condições para renderizar o conteúdo baseado no estado das fichas
  if (isLoading) {
    return <Loading />;
  }

  if (fichas.length === 0) {
    return <div>Clique aqui para criar fichas</div>;
  }

  return fichas ? (
    <>
      <StyledCaption>Fila das Fichas</StyledCaption>

      <StyledFlexContainer>
        <StyledTable>
          <thead>
            <tr>
              {headers.map((header) => (
                <Th key={header}>{header}</Th>
              ))}
              {LastEmptyTh && <th></th>}
            </tr>
          </thead>
          <tbody>
            <Tr>
              {values.map((value) => (
                <Td key={value}>{value}</Td>
              ))}
            </Tr>
          </tbody>
        </StyledTable>
      </StyledFlexContainer>
    </>
  ) : (
    <Loading />
  );
}
