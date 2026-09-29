// src/components/Modal/index.tsx

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
import { ModalProps } from "./type";

/**
 * Componente de Modal reutilizável
 *
 * @param {boolean} open - Define se o modal está visível.
 * @param {() => void} onClose - Função chamada ao fechar o modal.
 * @param {() => void} onConfirm - Função chamada ao confirmar a ação.
 * @param {string | ReactNode} bodyContent - Conteúdo do corpo do modal (texto ou JSX).
 * @param {string} textButton - Texto do botão de confirmação.
 * @param {string} [$buttonColor="#d9534f"] - Cor personalizada do botão de confirmação.
 * @param {boolean} [html=false] - Se `true`, interpreta `bodyContent` como HTML.
 */
export default function Modal({
  open,
  onClose,
  onConfirm,
  bodyContent,
  textButton,
  $buttonColor = "#d9534f",
  html = false,
}: ModalProps) {
  if (!open) return null;

  return (
    <>
      <Overlay className={open ? "open" : ""} onClick={onClose} />
      <StyledDialog className={open ? "open" : ""} open={open}>
        <ModalContent>
          <CloseButton onClick={onClose}>
            <CgClose />
          </CloseButton>
          {html ? (
            <BodyContent
              dangerouslySetInnerHTML={{ __html: bodyContent as TrustedHTML }}
            />
          ) : (
            <BodyContent>{bodyContent}</BodyContent>
          )}

          <Actions>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <ConfirmButton $buttonColor={$buttonColor} onClick={onConfirm}>
              {textButton}
            </ConfirmButton>
          </Actions>
        </ModalContent>
      </StyledDialog>
    </>
  );
}
