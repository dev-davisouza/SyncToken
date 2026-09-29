import { QueryRowType } from "@/interfaces/recordTypes";

export default function handleDisabled(
  name: string,
  values: QueryRowType
): boolean {
  const docTypeSelected = values["DocType"];
  return !docTypeSelected && name !== "DocType";
}
