import { apiPath, Links } from "@/context/Links";
import handleNIS_CPF from "./handleNIS_CPF";

/**
 * Função para manipular mudanças nos campos do formulário.
 * @param {Object} e - Evento de mudança.
 * @param {Object} formData - Dados atuais do formulário.
 * @param {import("react-router-dom").NavigateFunction} navigate - Função para redirecionamento de rotas.
 * @param {string|null} id - ID opcional usado para identificar registros existentes.
 */
export default function handleChange(
  e,
  formData,
  setFormData,
  navigate,
  id = null,
  access
) {
  const { name, value } = e.target;

  if (name === "NIS_CPF") {
    // Formata o valor do NIS_CPF
    const docType = formData["DocType"];
    const formattedValue = handleNIS_CPF(docType, value);
    setFormData({ ...formData, [name]: formattedValue });

    // Remove caracteres não numéricos
    const cleanValue = formattedValue.replace(/\D/g, "");

    // Verifica se o CPF tem 11 dígitos e realiza a consulta
    if (cleanValue.length === 11) {
      fetch(`${apiPath}/pessoas-all/${cleanValue}/`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: access,
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Erro na consulta ao servidor.");
          }
          return resp.json();
        })
        .then((data) => {
          if (
            data.detail !==
            `Objeto de chave primária '${cleanValue}' não encontrado!`
          ) {
            setFormData(data);
            navigate(`${Links.CRIAR_FICHA}/${cleanValue}`);
          } /* else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              NIS_CPF: "",
            }));
          } */
        })
        .catch((err) => {
          // Lidar com o erro da consulta
        });
    }
  } else {
    // Atualiza qualquer outro campo
    setFormData({ ...formData, [name]: value });
  }

  // Lógica opcional para redefinir o formulário se o ID for passado
  if (id) {
    setFormData((prevFormData) => ({ ...prevFormData }));
    if (name == "NIS_CPF") {
      if (value != id) {
        const resetFormData = Object.keys(formData).reduce((acc, key) => {
          acc[key] = ""; // Define o valor de cada campo como uma string vazia
          return acc;
        }, {});

        setFormData(resetFormData);

        // Redireciona
        navigate(`${Links.CRIAR_FICHA}`);
      }
    }
  }
}
