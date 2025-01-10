import styled from "styled-components";

export const Header = styled.header`
  padding: 25px;
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  width: 100%;
`;

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DropdownMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 50px;
  position: absolute;
  top: 50px;
  left: 20px;
  background-color: #f2f2f2;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    display: ${(props) => (props.isopen ? "flex" : "none")};
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const NavText = styled.span``;

export const StyledNavItem = styled.li`
  font-size: 20px;
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  position: relative;
  padding-bottom: 4px;

  &.active {
    border-bottom: 2px solid black; /* Destaque para o item ativo */
  }

  &:hover {
    color: gray; /* Exemplo de mudança ao passar o mouse */
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
