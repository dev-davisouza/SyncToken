import {
  Actions,
  BodyContent,
  CancelButton,
  CloseButton,
  ConfirmButton,
  ModalContent,
  Overlay,
  StyledDialog,
} from "./style";
import { CgClose } from "react-icons/cg";

export default function Modal({
  open,
  onClose,
  onConfirm,
  bodyContent,
  textButton,
  buttonColor = "#d9534f",
}) {
  if (!open) return null;

  return (
    <>
      <Overlay className={open ? "open" : ""} onClick={onClose} />
      <StyledDialog className={open ? "open" : ""} open={open}>
        <ModalContent>
          <CloseButton onClick={onClose}>
            <CgClose />
          </CloseButton>
          <BodyContent>{bodyContent}</BodyContent>
          <Actions>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <ConfirmButton $buttonColor={buttonColor} onClick={onConfirm}>
              {textButton}
            </ConfirmButton>
          </Actions>
        </ModalContent>
      </StyledDialog>
    </>
  );
}
