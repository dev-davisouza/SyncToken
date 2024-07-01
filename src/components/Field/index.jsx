import styled from "styled-components";

const dynamicDateReceiver = (tag) => {
  return styled(tag)`
    margin: 24px 0;
    background-color: white;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.06);
    width: 100%;
    border: none;
    font-size: 24px;
    padding: 12px;
    box-sizing: border-box;

    @media (max-width: 768px) {
      margin: 18px 0;
      font-size: 18px;
      padding: 10px;
    }

    @media (max-width: 480px) {
      margin: 12px 0;
      font-size: 16px;
      padding: 8px;
    }
  `;
};

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 4px;
  }
`;

const Note = styled.small`
  display: block;
  font-size: 12px;
  margin: -12px 0 30px 24px;
  color: red;

  @media (max-width: 768px) {
    font-size: 9px;
    margin: -8px 0 24px 16px;
  }
`;

const StyledInput = dynamicDateReceiver("input");

export const Input = ({
  name,
  type = "text",
  onChange,
  required = true,
  placeholder,
  label,
  disabled = false,
  readOnly = false,
  value,
  note = "",
}) => {
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        disabled={disabled}
        value={value}
        key={name}
        id={name}
        readOnly={readOnly}
      />
      {note && <Note>{note}</Note>}
    </div>
  );
};

/* Dropdown */

const StyledSelect = dynamicDateReceiver("select");
const defaultEmptyOption = <option value=""></option>;

export const Dropdown = ({
  name,
  onChange,
  required = true,
  label,
  disabled = false,
  readOnly = false,
  value,
  note = "",
  children = defaultEmptyOption,
}) => {
  return (
    <div className={label && `Select-${label}`}>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect
        key={name}
        id={name}
        name={name}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(e) => onChange(e)}
        value={value}
      >
        {children}
      </StyledSelect>
      {note && <Note>{note}</Note>}
    </div>
  );
};
