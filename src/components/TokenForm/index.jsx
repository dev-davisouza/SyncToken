import { Input, Dropdown } from "@/components/Field";
import styled from "styled-components";
import SubmitButton from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import { ServiceBookModel } from "@/context/Model";
import { Prioridades, Ações, dataMsg, Status } from "@/context/Model";
import { useParams } from "react-router-dom";

const StyledLegend = styled.legend`
  text-align: center;
  display: block;
  font-size: 32px;
  margin-bottom: 16px;
  font-weight: 600;
`;

const StyledOption = styled.option`
  font-size: 14px;
`;

export default function TokenForm({ handleSubmit }) {
  const { id } = useParams();
  const [data, setData] = useState({ ...ServiceBookModel });
  const [queueLength, setQueueLength] = useState(0);

  const currentDate = new Date().toISOString().split("T")[0];
  useEffect(() => {
    setData((prevData) => ({ ...prevData, Data: currentDate }));
  }, [currentDate]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/fichas/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          // Verifica e converte Status para array, se necessário
          if (typeof data.Status === "string") {
            data.Status = data.Status.split(","); // Converte para array
          }
          setData(data);
        })
        .catch((err) => console.log(err));
    } else {
      fetch("http://localhost:5000/fichas", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          let currentLength = data.length;
          let futureLength = currentLength + 1;
          const newId = String(futureLength);
          setQueueLength(futureLength);
          setData((prevData) => ({
            ...prevData,
            N: futureLength,
            id: newId,
            Data: currentDate,
          }));
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Converte data.Status para o formato de array
    if (typeof data.Status === "string") {
      data.Status = data.Status.split(",");
    }
    handleSubmit(data, id);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form action="" onSubmit={onSubmit}>
      <StyledLegend>Livro de atendimento</StyledLegend>
      <Input
        label="NIS/CPF:"
        name="NIS_CPF"
        placeholder="NIS ou CPF - Exemplo: 123.456.789.00..."
        required
        value={data.NIS_CPF}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Nome:"
        name="Nome"
        placeholder="Exemplo: Davi Souza de Oliveira..."
        required
        onChange={handleChange}
        value={data.Nome}
        type="text"
      />
      <Input
        name="Endereço"
        label="Endereço:"
        placeholder="Exemplo: Rua Padre Cícero, S/N, Centro..."
        required
        onChange={handleChange}
        value={data.Endereço}
        type="text"
      />

      <Dropdown
        label="Ação:"
        name="Ação"
        required
        onChange={handleChange}
        value={data.Ação}
      >
        <StyledOption key="Selecione uma ação" disabled selected value="">
          Selecione uma ação
        </StyledOption>
        {Ações.map((ação) => (
          <StyledOption key={ação} value={ação}>
            {ação}
          </StyledOption>
        ))}
      </Dropdown>

      <Input
        label="Data:"
        required
        type="date"
        readOnly
        value={currentDate}
        note={dataMsg}
      />

      <Dropdown
        label="Prioridade:"
        name="Prioridade"
        required
        onChange={handleChange}
        value={data.Prioridade}
      >
        <StyledOption
          key="Selecione um nível de prioridade"
          disabled
          selected
          value=""
        >
          Selecione um nível de prioridade
        </StyledOption>
        {Prioridades.map((prioridade) => (
          <StyledOption value={prioridade} key={prioridade}>
            {prioridade}
          </StyledOption>
        ))}
      </Dropdown>

      <Dropdown
        label="Status:"
        name="Status"
        required
        onChange={handleChange}
        value={data.Status}
      >
        <StyledOption key="Selecione um estado" disabled selected value="">
          Selecione um estado
        </StyledOption>
        {Status.map((item, index) => {
          const key = Object.keys(item)[0]; // Obtém a chave como "stts_0", "stts_1", etc.
          const [status, color] = item[key]; // Destrutura o array dentro do objeto

          const status_color = item[key];

          return (
            <StyledOption value={status_color} key={index}>
              {status}
            </StyledOption>
          );
        })}
      </Dropdown>

      <SubmitButton type="submit">
        {id ? "Editar ficha" : "Criar ficha"}
      </SubmitButton>
    </form>
  );
}
