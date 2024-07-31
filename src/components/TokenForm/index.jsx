import { Input, Dropdown } from "@/components/Field";
import { Links } from "@/context/Links";
import styled from "styled-components";
import SubmitButton from "@/components/SubmitButton";
import Loading from "@/components/Loader";
import { useEffect, useState } from "react";
import { dataMsg } from "@/context/Model";
import { useNavigate, useParams } from "react-router-dom";
import {
  usePrioridades,
  useAcoes,
  useStatusChoices,
  usePessoas,
  useDocTypes,
} from "./getters";
import { ServiceBookModel } from "@/context/Model";
import useNisCpfFormatter from "./NisCpfFormatter"; // Importe o hook

const apiPath = import.meta.env.VITE_API_URL;

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
  /* States */
  const { id } = useParams();
  const [data, setData] = useState({ ServiceBookModel });
  const [removeLoader, setRemoveLoader] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const Prioridades = usePrioridades();
  const Ações = useAcoes();
  const StatusChoices = useStatusChoices();
  const People = usePessoas(id);
  const docTypes = useDocTypes();
  const navigate = useNavigate();

  const { nisCpfType, handleNisCpfInputChange } = useNisCpfFormatter(
    data.DocType
  ); // Hook useNisCpfFormatter

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    setData(People);
  }, [People]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Remove pontos e hífens do campo NIS/CPF
    const cleanData = { ...data, NIS_CPF: data.NIS_CPF.replace(/\D/g, "") };
    handleSubmit(cleanData, id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "NIS_CPF") {
      // Formata e atualiza o valor do campo NIS/CPF
      handleNisCpfInputChange(e, data, setData);
      const cleanValue = value.replace(/\D/g, "");

      if (cleanValue.length === 11) {
        setIsFieldsDisabled(true);
        fetch(`${apiPath}/pessoas-all/${cleanValue}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((resp) => {
            if (resp.ok) {
              navigate(`${Links.CRIAR_FICHA}/${cleanValue}`);
              setRemoveLoader(true);
              setIsFieldsDisabled(false);
            } else {
              navigate(`${Links.CRIAR_FICHA}`);
              setIsFieldsDisabled(false);
            }
          })
          /* .then((data) => {
            if (data.ok) console.log(data);
            setData(data);
            setIsFieldsDisabled(false);
          }) */
          .catch((err) => {
            console.log(err);
            setIsFieldsDisabled(false);
          });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit}>
          <StyledLegend>Livro de atendimento</StyledLegend>
          <Dropdown
            label="Tipo de Documento:"
            name="DocType"
            required
            onChange={handleChange}
            value={data.DocType}
            disabled={isFieldsDisabled}
          >
            <StyledOption
              key="Selecione um tipo de documento"
              selected
              disabled
              value=""
            >
              Selecione um tipo de documento
            </StyledOption>

            {docTypes.map((docType) => (
              <StyledOption value={docType} key={docType}>
                {docType}
              </StyledOption>
            ))}
          </Dropdown>

          <Input
            label="NIS/CPF:"
            name="NIS_CPF"
            placeholder="NIS ou CPF - Exemplo: 123.456.789.00..."
            required
            value={data.NIS_CPF}
            onChange={handleChange}
            type="text"
            disabled={isFieldsDisabled}
          />
          <Input
            label="Nome:"
            name="Nome"
            placeholder="Exemplo: Davi Souza de Oliveira..."
            required
            onChange={handleChange}
            value={data.Nome}
            type="text"
            disabled={isFieldsDisabled}
          />
          <Input
            name="Endereço"
            label="Endereço:"
            placeholder="Exemplo: Rua Emanuel Vinícius, S/N, Centro..."
            required
            onChange={handleChange}
            value={data.Endereço}
            type="text"
            disabled={isFieldsDisabled}
          />

          <Dropdown
            label="Ação:"
            name="Ação"
            required
            onChange={handleChange}
            value={data.Ação}
            disabled={isFieldsDisabled}
          >
            <StyledOption key="Selecione uma ação" disabled selected value="">
              Selecione uma ação
            </StyledOption>
            {Ações.map((ação) =>
              ação === "Gestão de bloqueio/cancelamento" ? (
                <StyledOption key={ação} value={ação}>
                  {ação}
                </StyledOption>
              ) : (
                <StyledOption key={ação} value={ação}>
                  {ação}
                </StyledOption>
              )
            )}
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
            disabled={isFieldsDisabled}
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
            disabled={isFieldsDisabled}
          >
            <StyledOption key="Selecione um estado" disabled selected value="">
              Selecione um estado
            </StyledOption>
            {StatusChoices.map(([value, label]) => (
              <StyledOption value={value} key={value}>
                {label}
              </StyledOption>
            ))}
          </Dropdown>

          <SubmitButton type="submit" disabled={isFieldsDisabled}>
            {id ? "Editar ficha" : "Criar ficha"}
          </SubmitButton>
        </form>
      )}
    </>
  );
}
