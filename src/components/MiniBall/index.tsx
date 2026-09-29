// src/components/MiniBall/index.tsx

import { reducerColor, statusColors } from "@/hooks/useSttsColor";
import {
  dynamicTagReceiver,
  ColorCaptionContainer,
  StyledP,
  StyledH2,
} from "./style";

const BallSpan = dynamicTagReceiver("span");
const BallButton = dynamicTagReceiver("button");

interface MiniBallProps {
  $color: string;
  title: string;
}

interface MiniBallButtonProps extends MiniBallProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function MiniBall({ $color, title }: MiniBallProps) {
  return <BallSpan title={title} $color={$color}></BallSpan>;
}

export function MiniBallButton({
  $color,
  title,
  onClick,
  type = "button",
}: MiniBallButtonProps) {
  return (
    <BallButton type={type} onClick={onClick} title={title} $color={$color} />
  );
}

export const ColorCaption = () => {
  return (
    <ColorCaptionContainer>
      <StyledH2>Legenda:</StyledH2>
      {Object.values(statusColors).map((color) => {
        const [status, statusColor] = reducerColor(color);
        return (
          <StyledP key={status}>
            <MiniBall title={status as string} $color={statusColor as string} />
            {status}
          </StyledP>
        );
      })}
    </ColorCaptionContainer>
  );
};
