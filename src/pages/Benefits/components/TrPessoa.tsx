// src/pages/Benefits/components/TrPessoa.tsx

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaLocationDot } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ActionButton, ActionContainer } from "@/components/Table/style";
import { Links } from "@/context/Links";
import { useNavigate } from "react-router-dom";
import handleIcon from "@/pages/Benefits/handlers/handleIcon";
import useModalTriggerContext from "@/hooks/useModalTriggerContext";
import GenericModal from "@/components/Modal";
import { IFicha } from "@/interfaces/recordTypes";
import {
  CPFNISValue,
  InfoPessoaContainer,
  InfoPessoaEndereco,
  InfoPessoaIcon,
  InfoPessoaNISCPF,
  InfoPessoaNome,
  StatusActionContainer,
  Tr,
} from "./style";
import useBenefitSituation from "../hooks/useBenefitSituation";
import { useEffect, useState } from "react";
import useHandleModalActions from "../hooks/useHandleModalActions";

/**
 * TrPessoa provavelmente será usada para renderizar
 * cada representação dos beneficiários que constam
 * em averiguação.
 */
export default function TrPessoa({ pessoa }: { pessoa: IFicha }) {
  const navigate = useNavigate();
  const { activateModalTrigger, modalTrigger } = useModalTriggerContext();
  const { handleEncerrar, selectedPessoa, handleConfirmEncerrar } =
    useHandleModalActions();

  // Estados para manipulação interna de interações do usuário
  const [nome, setNome] = useState(pessoa.Nome);
  const [url, setUrl] = useState<string>("");

  // Settando o ícone
  useEffect(() => {
    handleIcon(nome).then((path) => {
      setUrl(path); // Atualiza a URL no estado
    });
  }, []);

  return (
    <>
      <Tr>
        <InfoPessoaContainer>
          {/*  Ícone da Pessoa */}
          <InfoPessoaIcon
            onClick={() => navigate(`${Links.CRIAR_FICHA}/${pessoa.NIS_CPF}`)}
          >
            <img src={url} alt="Icon" />
          </InfoPessoaIcon>
          {/* Simples td */}
          <td>
            {/* Informações de Nome e estilização */}
            <InfoPessoaNome
              onClick={() => navigate(`${Links.CRIAR_FICHA}/${pessoa.NIS_CPF}`)}
            >
              {nome}
            </InfoPessoaNome>
            {/* // Informações endereço */}
            <InfoPessoaEndereco>
              <FaLocationDot size={12} /> {pessoa.Endereço}
            </InfoPessoaEndereco>
            {/* // Informações de NIS ou CPF */}
            <InfoPessoaNISCPF>
              <MdPermIdentity size={16} />
              <span>
                <b>CPF/NIS</b>:
                <CPFNISValue
                  title="Acesso ao formulário da pessoa"
                  onClick={() =>
                    navigate(`${Links.CRIAR_FICHA}/${pessoa.NIS_CPF}`)
                  }
                >
                  &nbsp;{pessoa.NIS_CPF}
                </CPFNISValue>
              </span>
            </InfoPessoaNISCPF>
          </td>
        </InfoPessoaContainer>
        {/* // Contâiners de ações */}
        <StatusActionContainer>
          <td style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {useBenefitSituation(pessoa.benefit_situation)} {/*  Status */}
          </td>
          <td>
            <ActionContainer // Buttons
              style={{ padding: "0 20px" }}
              className="ActionContainer"
            >
              <ActionButton
                className="editar" //Editar
                onClick={() =>
                  navigate(`${Links.CRIAR_FICHA}/${pessoa.NIS_CPF}`)
                }
              >
                <FaPencilAlt />
              </ActionButton>
              <ActionButton
                className="encerrar" // Encerrar
                onClick={() => handleEncerrar(pessoa)}
              >
                <IoIosCheckmarkCircle size={18} />
              </ActionButton>
            </ActionContainer>
          </td>
        </StatusActionContainer>
      </Tr>

      {modalTrigger && selectedPessoa && (
        <GenericModal
          open={modalTrigger}
          bodyContent={`Tem certeza que deseja encerrar a averiguação de <b>${selectedPessoa?.Nome}</b>?`}
          onClose={activateModalTrigger}
          textButton="Encerrar"
          onConfirm={handleConfirmEncerrar}
          $buttonColor="#007bff"
          html
        />
      )}
    </>
  );
}
