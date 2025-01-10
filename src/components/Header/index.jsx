import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
import { Links } from "@/context/Links";
import {
  FaBookBookmark,
  FaPeopleGroup,
  FaBuffer,
  FaRegMoneyBill1,
} from "react-icons/fa6";
import { FaStickyNote, FaMoneyCheckAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Header,
  StyledList,
  StyledNav,
  DropdownMenu,
  MenuButton,
  NavText,
} from "./style";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const reloadPage = (path) => {
    navigate(path);
  };

  return (
    <Header>
      <StyledNav>
        <StyledList>
          <NavItem to={Links.HOME} icon={FaPeopleGroup}>
            Fila
          </NavItem>

          <NavItem
            onClick={() => reloadPage(Links.CRIAR_FICHA)}
            to={Links.CRIAR_FICHA}
            icon={FaBookBookmark}
          >
            Livro de atendimento
          </NavItem>

          <NavItem to={Links.BENEFITS} icon={FaRegMoneyBill1}>
            Gestão de benefícios
          </NavItem>

          <NavItem to={Links.RELATORIOS} icon={FaBuffer}>
            Relatórios
          </NavItem>

          <NavItem to={Links.ALL_PESSOAS} icon={BsFillPeopleFill}>
            Pessoas registradas
          </NavItem>

          <NavItem to={Links.UPDATES} icon={FaStickyNote}>
            Atualizações
          </NavItem>
        </StyledList>
        <MenuButton onClick={toggleMenu}>
          <FaBars />
        </MenuButton>

        {/* Phone responsive */}
        <DropdownMenu isopen={menuOpen ? menuOpen : undefined}>
          <NavItem icon={FaPeopleGroup} to={Links.HOME} onClick={toggleMenu}>
            Fila
          </NavItem>

          <NavItem
            icon={FaBookBookmark}
            to={Links.CRIAR_FICHA}
            onClick={toggleMenu}
          >
            Livro de atendimento
          </NavItem>

          <NavItem icon={FaBuffer} to={Links.RELATORIOS} onClick={toggleMenu}>
            Relatórios
          </NavItem>

          <NavItem
            icon={BsFillPeopleFill}
            to={Links.ALL_PESSOAS}
            onClick={toggleMenu}
          >
            Pessoas registradas
          </NavItem>

          <NavItem icon={FaStickyNote} to={Links.UPDATES} onClick={toggleMenu}>
            Atualizações
          </NavItem>
        </DropdownMenu>
      </StyledNav>
    </Header>
  );
};

export default Sidebar;

/* 
  TU VAI TER QUE RECONSTRUIR O PROJETO DO ZERO
*/
