import Container from "@/components/Container";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loader";
import {
  Card,
  CardItem,
  CardValue,
  StyledCaption,
  StyledFlexContainer,
  StyledTable,
  Td,
  Th,
  Tr,
} from "@/components/QueueTable/styles";
import { usePessoaFromRelatorio } from "./getters";

export default function ReportDetail() {
  const { id } = useParams();
  const pessoas = usePessoaFromRelatorio(id);

  return pessoas.length !== 0 ? (
    <>
      <Container>
        <StyledCaption>Relatório</StyledCaption>
        <StyledFlexContainer>
          <StyledTable>
            <thead>
              <tr>
                <Th>NIS/CPF</Th>
                <Th>Nome</Th>
                <Th>Endereço</Th>
                <Th>Ação</Th>
                <Th>Data de registro</Th>
                <Th>Última atualização</Th>
                <Th>Prioridade</Th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <Tr key={pessoa.NIS_CPF}>
                  <Td>{pessoa.NIS_CPF}</Td>
                  <Td>{pessoa.Nome}</Td>
                  <Td>{pessoa.Endereço} </Td>
                  {pessoa.Ação === "Gestão de bloqueio/cancelamento" ? (
                    <Td $color="red">{pessoa.Ação}</Td>
                  ) : (
                    <Td>{pessoa.Ação}</Td>
                  )}
                  <Td>{pessoa.created_at}</Td>
                  <Td>{pessoa.last_update}</Td>
                  <Td>{pessoa.Prioridade}</Td>
                </Tr>
              ))}
            </tbody>
          </StyledTable>

          {pessoas.map((pessoa) => (
            <Card key={pessoa.NIS_CPF}>
              <CardItem>
                <div>NIS/CPF:</div>
                <CardValue>{pessoa.NIS_CPF}</CardValue>
              </CardItem>
              <CardItem>
                <div>Nome:</div>
                <CardValue>{pessoa.Nome}</CardValue>
              </CardItem>
              <CardItem>
                <div>Endereço:</div>
                <CardValue>{pessoa.Endereço}</CardValue>
              </CardItem>
              <CardItem>
                <div>Ação:</div>
                <CardValue>{pessoa.Ação}</CardValue>
              </CardItem>
              <CardItem>
                <div>Data:</div>
                <CardValue>{pessoa.created_at}</CardValue>
              </CardItem>
              <CardItem>
                <div>Última atualização:</div>
                <CardValue>{pessoa.last_update}</CardValue>
              </CardItem>
              <CardItem>
                <div>Prioridade:</div>
                <CardValue>{pessoa.Prioridade}</CardValue>
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
