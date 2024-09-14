import { apiPath, Links } from "@/context/Links";

export default async function handleSubmit(
  data,
  setFormData,
  param = null,
  navigate,
  activateTrigger,
  setMessageContent,
  setTypeMessage
) {
  const method = param ? "PUT" : "POST";
  const url = param
    ? `${apiPath}/pessoas-all/${param}/`
    : `${apiPath}/pessoas-all/`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
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
    console.log(error);
  }
}
