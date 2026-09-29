import { Link, useLocation } from "react-router-dom";
import { StyledNavItem } from "./style";
import { IconType } from "react-icons";
import { LinksType } from "@/context/Links";

interface INavItem {
  to: LinksType;
  children: React.ReactNode;
  icon: IconType;
  onClick?: () => void;
}

const NavItem = ({ to, children, icon: Icon, onClick }: INavItem) => {
  const location = useLocation();
  const isActive = location.pathname == to;

  return (
    <Link onClick={onClick} to={to}>
      <StyledNavItem className={isActive ? "active" : ""}>
        {Icon && <Icon />}
        {children}
      </StyledNavItem>
    </Link>
  );
};

export default NavItem;
