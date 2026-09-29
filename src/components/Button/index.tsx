// src/components/Button/index.tsx

import { StyledButton } from "./style";
import { IButtonProps } from "./type";

export default function Button({
  type,
  children,
  onClick,
  $padding,
}: IButtonProps) {
  return (
    <StyledButton onClick={onClick} $padding={$padding} type={type}>
      {children ? children : type}
    </StyledButton>
  );
}
