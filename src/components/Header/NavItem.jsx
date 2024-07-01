import styled from "styled-components";

const StyledNavItem = styled.li`
  font-size: 20px;
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
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
