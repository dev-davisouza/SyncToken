import { apiPath, Links } from "@/context/Links";

export default async function handleRemove(
  NIS_CPF,
  navigate,
  activateTrigger,
  setMessageContent,
  setTypeMessage,
  access
) {
  const response = await fetch(`${apiPath}/pessoas-all/${NIS_CPF}/`, {
    headers: {
      Authorization: access,
      "Content-type": "application/json",
    },
    method: "DELETE",
  });

  const message = response.ok
    ? "Sucesso ao excluir ficha!"
    : (await response.json()).detail || "Erro ao excluir ficha!";

  if (response.ok) {
    setMessageContent(message);
    setTypeMessage("success");
    // Dispara o trigger de atualização após o DELETE
    activateTrigger();
  } else {
    console.error("Erro ao apagar ficha:", error);
    setMessageContent(message);
    setTypeMessage("error");
    navigate(`${Links.HOME}`);
  }
}
