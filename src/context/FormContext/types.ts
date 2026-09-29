import { QueryRowType } from "@/interfaces/recordTypes";

export interface FormContextType {
  formData: QueryRowType;
  setFormData: React.Dispatch<React.SetStateAction<QueryRowType>>;
}
