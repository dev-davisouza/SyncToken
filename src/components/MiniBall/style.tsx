// src/components/MiniBall/style.tsx

import styled from "styled-components";

// eslint-disable-next-line react-refresh/only-export-components
export const dynamicTagReceiver = (tag: keyof React.JSX.IntrinsicElements) => {
  return styled(tag as keyof JSX.IntrinsicElements)<{ $color: string }>`
    ${tag === "button" &&
    `
    all: unset; 
    cursor: pointer;     
    `}

    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};

    @media (max-width: 768px) {
      height: 12px;
      width: 12px;
    }

    @media (max-width: 480px) {
      height: 12px;
      width: 12px;
    }
  `;
};

export const ColorCaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledP = styled.p`
  margin-bottom: -2px;
`;

export const StyledH2 = styled.h2`
  margin-bottom: 4px;
`;
