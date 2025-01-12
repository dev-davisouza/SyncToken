import styled from "styled-components";

// Styled Components
export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

export const StyledDialog = styled.dialog`
  position: fixed;
  top: 10%;
  border: none;
  //transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  max-width: 80%;

  @media (max-width: 768px) {
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const CancelButton = styled.button`
  background: #ccc;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  background: ${(props) => props.$buttonColor || "#d9534f"};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const BodyContent = styled.div`
  margin: 16px;
`;
