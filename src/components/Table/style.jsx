import styled, { keyframes } from "styled-components";

// Animação de subir (de baixo para cima)
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animação de descer (de cima para baixo)
export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledTable = styled.table`
  font-size: 16px;
  width: 100%;
  margin: auto;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: none; /* Oculta a tabela em telas pequenas */
  }
`;

export const Tr = styled.tr`
  border: none;
  transition: all 50ms ease-in-out;
  &:hover {
    background-color: #ccc;
  }
  &:hover .ActionContainer {
    opacity: 100%;
  }

  &.person-selected {
    background-color: #ccc;
  }

  /* Animação para suavizar a transição dos itens da tabela condiconalmente */

  animation: ${(props) => (props.direction === "up" ? fadeInUp : fadeInDown)}
    ${(props) => (props.direction === "up" ? "0.5s" : "0.5s")} ease;
`;

export const Th = styled.th`
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 16px;
`;

export const Td = styled.td`
  border: none;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  color: ${(props) => props.$color || "inherit"};
`;

export const StyledCaption = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin: 25px auto;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const StyledFlexContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  gap: 12px;
  overflow-x: auto;

  @media (max-width: 768px) {
    display: block; /* Exibe os cards em telas pequenas */
  }
`;

export const Card = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  width: 80%;

  @media (min-width: 769px) {
    display: none; /* Oculta o card em telas grandes */
  }
`;

export const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  font-weight: bold;
  gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.035);
`;

export const CardNumber = styled.h2`
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  text-align: center;
`;

export const CardValue = styled.div`
  margin-left: 8px;
  font-weight: 500;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  opacity: ${(props) => props.$opacity || 0.5};
  @media (max-width: 768px) {
    gap: 30px;
  }
`;

export const ActionButton = styled.button`
  all: unset;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #007bff;
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
