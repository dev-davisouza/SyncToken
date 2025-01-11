import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
import { Links } from "@/context/Links";
import {
  FaBookBookmark,
  FaPeopleGroup,
  FaBuffer,
  FaRegMoneyBill1,
} from "react-icons/fa6";
import { FaStickyNote } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import {
  Header,
  StyledList,
  StyledNav,
  DropdownMenu,
  MenuButton,
} from "./style";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const reloadPage = (path) => {
    navigate(path);
  };

  // Lista de itens de navegação
  const navItems = [
    { to: Links.HOME, icon: FaPeopleGroup, label: "Fila" },
    {
      to: Links.CRIAR_FICHA,
      icon: FaBookBookmark,
      label: "Livro de atendimento",
      onClick: () => reloadPage(Links.CRIAR_FICHA),
    },
    {
      to: Links.BENEFITS,
      icon: FaRegMoneyBill1,
      label: "Gestão de benefícios",
    },
    { to: Links.RELATORIOS, icon: FaBuffer, label: "Relatórios" },
    {
      to: Links.ALL_PESSOAS,
      icon: BsFillPeopleFill,
      label: "Pessoas registradas",
    },
    { to: Links.UPDATES, icon: FaStickyNote, label: "Atualizações" },
  ];

  return (
    <Header>
      <StyledNav>
        <StyledList>
          {navItems.map(({ to, icon, label, onClick }) => (
            <NavItem key={to} to={to} icon={icon} onClick={onClick}>
              {label}
            </NavItem>
          ))}
        </StyledList>

        {/* Phone responsive */}
        <MenuButton onClick={toggleMenu}>
          <FaBars />
        </MenuButton>

        <DropdownMenu isopen={menuOpen ? menuOpen : undefined}>
          {navItems.map(({ to, icon, label }) => (
            <NavItem key={to} to={to} icon={icon} onClick={toggleMenu}>
              {label}
            </NavItem>
          ))}
        </DropdownMenu>
      </StyledNav>
    </Header>
  );
};

export default Sidebar;
