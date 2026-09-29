// src/pages/Benefits/components/Modal.tsx

import People from "@/pages/People";
import { ModalContainer, ModalHeader, ModalBody, ModalFooter } from "./style";
import Button from "@/components/Button";
import usePeopleSelectorContext from "@/hooks/usePeopleSelectorContext";
import HandlePeopleQuery from "../handlers/handlePeopleQuery";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function Modal({ isOpen, onClose, onSave }: ModalProps) {
  const { selectedPeople, setSelectedPeople } = usePeopleSelectorContext();

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalHeader>
        <h2>Adicionar pessoa</h2>
        <span style={{ marginBottom: "20px" }}>
          <Button type="button" onClick={onClose}>
            Fechar
          </Button>
        </span>
      </ModalHeader>

      <ModalBody>
        <People
          isForSelection={true}
          handleQuery={HandlePeopleQuery}
          /* passa a seleção atual para o Table desenhar o checkbox do topo */
          selectedCount={selectedPeople.length}
          onClearSelection={() => setSelectedPeople([])}
        />
      </ModalBody>

      <ModalFooter>
        <Button type="button" onClick={() => onSave()}>
          {selectedPeople.length > 0
            ? `Salvar (${selectedPeople.length})`
            : "Salvar"}
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
}
