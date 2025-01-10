import styled from "styled-components";

export const MainList = styled.table`
  display: table;
  line-height: 1.7;
  border-spacing: 2px;
  border-collapse: collapse;
  width: 100%;
`;

export const HeaderList = styled.thead`
  box-sizing: border-box;
  display: table-header-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
`;

export const Tr = styled.tr`
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
`;

export const StatusActionContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-evenly;
`;

export const InfoPessoaContainer = styled.div`
  display: flex;
  gap: 1rem;
  //flex-direction: column;
`;

export const CPFNISValue = styled.span`
  cursor: pointer;
  display: inline-block;
  transition: all 0.1s ease-in-out; /* Transição para suavizar o efeito */

  &:hover {
    color: #007bff;
    transform: scale(1.02); /* Aumenta ligeiramente ao passar o mouse */
  }
`;

export const BenefitControllerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const AddPersonButton = styled.div`
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

  //border-radius: 50%; // Adiciona um efeito de círculo (opcional)
  //padding: 8px; // Espaçamento interno para destacar a sombra
  //backgroundColor: white; // Fundo branco para destacar o ícone
  animation: moveUpDown 1.8s infinite; // Define a animação
  cursor: pointer;
`;

// Modal

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  width: 80%;
  max-height: 80%;
  overflow-y: scroll;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

export const ModalBody = styled.div`
  padding: 16px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #ddd;
`;
