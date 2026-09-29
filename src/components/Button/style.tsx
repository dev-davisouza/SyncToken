// src/components/Button/style.tsx
import styled from "styled-components";

interface IStyledButtonProps {
  $padding?: string;
}

export const StyledButton = styled.button<IStyledButtonProps>`
  cursor: pointer;
  background-color: #6278f2;
  border: none;
  padding: ${({ $padding }) => $padding || "12px 32px"};
  border-radius: 4px;
  color: white;
  &:hover {
    color: #95ffd4;
  }
  font-weight: 500;
  font-size: 18px;
  transition: all 0.2s ease-out;
  display: block;
  width: 100%;
  margin-top: 25px;

  @media (max-width: 768px) {
    margin-top: 20px;
    font-size: 16px;
    padding: 10px 16px;
  }

  @media (max-width: 480px) {
    margin-top: 16px;
    font-size: 14px;
    padding: 8px 16px;
  }
`;
