import styled from "styled-components";

export const dynamicDateReceiver = (tag) => {
  return styled(tag)`
    margin: 24px 0;
    background-color: white;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.06);
    width: 100%;
    border: none;
    font-size: 24px;
    padding: 12px;
    box-sizing: border-box;

    @media (max-width: 768px) {
      margin: 18px 0;
      font-size: 18px;
      padding: 10px;
    }

    @media (max-width: 480px) {
      margin: 12px 0;
      font-size: 16px;
      padding: 8px;
    }
  `;
};

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 4px;
  }
`;

export const Note = styled.small`
  display: block;
  font-size: 12px;
  margin: -12px 0 30px 24px;
  color: red;

  @media (max-width: 768px) {
    font-size: 9px;
    margin: -8px 0 24px 16px;
  }
`;

export const StyledFlexContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
