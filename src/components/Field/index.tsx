// src/components/Field/index.tsx

//import handleValues from "../Form/handles/handleValues";
import { useEffect, useMemo, useRef } from "react";
import { Note, StyledLabel, dynamicDateReceiver } from "./style";
import { IField } from "./type";

// Select ou Input criado antes da chamada do componente
const StyledInput = dynamicDateReceiver("input");
const StyledSelect = dynamicDateReceiver("select");

const Field = ({
  name,
  type,
  onChange,
  required = true,
  placeholder,
  label,
  disabled = false,
  readOnly = false,
  value,
  note,
  autoFocus = false,
  options,
}: IField) => {
  const fieldRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  // Garante que o foco será aplicado corretamente
  useEffect(() => {
    if (autoFocus && fieldRef.current) {
      fieldRef.current.focus();
      fieldRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [autoFocus]);

  // Renderiza o input ou select conforme o tipo
  const FieldComponent = useMemo(() => {
    /* Se for campo select */
    return type === "select" ? (
      <StyledSelect
        ref={fieldRef}
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      >
        <option disabled value="" selected>
          Selecione uma opção de {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </StyledSelect>
    ) : (
      /* Se for campo do tipo text como consequência */
      <StyledInput
        ref={fieldRef}
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    );
  }, [
    type,
    name,
    value,
    required,
    placeholder,
    onChange,
    disabled,
    readOnly,
    options,
    label,
  ]);

  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {FieldComponent}
      {note && <Note>{note}</Note>}
    </>
  );
};

export default Field;
