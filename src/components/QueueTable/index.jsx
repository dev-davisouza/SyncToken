import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  font-size: 16px;
  border: 2px solid black;
  width: 100%;
  margin: auto;
  background-color: beige;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border: 2px solid black;
`;

const Th = styled.th`
  border: 2px solid black;
  background-color: #bfc361;
  padding: 16px;
`;

const Td = styled.td`
  border: 2px solid black;
  text-align: center;
  padding: 10px;
`;

const StyledCaption = styled.caption`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export default function QueueTable() {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/fichas", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setFichas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledTable>
      <StyledCaption>Fila das Fichas</StyledCaption>
      <thead>
        <Tr>
          <Th>N°</Th>
          <Th>NIS/CPF</Th>
          <Th>Nome</Th>
          <Th>Endereço</Th>
          <Th>Ação</Th>
          <Th>Data</Th>
          <Th>Prioridade</Th>
        </Tr>
      </thead>
      <tbody>
        {fichas.map((ficha) => (
          <Tr key={ficha.NIS_CPF}>
            <Td>{ficha.N}</Td>
            <Td>{ficha.NIS_CPF}</Td>
            <Td>{ficha.Nome}</Td>
            <Td>{ficha.Endereço} </Td>
            <Td>{ficha.Ação}</Td>
            <Td>{ficha.Data}</Td>
            <Td>{ficha.Prioridade}</Td>
          </Tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
