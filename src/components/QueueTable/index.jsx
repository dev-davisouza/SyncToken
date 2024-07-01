import { useEffect, useState } from "react";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Links } from "@/context/Links";
import reducer from "@/reducer";
import MiniBall from "@/components/MiniBall";
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

export default function QueueTable() {
  const [fichas, setFichas] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false); // Estado para controlar atualizações
  const navigate = useNavigate();

  /* Remove */
  function handleRemove(id) {
    fetch(`http://127.0.0.1:8000/pessoas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
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

        {/* Card responsive */}
        {fichas.map((ficha) => (
          <Card key={ficha.NIS_CPF}>
            <CardNumber>N°{ficha.N}</CardNumber>
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
              <CardValue className="OIE">{ficha.created_at}</CardValue>
            </CardItem>
            <CardItem>
              <div>Prioridade:</div>
              <CardValue>{ficha.Prioridade}</CardValue>
            </CardItem>
            <CardItem>
              <div>Status:</div>
              <CardValue>
                {<MiniBall title={ficha.Status[0]} color={ficha.Status[1]} />}
              </CardValue>
            </CardItem>
            <ActionContainer>
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
          </Card>
        ))}
      </StyledFlexContainer>
    </>
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
