import { apiPath } from "@/context/Links";
import { EDIT_FICHA } from "@/reducers/FichaReducer";

/* 
dataToChange: {key: value, key2: value2...}
*/

export default async function editFicha(
  dispatch,
  ficha,
  dataToChange,
  activateTrigger,
  setMessageContent,
  setTypeMessage
) {
  try {
    // Verifica se o dataToChange tem apenas uma chave e se essa chave é "Status"
    const keys = Object.keys(dataToChange);
    const changeIsStatus = keys.length === 1 && keys[0] === "Status";

    const response = await fetch(`${apiPath}/pessoas-all/${ficha.NIS_CPF}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...ficha, ...dataToChange }),
    });

    const updatedFicha = await response.json();

    if (changeIsStatus) {
      setMessageContent(`Status alterado com sucesso!`);
      setTypeMessage("success");
    }
    // Dispara o trigger de atualização após o PUT
    activateTrigger();

    dispatch({ type: EDIT_FICHA, payload: updatedFicha });
  } catch (error) {
    console.error("Erro ao editar ficha:", error);
    throw new Error("Erro ao editar ficha:", error);
  }
}
