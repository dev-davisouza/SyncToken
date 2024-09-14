import styled from "styled-components";

export const MessageContent = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border: 1px solid #000;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 5px;

  ${(props) => {
    if (props.$type === "success") {
      return `color: #155724;
      background-color: #D4EDDA;
      border-color: #c3e6cb;`;
    }
    if (props.$type === "error") {
      return `color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;`;
    }
    if (props.$type === "info") {
      return `color: #3D5564;
        background-color: #CFE2FF;
        border-color: #CFE2FF;
        border-left-width: 8px;
        border-left-color: #9EEAF9;
        `;
    }
  }}
`;

export const BolderMsg = styled.p`
  font-weight: 500;
  font-size: 18px;
`;
