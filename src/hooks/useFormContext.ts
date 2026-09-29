import { useContext } from "react";
import FormContext from "@/context/FormContext";
import { FormContextType } from "@/context/FormContext/types";

export default function useFormContext() {
  return useContext(FormContext) as FormContextType;
}
