import { createContext, useState } from "react";

const FormContext = createContext();
FormContext.displayName = "FormContext";

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({ data: "not-data-yet" });
  return (
    <FormContext.Provider value={{ setFormData, formData }}>
      {children}
    </FormContext.Provider>
  );
}

export default FormContext;
