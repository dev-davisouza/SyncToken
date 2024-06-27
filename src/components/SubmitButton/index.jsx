import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  background-color: #6278f2;
  border: none;
  padding: 12px 32px;
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
`;

export default function SubmitButton({ type = "submit", children, onClick }) {
  return (
    <StyledButton onClick={() => onClick} type={type}>
      {children}
    </StyledButton>
  );
}
