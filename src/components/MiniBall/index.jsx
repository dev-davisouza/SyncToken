import { statusColors } from "@/context/Model";
import { reducerColor } from "@/reducers/reducerSttsColor";
import {
  dynamicTagReceiver,
  LegendContainer,
  StyledP,
  StyledH2,
} from "./styles";
import { useEffect } from "react";

const BallSpan = dynamicTagReceiver("span");
const BallButton = dynamicTagReceiver("button");

export default function MiniBall({ color, title }) {
  return <BallSpan title={title} $color={color}></BallSpan>;
}

export function MiniBallButton({ color, title, onClick, type = "button" }) {
  return (
    <BallButton
      type={type}
      onClick={onClick}
      title={title}
      $color={color}
    ></BallButton>
  );
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
