import { Link, useLocation } from "react-router-dom";
import { StyledNavItem } from "./style";

const NavItem = ({ to, children, icon: Icon, onClick }) => {
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
