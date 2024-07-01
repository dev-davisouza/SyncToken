import styled from "styled-components";
import { statusColors } from "@/context/Model";
import { reducerColor } from "@/reducer";

const Ball = styled.span`
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

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledP = styled.p`
  margin-bottom: -2px;
`;

const StyledH2 = styled.h2`
  margin-bottom: 4px;
`;

export default function MiniBall({ color, title }) {
  return <Ball title={title} $color={color}></Ball>;
}

export const Legend = () => {
  return (
    <LegendContainer>
      <StyledH2>Legenda:</StyledH2>
      {Object.entries(statusColors).map(([key, color]) => {
        const [status, statusColor] = reducerColor(color);
        return (
          <StyledP key={status}>
            <MiniBall color={statusColor} /> {status}
          </StyledP>
        );
      })}
    </LegendContainer>
  );
};
