import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import {
  ActionButton,
  ActionContainer,
  Card,
  StyledCaption,
  StyledFlexContainer,
  StyledTable,
  Td,
  Th,
  Tr,
} from "@/components/QueueTable/styles";
import reducer from "@/reducer";
import { useEffect, useState } from "react";
import MiniBall from "@/components/MiniBall";
import {
  CardItem,
  CardNumber,
  CardValue,
} from "../../components/QueueTable/styles";

export default function PeopleTable() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/pessoas-all/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const updatedData = data.map((pessoa) => ({
          ...pessoa,
          Status: reducer(pessoa.Status),
        }));
        setPessoas(updatedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <StyledCaption>Pessoas registradas</StyledCaption>

      <StyledFlexContainer>
        <StyledTable>
          <thead>
            <tr>
              <Th>NIS/CPF</Th>
              <Th>Nome</Th>
              <Th>Endereço</Th>
              <Th>Ação recente</Th>
              <Th>Data de inclusão</Th>
              <Th>Prioridade</Th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa) => (
              <Tr key={pessoa.NIS_CPF}>
                <Td>{pessoa.NIS_CPF}</Td>
                <Td>{pessoa.Nome}</Td>
                <Td>{pessoa.Endereço}</Td>
                <Td>{pessoa.Ação}</Td>
                <Td>{pessoa.created_at}</Td>
                <Td>{pessoa.Prioridade}</Td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>

        {/* Card responsive */}
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
              <div>Ação recente:</div>
              <CardValue>{pessoa.Ação}</CardValue>
            </CardItem>
            <CardItem>
              <div>Data de inclusão:</div>
              <CardValue className="OIE">{pessoa.created_at}</CardValue>
            </CardItem>
            <CardItem>
              <div>Prioridade:</div>
              <CardValue>{pessoa.Prioridade}</CardValue>
            </CardItem>
          </Card>
        ))}
      </StyledFlexContainer>
    </>
  );
}
