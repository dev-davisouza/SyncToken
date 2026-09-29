import usePeopleSelectorContext from "@/hooks/usePeopleSelectorContext";
import handleInvestigation from "../handlers/handleInvestigation";
import { useState } from "react";
import { IFicha } from "@/interfaces/recordTypes";
import useModalTriggerContext from "@/hooks/useModalTriggerContext";

export default function useHandleModalActions() {
  // Modal
  const { selectedPeople, setSelectedPeople } = usePeopleSelectorContext();
  const { activateModalTrigger } = useModalTriggerContext();

  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [selectedPessoa, setSelectedPessoa] = useState<IFicha | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPeople([]);
  };

  const handleSave = async () => {
    if (selectedPeople) {
      await handleInvestigation(selectedPeople, true);
      handleCloseModal();
    } else {
      handleCloseModal();
    }
  };

  const handleEncerrar = (pessoa: IFicha) => {
    setSelectedPessoa(pessoa); // Define a pessoa no estado local
    activateModalTrigger(); // Abre o modal
  };

  const handleConfirmEncerrar = async () => {
    if (selectedPessoa) {
      await handleInvestigation([selectedPessoa.NIS_CPF], false);
    }
    activateModalTrigger(); // Fecha o modal
  };

  return {
    handleOpenModal,
    handleCloseModal,
    handleSave,
    isModalOpen,
    handleEncerrar,
    handleConfirmEncerrar,
    selectedPessoa,
  };
}
