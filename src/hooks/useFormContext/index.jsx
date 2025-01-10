import { useContext } from "react";
import FormContext from "@/context/FormContext";
import usePessoa from "./usePessoa";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../useAuthContext";

export default function useFormContext() {
  const navigate = useNavigate();
  const { access } = useAuthContext();
  const { setFormData, formData } = useContext(FormContext);

  return {
    setFormData,
    formData,
    usePessoa: (NIS_CPF) => usePessoa(NIS_CPF, setFormData, navigate, access),
  };
}
