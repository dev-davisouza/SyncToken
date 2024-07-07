import styled from "styled-components";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import { Links } from "@/context/Links";
import { FaBookBookmark, FaPeopleGroup, FaBuffer } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Header = styled.header`
  padding: 25px;
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
`;

const StyledList = styled.ul`
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

const DropdownMenu = styled.div`
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
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Header>
      <StyledNav>
        <StyledList>
          <NavItem icon={FaPeopleGroup}>
            <Link to={Links.HOME}>Fila</Link>
          </NavItem>

          <NavItem icon={FaBookBookmark}>
            <Link to={Links.CRIAR_FICHA}>Livro de atendimento</Link>
          </NavItem>

          <NavItem icon={FaBuffer}>
            <Link to={Links.RELATORIOS}>Relatórios</Link>
          </NavItem>

          <NavItem icon={BsFillPeopleFill}>
            <Link to={Links.ALL_PESSOAS}>Pessoas registradas</Link>
          </NavItem>
        </StyledList>
        <MenuButton onClick={toggleMenu}>
          <FaBars />
        </MenuButton>
        <DropdownMenu isOpen={menuOpen}>
          <NavItem icon={FaPeopleGroup}>
            <Link to={Links.HOME} onClick={toggleMenu}>
              Fila
            </Link>
          </NavItem>
          <NavItem icon={FaBookBookmark}>
            <Link to={Links.CRIAR_FICHA} onClick={toggleMenu}>
              Livro de atendimento
            </Link>
          </NavItem>
          <NavItem icon={FaBuffer}>
            <Link to={Links.RELATORIOS} onClick={toggleMenu}>
              Relatórios
            </Link>
          </NavItem>
          <NavItem icon={BsFillPeopleFill}>
            <Link to={Links.ALL_PESSOAS} onClick={toggleMenu}>
              Pessoas registradas
            </Link>
          </NavItem>
        </DropdownMenu>
      </StyledNav>
    </Header>
  );
};

export default Sidebar;
