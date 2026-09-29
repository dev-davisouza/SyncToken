export default function handleValueOfNISCPF(
  name: string,
  value: string,
  docType: string | undefined,
  setDocType: (value: string | undefined) => void
): string {
  if (name === "DocType") {
    setDocType(value);
    return value;
  }
  if (name === "NIS_CPF") {
    let numericValue = value.replace(/\D/g, "").substring(0, 11);

    if (docType) {
      if (docType === "NIS") {
        numericValue = numericValue.replace(/(\d{5})(\d)/, "$1$2");
        numericValue = numericValue.replace(/(\d{10})(\d{1})$/, "$1-$2");
      } else if (docType === "CPF") {
        numericValue = numericValue.replace(/(\d{3})(\d)/, "$1.$2");
        numericValue = numericValue.replace(/(\d{3})(\d)/, "$1.$2");
        numericValue = numericValue.replace(/(\d{3})(\d{2})$/, "$1-$2");
      }
    }
    return numericValue;
  }
  return value;
}
