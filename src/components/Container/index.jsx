import styled from "styled-components";

const StyledDiv = styled.div`
  width: 99%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px auto;
`;

const StyledSection = styled.section`
  width: 90%;
  height: auto;
  padding: 40px;
  margin: auto;
  max-width: 100%;
  background-color: #f5f5f5;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export default function Container(props) {
  return (
    <StyledDiv>
      <StyledSection>{props.children}</StyledSection>
    </StyledDiv>
  );
}
