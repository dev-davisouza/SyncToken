import styled from "styled-components";
import NavItem from "./NavItem";
import { FaBookBookmark, FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Links } from "@/context/Links";

const Header = styled.header`
  padding: 25px;
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  height: fit-content;
  box-sizing: border-box;
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
`;

const Sidebar = () => {
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
        </StyledList>
      </StyledNav>
    </Header>
  );
};

export default Sidebar;
