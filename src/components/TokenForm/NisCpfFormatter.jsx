import { useState } from "react";

export default function useNisCpfFormatter(initialType = "CPF") {
  const [nisCpfType, setNisCpfType] = useState(initialType);

  const handleNisCpfChange = (e) => {
    const { value } = e.target;
    setNisCpfType(value);
  };

  const formatNisCpf = (value) => {
    if (initialType == "CPF") {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return value.replace(/\D/g, "").replace(/(\d{1})(\d{1})$/, "$1-$2");
    }
  };

  const handleNisCpfInputChange = (e, data, setData) => {
    let { value } = e.target;

    // Limitar a entrada a 11 caracteres (somente números)
    value = value.replace(/\D/g, "").slice(0, 11);

    const formattedValue = formatNisCpf(value);
    setData({ ...data, NIS_CPF: formattedValue });
    return data;
  };

  return {
    nisCpfType,
    handleNisCpfChange,
    handleNisCpfInputChange,
  };
}
