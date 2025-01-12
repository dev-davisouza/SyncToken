import styled from "styled-components";

export const MainList = styled.table`
  display: table;
  line-height: 1.7;
  border-spacing: 2px;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

export const HeaderList = styled.thead`
  box-sizing: border-box;
  display: table-header-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;

  @media (max-width: 768px) {
    display: none; /* Esconde o cabeçalho em telas menores */
  }
`;

export const Tr = styled.tr`
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0 20px 0;
  }
`;

export const StatusActionContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const InfoPessoaContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const CPFNISValue = styled.span`
  cursor: pointer;
  display: inline-block;
  transition: all 0.1s ease-in-out;

  &:hover {
    color: #007bff;
    transform: scale(1.02);
  }
`;

export const BenefitControllerContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

export const AddPersonButton = styled.div`
  font-size: 35px;
  @keyframes moveUpDown {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(0);
    }
  }

  animation: moveUpDown 1.8s infinite;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 55px;
  }
`;

// Modal Responsivo
export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;

  @media (max-width: 768px) {
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ModalBody = styled.div`
  padding: 16px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #ddd;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;
