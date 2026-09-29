// src/components/Form/handlers/handleChange.tsx

import { QueryRowType } from "@/interfaces/recordTypes";
import handleFieldChange from "./handleFieldChange";

const handleChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFormData: React.Dispatch<React.SetStateAction<QueryRowType>>,
  handleValue?: (name: string, value: string) => string
) => {
  const { name, value: rawValue } = event.target;
  const value = handleFieldChange(name, rawValue, handleValue);
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

export default handleChange;
