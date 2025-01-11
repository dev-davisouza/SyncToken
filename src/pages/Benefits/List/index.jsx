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
  const { access } = useAuthContext();
  const { activateModalTrigger, modalTrigger } = useModalTriggerContext();
  const { setMessageContent, setTypeMessage } = useMessageContext();
  const navigate = useNavigate();

  const [nome, setNome] = useState(pessoa.Nome);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    handleIcon(nome, access).then((path) => {
      setUrl(path); // Atualiza a URL no estado
    });
  }, []);

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
                  title="Acesso o formulário da pessoa"
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
                onClick={() => activateModalTrigger()}
              >
                <IoIosCheckmarkCircle size={18} />
              </ActionButton>
            </ActionContainer>
          </td>
        </StatusActionContainer>
      </Tr>

      {
        <GenericModal
          open={modalTrigger}
          bodyContent="Tem certeza que deseja esse caso como resolvido?"
          onClose={activateModalTrigger}
          textButton="Encerrar"
          onConfirm={async () => {
            activateModalTrigger();
            const success = await handleInvestigation(
              [pessoa.NIS_CPF],
              false,
              access
            );
            if (success) {
              setMessageContent("Averiguação da pessoa concluída com sucesso!");
              setTypeMessage("success");
            }
          }}
          buttonColor="#007bff"
        />
      }
    </>
  );
}

export default function List() {
  const { access } = useAuthContext();
  const { setMessageContent, setTypeMessage } = useMessageContext();
  const { updatedTrigger } = useTriggerContext();
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
        setMessageContent(
          "Pessoa adicionada a lista de averiguação com sucesso!"
        );
        setTypeMessage("success");
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
              fontSize: "35px",
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
