import { fadeInDown, fadeInUp } from "@/components/Table/style";
import styled from "styled-components";

export const RelatoriesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const RelatoryCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  width: max-content;
  /* Adicionando animação baseada na direction */
  animation: ${(props) => (props.direction === "up" ? fadeInUp : fadeInDown)} 1s
    ease;
`;

export const RelatoryCardNumber = styled.h2`
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  text-align: center;
`;

export const RelatoryCardItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.035);
`;

export const RelatoryCardValue = styled.div`
  margin-left: 8px;
  font-weight: 500;
`;
