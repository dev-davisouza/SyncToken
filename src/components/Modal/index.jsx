import {
  Actions,
  CancelButton,
  CloseButton,
  ConfirmButton,
  ModalContent,
  Overlay,
  StyledDialog,
} from "./style";
import { CgClose } from "react-icons/cg";

export default function Modal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <StyledDialog open={open}>
        <ModalContent>
          <CloseButton onClick={onClose}>
            <CgClose />
          </CloseButton>
          <p>Tem certeza que deseja excluir este registro?</p>
          <Actions>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <ConfirmButton onClick={onConfirm}>Excluir</ConfirmButton>
          </Actions>
        </ModalContent>
      </StyledDialog>
    </>
  );
}
