import Container from "@/components/Container";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loader";

import {
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
} from "@/components/QueueTable/styles";
import { usePessoasRelatorio } from "./getters";

export default function ReportDetail() {
  const fichas = usePessoasRelatorio();
  /* FILTRE PESSOAS POR CREATED AT */
  const navigate = useNavigate(); // useNavigate no componente principal

  return fichas.length !== 0 ? (
    <>
      <Container>
        <StyledCaption>Relatório</StyledCaption>

        <StyledFlexContainer>
          <StyledTable>
            <thead>
              <tr>
                <Th>N°</Th>
                <Th>NIS/CPF</Th>
                <Th>Nome</Th>
                <Th>Endereço</Th>
                <Th>Ação</Th>
                <Th>Data</Th>
                <Th>Prioridade</Th>
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
                <div>Data:</div>
                <CardValue>{ficha.created_at}</CardValue>
              </CardItem>
              <CardItem>
                <div>Prioridade:</div>
                <CardValue>{ficha.Prioridade}</CardValue>
              </CardItem>
            </Card>
          ))}
        </StyledFlexContainer>
      </Container>
    </>
  ) : (
    <Loading />
  );
}
