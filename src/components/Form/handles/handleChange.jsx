import { apiPath, Links } from "@/context/Links";
import handleNIS_CPF from "./handleNIS_CPF";

// handleChange func
export default function handleChange(
  e,
  formData,
  setFormData,
  navigate,
  id = null
) {
  const { name, value } = e.target;
  if (name === "NIS_CPF") {
    // Obtém o tipo de documento atual do estado
    const docType = formData["DocType"];

    // Formata para o formato escolhido em DocType
    const formattedValue = handleNIS_CPF(docType, value);
    setFormData({ ...formData, [name]: formattedValue });

    // Retira os hífens e/ou pontos
    const cleanValue = formattedValue.replace(/\D/g, "");

    // Verifique se aquela pessoa já existe na base de dados
    if (cleanValue.length === 11) {
      fetch(`${apiPath}/pessoas-all/${cleanValue}`)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.detail !== "No Pessoa matches the given query.") {
            setFormData(data);
            navigate(`${Links.CRIAR_FICHA}/${cleanValue}`);
          } /* else {
            setFormData((prevFormData) => {
              const resetFormData = Object.keys(prevFormData).reduce(
                (acc, key) => {
                  acc[key] = ""; // Define o valor de cada campo como uma string vazia
                  return acc;
                },
                {}
              );

              return resetFormData;
            });
            navigate(`${Links.CRIAR_FICHA}`);
          } */
        });
    }
    if (id) {
      setFormData((prevFormData) => {
        const resetFormData = Object.keys(prevFormData).reduce((acc, key) => {
          acc[key] = ""; // Define o valor de cada campo como uma string vazia
          return acc;
        }, {});

        return resetFormData;
      });
      navigate(`${Links.CRIAR_FICHA}`);
    }
  } else {
    setFormData({ ...formData, [name]: value });
  }
}

/* 
  MANO O PROBLEMA AGORA É O BACKEND OU O FRONT Q ESTÁ 
  TENDO DIFULDADE PARA AJUSTAR O TIMEZONE AO DO BRAZIL
  E ESTÁ GERANDO PROBLEMA DE INTEGRIDADE AO TENTAR SALVAR OS 
  RELATÓRIOS NA BASE DE DADOS!

*/
