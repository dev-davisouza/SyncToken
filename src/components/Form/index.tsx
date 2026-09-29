// src/components/Form/index.tsx

import Button from "../Button";
import { StyledLegend } from "./style";
import { IForm } from "./type";
import Field from "../Field";
import useFormContext from "@/hooks/useFormContext";
import sortFields from "./handlers/sortFields";
import handleChange from "./handlers/handleChange";

export default function Form<T>({
  legend,
  textFields,
  selectFields,
  handleSubmit,
  textSubmit,
  order = [],
  handleValue,
  handleDisabled,
  handleLabel,
  handleFocus,
}: IForm<T>) {
  const { formData, setFormData } = useFormContext();

  const sortedFields = sortFields(textFields, selectFields, order);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <StyledLegend>{legend}</StyledLegend>

      {sortedFields.map(({ type, name }) => (
        <Field
          key={name}
          label={handleLabel ? handleLabel(name) : name}
          name={name}
          type={type}
          onChange={(e) => handleChange(e, setFormData, handleValue)}
          value={formData[name] ? (formData[name] as string) : ""}
          placeholder={
            type === "text"
              ? `Digite as informações de ${
                  handleLabel ? handleLabel(name) : name
                }`
              : undefined
          }
          options={
            type === "select" ? selectFields?.[name as keyof T] : undefined
          }
          disabled={handleDisabled ? handleDisabled(name, formData) : false}
          autoFocus={handleFocus ? handleFocus(name) : false}
        />
      ))}

      <Button type="submit">{textSubmit}</Button>
    </form>
  );
}
