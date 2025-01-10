import { styled } from "styled-components";
import { FaSearch } from "react-icons/fa";

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin-left: auto;

  @media (max-width: 768px) {
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    margin: 0 auto;
  }
`;

export const StyledInputText = styled.input`
  height: 40px;
  padding: 12px 50px 12px 16px;
  border-radius: 10px;
  border: 2px solid #d9d9d9;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
  color: black;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    height: 48px;
    padding: 10px 40px 10px 14px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    height: 40px;
    padding: 8px 35px 8px 12px;
  }
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 16px;
  width: 22px;
  height: 22px;
  opacity: 50%;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 100%;
  }

  @media (max-width: 768px) {
    right: 14px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 480px) {
    right: 12px;
    width: 22px;
    height: 22px;
  }
`;
