// src/pages/ServiceBook/handlers/handleFormData.tsx

import { FormContextType } from "@/context/FormContext/types";
import { Links } from "@/context/Links";
import { fetchPessoa } from "@/hooks/useFetchContext/fetches";
import { NavigateFunction } from "react-router-dom";

interface handleFormDataProps extends FormContextType {
  id: string | undefined;
  navigate: NavigateFunction;
}

/** Substitui o antigo `handleChange`.
 *
 * `handleFormData` tem o objetivo de controlar o formulário através da chave `NIS_CPF`
 */
export default function handleFormData({
  formData,
  setFormData,
  id,
  navigate,
}: handleFormDataProps) {
  if (id) {
    const cleanedID = String(id).replace(/\D/g, "");

    // Se o formulário estiver vazio ou sem o campo NIS_CPF preenchido, busca os dados da pessoa
    if (!formData.NIS_CPF) {
      fetchPessoa(cleanedID).then((data) => {
        if (data) {
          setFormData(data);
        } else {
          console.log("Erro ao buscar os dados da pessoa.");
        }
      });
      return;
    }

    // Permite edição normal, mas se `NIS_CPF` for alterado, reseta e volta para a tela de criação
    if (formData.NIS_CPF) {
      const cleanedNIS_CPF = String(formData.NIS_CPF).replace(/\D/g, "");

      if (cleanedNIS_CPF !== cleanedID) {
        const resetFormData = Object.keys(formData).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {} as Record<string, string>);

        setFormData(resetFormData);
        navigate(`${Links.CRIAR_FICHA}/`);
        return;
      }
    }
  } else if (formData.NIS_CPF) {
    // Caso `id` seja undefined, faz o fetch ao atingir 11 dígitos
    const cleanedNIS_CPF = String(formData.NIS_CPF).replace(/\D/g, "");

    if (cleanedNIS_CPF.length === 11) {
      fetchPessoa(cleanedNIS_CPF).then((data) => {
        if (data) {
          setFormData(data);
          navigate(`${Links.CRIAR_FICHA}/${cleanedNIS_CPF}`);
        } else {
          console.log("Erro ao buscar os dados da pessoa.");
        }
      });
    }
  }
}
