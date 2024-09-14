import handleValues from "../Form/handles/handleValues";
import {
  Note,
  StyledFlexContent,
  StyledLabel,
  dynamicDateReceiver,
} from "./style";

// Select or Input created before call inside JSX
const StyledInput = dynamicDateReceiver("input");
const StyledSelect = dynamicDateReceiver("select");

export const Field = ({
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
  options = null,
}) => {
  if (type === "select") {
    return (
      <>
        <StyledLabel>{label}</StyledLabel>
        <StyledSelect
          name={name}
          type={type}
          required={required}
          onChange={onChange}
          disabled={disabled}
          key={name}
          id={name}
          readOnly={readOnly}
          value={value}
        >
          <option selected disabled value="">
            Selecione uma opção de {label}
          </option>
          {options &&
            options.map((opt) => (
              <option key={opt} value={handleValues(opt)}>
                {opt}
              </option>
            ))}
        </StyledSelect>
        {note && <Note>{note}</Note>}
      </>
    );
  } else {
    return (
      <>
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
      </>
    );
  }
};
