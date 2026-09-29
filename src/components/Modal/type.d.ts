/**
 * Tipagem das props do Modal
 */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bodyContent: string | React.ReactNode;
  textButton: string;
  $buttonColor?: string;
  html?: boolean;
}
