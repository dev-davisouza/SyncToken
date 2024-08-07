import { useEffect, useState } from "react";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/components/Loader";
import { Links } from "@/context/Links";
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

export default function QueueTable() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [fichas, setFichas, isLoading] = usePeopleFichas(updateTrigger);
  const navigate = useNavigate(); // useNavigate no componente principal

  // Condições para renderizar o conteúdo baseado no estado das fichas
  if (isLoading) {
    return <Loading />;
  }

  if (fichas.length === 0) {
    return (
      <h3>
        Clique aqui para{" "}
        <Link style={{ color: "blue" }} to={Links.CRIAR_FICHA}>
          criar fichas
        </Link>
      </h3>
    );
  }

  return (
    <>
      <StyledCaption>Fila das Fichas</StyledCaption>

      <StyledFlexContainer>
        <StyledTable>
          <thead>
            <tr>
              <Th>N°</Th>
              <Th>NIS/CPF</Th>
              <Th>Nome</Th>
              <Th>Endereço</Th>
              <Th>Ação</Th>
              <Th>Data de registro</Th>
              <Th>Prioridade</Th>
              <Th>Status</Th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fichas.map((ficha) => (
              <Tr key={ficha.NIS_CPF}>
                <Td>{ficha.NdaFicha}</Td>
                <Td>{ficha.NIS_CPF}</Td>
                <Td>{ficha.Nome}</Td>
                <Td>{ficha.Endereço} </Td>
                {ficha.Ação === "Gestão de bloqueio/cancelamento" ? (
                  <Td $color="red">{ficha.Ação}</Td>
                ) : (
                  <Td>{ficha.Ação}</Td>
                )}

                <Td>{ficha.created_at}</Td>
                <Td>{ficha.Prioridade}</Td>
                <Td>
                  {
                    <MiniBallButton
                      title={ficha.Status[0]}
                      color={ficha.Status[1]}
                      onClick={() =>
                        handleStatusChange(
                          ficha.NIS_CPF,
                          ficha,
                          setFichas,
                          setUpdateTrigger
                        )
                      }
                    />
                  }
                </Td>
                <td>
                  <ActionContainer className="ActionContainer">
                    <ActionButton
                      onClick={() => {
                        handleRemove(ficha.NIS_CPF, setFichas, navigate);
                      }}
                      title="Excluir um registro é permanente!"
                    >
                      <FaRegTrashCan />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleEdit(ficha.NIS_CPF, navigate)}
                    >
                      <FaPenToSquare />
                    </ActionButton>
                  </ActionContainer>
                </td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>

        {fichas.map((ficha) => (
          <Card key={ficha.NIS_CPF}>
            <CardNumber>N°{ficha.NdaFicha}</CardNumber>
            <CardItem>
              <div>NIS/CPF:</div>
              <CardValue>{ficha.NIS_CPF}</CardValue>
            </CardItem>
            <CardItem>
              <div>Nome:</div>
              <CardValue>{ficha.Nome}</CardValue>
            </CardItem>
            <CardItem>
              <div>Endereço:</div>
              <CardValue>{ficha.Endereço}</CardValue>
            </CardItem>
            <CardItem>
              <div>Ação:</div>
              <CardValue>{ficha.Ação}</CardValue>
            </CardItem>
            <CardItem>
              <div>Data de registro:</div>
              <CardValue>{ficha.created_at}</CardValue>
            </CardItem>
            <CardItem>
              <div>Prioridade:</div>
              <CardValue>{ficha.Prioridade}</CardValue>
            </CardItem>
            <CardItem>
              <div>Status:</div>
              <CardValue>
                {
                  <MiniBallButton
                    title={ficha.Status[0]}
                    color={ficha.Status[1]}
                    onClick={() =>
                      handleStatusChange(
                        ficha.NIS_CPF,
                        ficha,
                        setFichas,
                        setUpdateTrigger
                      )
                    }
                  />
                }
              </CardValue>
            </CardItem>
            <ActionContainer>
              <ActionButton
                onClick={() => handleRemove(ficha.NIS_CPF, setFichas, navigate)}
                title="Excluir um registro é permanente!"
              >
                <FaRegTrashCan />
              </ActionButton>
              <ActionButton onClick={() => handleEdit(ficha.NIS_CPF, navigate)}>
                <FaPenToSquare />
              </ActionButton>
            </ActionContainer>
          </Card>
        ))}
      </StyledFlexContainer>
    </>
  );
}
