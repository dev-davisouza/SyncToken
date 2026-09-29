// src/context/SocketContext/FlashMessage/style.tsx

import styled from "styled-components";
import { MsgTypes } from "../types";

export const MessageContainer = styled.div`
  position: relative; /* Antes era absolute, o que poderia causar problemas */
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MessageContent = styled.div<{ type: MsgTypes; isFixed: boolean }>`
  position: ${(props) => (props.isFixed ? "fixed" : "absolute")};
  top: ${(props) => (props.isFixed ? "10px" : "2%")}; /* Fixo ao descer */
  z-index: 999;
  top: 2%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  padding: 1rem;
  border: 1px solid #000;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 5px;

  ${(props) => {
    if (props.type === "success") {
      return `color: #155724;
        background-color: #D4EDDA;
        border-color: #c3e6cb;`;
    }
    if (props.type === "error") {
      return `color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;`;
    } else {
      return `color: #3D5564;
        background-color: #CFE2FF;
        border-color: #CFE2FF;
        border-left-width: 8px;
        border-left-color: #9EEAF9;
        `;
    }
  }}
`;
