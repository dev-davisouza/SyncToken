import { apiPath, Links } from "@/context/Links";

export default async function handleSubmit(
  data,
  setFormData,
  param = null,
  navigate,
  activateTrigger,
  setMessageContent,
  setTypeMessage,
  access
) {
  // Verifica se existem campos específicos para serem removidos
  const forbiddenFields = ["last_update", "created_at"];
  forbiddenFields.forEach((field) => {
    if (data.hasOwnProperty(field)) {
      delete data[field];
    }
  });

  const method = param ? "PUT" : "POST";
  const url = param
    ? `${apiPath}/pessoas-all/${param}/`
    : `${apiPath}/pessoas-all/`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
        Authorization: access,
      },
      body: JSON.stringify({ id: data.NIS_CPF, ...data }),
    });

    if (response.ok) {
      const message =
        method === "PUT"
          ? "Ficha editada com sucesso!"
          : "Pessoa adicionada com sucesso!";

      // Alterna o estado do updatedTrigger para forçar a atualização da tabela
      activateTrigger();

      setMessageContent(message);
      setTypeMessage("success");
      navigate(Links.HOME);
      setFormData(""); // Limpa os dados do contexto após envio do formulário
    } else {
      const json = await response.json();
      // Pega a mensagem de erro
      const msg = Object.values(json).toString();
      setMessageContent(msg);
      setTypeMessage("error");
    }
  } catch (error) {
    console.error(error.message);
  }
}
