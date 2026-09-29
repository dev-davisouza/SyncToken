import styled from "styled-components";

export const PaginationItems = styled.td`
  border: none;
  text-align: center;
  padding: 10px;
  width: 100%;
`;

export const Paginators = styled.div`
  margin: 1rem auto;
  display: inline-flex;
  justify-content: center;
  gap: 10px;

  h4 {
    margin: 0;
  }

  svg {
    transition: transform 0.2s ease;
  }

  svg:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &:hover {
    cursor: pointer;
  }
`;
