import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Links } from "@/context/Links";
import reducer from "@/reducer";
import apiPath from "@/context/Api";
import MiniBall from "@/components/MiniBall";

const StyledTable = styled.table`
  font-size: 16px;
  width: 100%;
  margin: auto;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border: none;
  transition: all 50ms ease-in-out;
  &:hover {
    background-color: #ccc;
  }
  &:hover .ActionContainer {
    opacity: 100%;
  }
`;

const Th = styled.th`
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 16px;
`;

const Td = styled.td`
  border: none;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  @media (max-width: 768px) {
    border: none;
    text-align: left;
    display: block;
    position: relative;
    padding-left: 50%;
  }
`;

const StyledCaption = styled.caption`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  gap: 12px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  opacity: 50%;
`;

const ActionButton = styled.button`
  all: unset;
  cursor: pointer;
`;

export default function QueueTable() {
  const [fichas, setFichas] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false); // Estado para controlar atualizações
  const navigate = useNavigate();

  /* Remove */
  function handleRemove(id) {
    fetch(`${apiPath}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((ficha) => {
        setFichas(fichas.filter((ficha) => ficha.id !== id));
        setUpdateTrigger((prev) => !prev);
      });
  }
  /* edit */
  function handleEdit(id) {
    navigate(`${Links.CRIAR_FICHA}/${id}`);
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/pessoas/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const updatedData = data.map((ficha) => ({
          ...ficha,
          Status: reducer(ficha.Status),
        }));
        setFichas(updatedData);
      })
      .catch((err) => console.log(err));
  }, [updateTrigger]);

  return fichas.length !== 0 ? (
    <StyledFlexContainer>
      <StyledTable>
        <StyledCaption>Fila das Fichas</StyledCaption>
        <thead>
          <tr>
            <Th>N°</Th>
            <Th>NIS/CPF</Th>
            <Th>Nome</Th>
            <Th>Endereço</Th>
            <Th>Ação</Th>
            <Th>Data</Th>
            <Th>Prioridade</Th>
            <Th>Status</Th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fichas.map((ficha) => (
            <Tr key={ficha.NIS_CPF}>
              <Td>{ficha.N}</Td>
              <Td>{ficha.NIS_CPF}</Td>
              <Td>{ficha.Nome}</Td>
              <Td>{ficha.Endereço} </Td>
              <Td>{ficha.Ação}</Td>

              {/* Atributo que vem do model do DRF para representar a Data*/}
              <Td>{ficha.created_at}</Td>

              <Td>{ficha.Prioridade}</Td>
              <Td>
                {<MiniBall title={ficha.Status[0]} color={ficha.Status[1]} />}
              </Td>
              <td>
                <ActionContainer className="ActionContainer">
                  <ActionButton
                    onClick={() => handleRemove(ficha.N)}
                    title="Excluir um registro é permanete!"
                  >
                    <FaRegTrashCan />
                  </ActionButton>
                  <ActionButton onClick={() => handleEdit(ficha.N)}>
                    <FaPenToSquare />
                  </ActionButton>
                </ActionContainer>
              </td>
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledFlexContainer>
  ) : (
    <h1>
      Crie uma ficha
      <Link
        to={Links.CRIAR_FICHA}
        children="neste link"
        style={{ color: "darkblue" }}
      />
    </h1>
  );
}
