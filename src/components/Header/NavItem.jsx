import styled from "styled-components";

const StyledNavItem = styled.li`
  font-size: 20px;
  line-height: 29px;
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
`;

const NavItem = ({ children, icon: Icon }) => {
  return (
    <StyledNavItem>
      {Icon && <Icon />}
      {children}
    </StyledNavItem>
  );
};

export default NavItem;
