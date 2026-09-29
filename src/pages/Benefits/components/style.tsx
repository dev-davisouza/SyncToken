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

export const InfoPessoaIcon = styled.div`
  cursor: pointer;
  img {
    border-radius: 50%;
  }
`;

export const InfoPessoaNome = styled.div`
  color: #007bff;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const InfoPessoaEndereco = styled.div`
  color: #969696;
  font-size: 13px;
`;

export const InfoPessoaNISCPF = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #969696;
  font-size: 13px;
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

/* ============================================================
 *  Seleção (modo "adicionar pessoas à averiguação")
 * ============================================================ */

export const SelectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  margin-bottom: 12px;
  background: #f0f3ff;
  border: 1px solid #d8deff;
  border-radius: 8px;
  position: sticky;
  top: 0;
  z-index: 5;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const SelectionCounter = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #3b4cca;

  b {
    font-size: 16px;
  }
`;

export const SelectAllLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  user-select: none;
`;

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  accent-color: #6278f2;
  cursor: pointer;
`;

export const EmptySelection = styled.p`
  text-align: center;
  color: #888;
  padding: 24px 0;
  font-size: 14px;
`;
