// src/pages/Queue/useQueueActions.ts

import { useState } from "react";
import useFetchContext from "@/hooks/useFetchContext";
import getNextStatus from "@/constants/getNextStatus";

export function useQueueActions() {
  const { fetchPessoa, editFicha, deletePessoa } = useFetchContext();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [optimisticStatuses, setOptimisticStatuses] = useState<
    Record<string, string>
  >({});

  const handleOpenModal = (NIS_CPF: string) => {
    setSelectedRecord(NIS_CPF);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecord(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRecord) return;
    await deletePessoa(selectedRecord);
    handleCloseModal();
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const nextStatus = getNextStatus(currentStatus);
    setOptimisticStatuses((prev) => ({ ...prev, [id]: nextStatus }));

    try {
      const ficha = await fetchPessoa(id);
      if (ficha) {
        await editFicha(id, { Status: nextStatus });
      }
    } catch (error) {
      console.error(error);
      setOptimisticStatuses((prev) => ({ ...prev, [id]: currentStatus }));
    }
  };

  return {
    isModalOpen,
    selectedRecord,
    optimisticStatuses,
    handleOpenModal,
    handleCloseModal,
    handleConfirmDelete,
    handleStatusUpdate,
  };
}

export type QueueActions = ReturnType<typeof useQueueActions>;
