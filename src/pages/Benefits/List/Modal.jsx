import People from "@/pages/People";
import { ModalContainer, ModalHeader, ModalBody, ModalFooter } from "./style";
import Button from "@/components/Button";

export default function Modal({ isOpen, onClose, onSave }) {
  return isOpen ? (
    <>
      <ModalContainer>
        <ModalHeader>
          <h2>Adicionar pessoa</h2>
          <span style={{ marginBottom: "20px" }}>
            <Button onClick={onClose}>Fechar</Button>
          </span>
        </ModalHeader>
        <ModalBody>
          <People isForSelection={true} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => onSave()}>Salvar</Button>
        </ModalFooter>
      </ModalContainer>
    </>
  ) : null;
}
