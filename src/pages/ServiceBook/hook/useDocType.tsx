import { useState } from "react";

export default function useDocType() {
  const [docType, setDocType] = useState<string | undefined>(undefined);
  return { docType, setDocType };
}
