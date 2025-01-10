import { Field } from "@/components/Field";
import mapperTheaders from "@/Middlewares/mapperTheaders";
import useFormContext from "@/hooks/useFormContext";
import { useEffect, useState } from "react";
import handleDisabled from "./handleDisabled";
import loadChoices from "./useChoices";
import handleChange from "./handleChange";
import { useNavigate, useParams } from "react-router-dom";
import useMessageContext from "@/hooks/useMessageContext";
import handleType from "./handleType";
import useFichaContext from "@/hooks/useFichaContext";

export default function handleFields(textFields, selectFields, id, access) {
  // Create a navigate
  const navigate = useNavigate();
  // State for selectField choices
  const [choices, setChoices] = useState({});
  // States from context
  const { formData, setFormData } = useFormContext();
  const { fetchAções, fetchStatus, fetchBenefitSituations } = useFichaContext();

  // handleling the choices
  useEffect(() => {
    async function fetchChoices() {
      await loadChoices(
        selectFields,
        setChoices,
        fetchAções,
        fetchStatus,
        fetchBenefitSituations
      );
    }

    fetchChoices();
  }, [selectFields]);

  // JSX Return
  return textFields.map((field) => {
    // Verifica se o campo está no selectFields
    const isSelect = selectFields.includes(field);

    // Verfica se é o campo DocType
    const isDocType = field.includes("DocType");

    // Refina o nome do campo para exibição
    const refinedField = mapperTheaders(field, false, true);

    // Renderiza o Field com o tipo apropriado
    return (
      <Field
        key={field}
        name={field}
        label={refinedField}
        required={true}
        placeholder={`Digite as informações de ${refinedField}...`}
        onChange={(e) =>
          handleChange(e, formData, setFormData, navigate, id, access)
        }
        value={formData[field]}
        type={handleType(field, isSelect)} // Define o tipo do campo
        options={choices ? choices[field] : null}
        //disabled={handleDisabled(field, formData)}
        note={
          isDocType
            ? "Enquanto um tipo de documento não for selecionado, você não pode preencher o restante do formulário!"
            : null
        }
        /*  
        readOnly={field.readOnly} */
      />
    );
  });
}
