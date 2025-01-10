import { styled, keyframes } from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;

  span {
    margin-right: 0.5rem;
    font-size: 0.9rem;
    color: #555;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &.active {
    background-color: #003f8a;
  }

  svg {
    font-size: 1.2rem;
  }
`;

// Paleta de cores
const primaryColor = "#4CAF50";
const secondaryColor = "#F1F1F1";
const textColor = "#333";
const borderColor = "#E0E0E0";

export const Content = styled.div`
  background-color: #fff;
  max-height: 40vh;
  overflow-y: scroll;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: fit-content;
  margin: auto;
`;

export const ContentTitle = styled.h3`
  font-size: 1.2rem;
  color: ${textColor};
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 0.8rem;
  padding: 0.6rem;
  background-color: #fff;
  border: 1px solid ${borderColor};
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${primaryColor};
    color: #fff;

    label {
      color: #fff;
    }
  }
`;

export const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1rem;
  color: ${textColor};
  cursor: pointer;
  transition: color 0.3s ease;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 1rem;
  height: 1rem;
  border: 2px solid ${borderColor};
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  position: relative;
  outline: none;

  &:checked {
    background-color: ${primaryColor};
    border-color: ${primaryColor};
  }

  &:checked::after {
    content: "✔";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const AppliedFiltersContainer = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: ${secondaryColor};
  border: 1px solid ${borderColor};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FiltersList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const FilterItem = styled.li`
  background-color: ${primaryColor};
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;
