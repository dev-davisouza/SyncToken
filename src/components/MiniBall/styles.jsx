import styled from "styled-components";

export const dynamicTagReceiver = (tag) => {
  return styled(tag)`
    ${tag === "button" &&
    `
    all: unset; 
    cursor: pointer;     
    `}

    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.$color};

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

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledP = styled.p`
  margin-bottom: -2px;
`;

export const StyledH2 = styled.h2`
  margin-bottom: 4px;
`;
