import {
  BenefitControllerContainer,
  CPFNISValue,
  HeaderList,
  InfoPessoaContainer,
  MainList,
  StatusActionContainer,
  AddPersonButton,
  Tr,
} from "./style";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loader";
import { FaLocationDot } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";
import { IoIosCheckmarkCircle, IoMdAdd } from "react-icons/io";
import { ActionButton, ActionContainer } from "../../../components/Table/style";
import { apiPath, Links } from "@/context/Links";
import { useNavigate } from "react-router-dom";
import handleIcon from "./handleIcon";
import reducerBenefitSituation from "@/reducers/reducerBenefitSituation";
import Modal from "./Modal";
import usePeopleSelectorContext from "@/hooks/usePeopleSelectorContext";
import useFichaContext from "@/hooks/useFichaContext";
import handleInvestigation from "./handleInvestigation";
import useModalTriggerContext from "@/hooks/useModalTriggerContext";
import GenericModal from "@/components/Modal";
import useTriggerContext from "@/hooks/useTriggerContext";
import useMessageContext from "@/hooks/useMessageContext";
import useAuthContext from "@/hooks/useAuthContext";

function TrPessoa({ pessoa }) {
  const { access, userName } = useAuthContext();
  const { activateTrigger } = useTriggerContext();
  const { activateModalTrigger, modalTrigger } = useModalTriggerContext();
  const { setMessageContent, setTypeMessage } = useMessageContext();
  const navigate = useNavigate();

  const [nome, setNome] = useState(pessoa.Nome);
  const [url, setUrl] = useState(null);
  const [selectedPessoa, setSelectedPessoa] = useState(null); // Estado para pessoa selecionada

  useEffect(() => {
    handleIcon(nome, access).then((path) => {
      setUrl(path); // Atualiza a URL no estado
    });
  }, []);

  const handleEncerrar = () => {
    setSelectedPessoa(pessoa); // Define a pessoa no estado local
    activateModalTrigger(); // Abre o modal
  };

  const handleConfirmEncerrar = async () => {
    if (selectedPessoa) {
      const success = await handleInvestigation(
        [selectedPessoa.NIS_CPF],
        false,
        access
      );

      if (success) {
        activateTrigger();
        setTypeMessage("success");
        setMessageContent(
          `Averiguação de <b>${selectedPessoa.Nome}</b> concluída com sucesso!`
        );
      }
    }
    activateModalTrigger(); // Fecha o modal
  };

  return (
    <>
      <Tr>
        <InfoPessoaContainer>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`${Links.CRIAR_FICHA}/${pessoa.NIS_CPF}`)}
          >
            <img src={url} alt="Icon" style={{ borderRadius: "50%" }} />
          </div>
          <td>
            <div
              onClick={() => navigate(`${Links.CRIAR_FICHA}/${pessoa.NIS_CPF}`)}
              style={{
                color: "#007bff",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              {nome}
            </div>
            <div style={{ color: "#969696", fontSize: "13px" }}>
              <FaLocationDot size={12} /> {pessoa.Endereço}
            </div>
            <div
              style={{
                color: "#969696",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
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
            </div>
          </td>
        </InfoPessoaContainer>

        <StatusActionContainer>
          <td style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {reducerBenefitSituation(pessoa.benefit_situation)} {/*  Status */}
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
                onClick={handleEncerrar}
              >
                <IoIosCheckmarkCircle size={18} />
              </ActionButton>
            </ActionContainer>
          </td>
        </StatusActionContainer>
      </Tr>

      {modalTrigger && selectedPessoa && userName && (
        <GenericModal
          open={modalTrigger}
          bodyContent={`<b>${userName}</b>, Tem certeza que deseja encerrar a averiguação de <b>${selectedPessoa?.Nome}</b>?`}
          onClose={activateModalTrigger}
          textButton="Encerrar"
          onConfirm={handleConfirmEncerrar}
          buttonColor="#007bff"
          html
        />
      )}
    </>
  );
}

export default function List() {
  const { access } = useAuthContext();
  const { setMessageContent, setTypeMessage } = useMessageContext();
  const { updatedTrigger, activateTrigger } = useTriggerContext();
  const { fetchAllPessoas, loading } = useFichaContext();
  // Estado local da lista de pessoas
  const [listPessoas, setListPessoas] = useState([]);
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const { setSelectedPeople, selectedPeople } = usePeopleSelectorContext();

  useEffect(() => {
    async function fetchData() {
      const [gentes, count] = await fetchAllPessoas("isUnderInvestigation=1");
      setListPessoas(gentes);
    }
    fetchData();
  }, [updatedTrigger]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPeople([]);
  };

  const handleSave = async () => {
    if (selectedPeople) {
      const success = await handleInvestigation(selectedPeople, true, access);
      if (success) {
        activateTrigger();
        setTypeMessage("success");
        setMessageContent(
          "Pessoa adicionada a lista de averiguação com sucesso!"
        );
      }
      handleCloseModal();
    } else {
      handleCloseModal();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BenefitControllerContainer>
        {/* Adicionando pessoas a lista */}
        <AddPersonButton onClick={handleOpenModal}>
          <IoMdAdd
            style={{
              fontSize: "inherit",
            }}
          />
        </AddPersonButton>
      </BenefitControllerContainer>

      {listPessoas.length == 0 ? (
        <h2>Ainda não há pessoas em averiguação!</h2>
      ) : (
        <MainList>
          <HeaderList>
            <Tr>
              <div>
                <th>Nome do responsável familiar</th>
              </div>
              <StatusActionContainer>
                <th>Status</th>
                <th>Ações</th>
              </StatusActionContainer>
            </Tr>
          </HeaderList>
          <tbody>
            {listPessoas.map((pessoa) => (
              <TrPessoa key={pessoa.NIS_CPF} pessoa={pessoa} />
            ))}
          </tbody>
        </MainList>
      )}
      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
