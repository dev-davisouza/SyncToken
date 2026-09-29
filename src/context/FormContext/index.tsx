// src/context/FormContext/index.tsx

import { createContext, useState } from "react";
import { FormContextType } from "./types";
import { QueryRowType } from "@/interfaces/recordTypes";

const FormContext = createContext<FormContextType | undefined>(undefined);
FormContext.displayName = "FormContext";

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<QueryRowType>({});

  return (
    <FormContext.Provider value={{ setFormData, formData }}>
      {children}
    </FormContext.Provider>
  );
}

export default FormContext;
