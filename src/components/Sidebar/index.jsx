import styled from "styled-components";
import NavItem from "./NavItem";
import { FaBookBookmark, FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Links } from "@/context/Links";

const Aside = styled.aside`
  padding: 25px;
  background-color: #f2f2f2;
  width: 20%;
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: fit-content;
`;

const Sidebar = () => {
  return (
    <Aside>
      <nav>
        <StyledList>
          <NavItem icon={FaPeopleGroup}>
            <Link to={Links.HOME}>Fila</Link>
          </NavItem>

          <NavItem icon={FaBookBookmark}>
            <Link to={Links.CRIAR_FICHA}>Livro de atendimento</Link>
          </NavItem>
        </StyledList>
      </nav>
    </Aside>
  );
};

export default Sidebar;
