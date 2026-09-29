// src/pages/ServiceBook/handles/handleSubmit.ts

import { fetchData } from "@/service/fetch";
import { NavigateFunction } from "react-router-dom";
import { IFicha } from "@/interfaces/recordTypes";
import { apiPath, Links } from "@/context/Links";
import { FormContextType } from "@/context/FormContext/types";
import { IServiceBook } from "../type";
import { statusVerboseToCode } from "@/hooks/useSttsColor";

interface handleSubmitProps extends FormContextType {
  navigate: NavigateFunction;
  param?: string;
}

export function handleSubmit({
  formData,
  setFormData,
  navigate,
  param,
}: handleSubmitProps) {
  // Remover campos desnecessários
  const data = formData as unknown as IServiceBook;
  const cleanedCPFNIS = data.NIS_CPF.replace(/\D/g, "");
  const { Status } = data;
  console.log(Status);
  const cleanedFormData = {
    ...data,
    NIS_CPF: cleanedCPFNIS,
    Status: statusVerboseToCode(Status),
  };

  const method = param ? "PATCH" : "POST";
  const url = param
    ? `${apiPath}/pessoas-all/${param}/`
    : `${apiPath}/pessoas-all/`;

  fetchData<IFicha>(url, method, cleanedFormData).then((resp) => {
    if (resp) {
      navigate(Links.HOME);
      setFormData({}); // Limpa os dados do contexto após envio do formulário
    } else {
      console.error("Erro ao enviar os dados.");
    }
  });
}
