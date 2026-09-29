// src/pages/Benefits/components/List.tsx

import { useEffect, useState } from "react";
import {
  BenefitControllerContainer,
  HeaderList,
  MainList,
  StatusActionContainer,
  AddPersonButton,
  Tr,
} from "./style";
import TrPessoa from "./TrPessoa";
import Modal from "./Modal";
import useFetchContext from "@/hooks/useFetchContext";
import { IoMdAdd } from "react-icons/io";
import { IFicha } from "@/interfaces/recordTypes";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import useModalTriggerContext from "@/hooks/useModalTriggerContext";
import useSocketContext from "@/hooks/useSocketContext";
import useHandleModalActions from "../hooks/useHandleModalActions";
import Loading from "@/components/Loader";

export default function List() {
  // Loading state
  const [loading, setLoading] = useState(true);

  // Estados globais
  const { fetchPessoas } = useFetchContext();
  const { perPage } = usePaginatorContext();
  const { modalTrigger } = useModalTriggerContext();
  const { trigger } = useSocketContext();

  // Estado local da lista de pessoas
  const [listPessoas, setListPessoas] = useState<IFicha[]>([]);

  // Modal
  const { handleOpenModal, isModalOpen, handleCloseModal, handleSave } =
    useHandleModalActions();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPessoas("isUnderInvestigation=1", perPage);
      if (response) {
        setListPessoas(response.results);
      }
      setLoading(false);
    }
    fetchData();
  }, [perPage, fetchPessoas, modalTrigger, trigger]);

  if (loading) {
    return (
      <BenefitControllerContainer>
        <Loading />
      </BenefitControllerContainer>
    );
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
