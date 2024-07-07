import { Links } from "@/context/Links";
import apiPath from "@/context/Api";
import reducer from "@/reducer";
import { useEffect, useState } from "react";

/* Remove */
export async function handleRemove(id, setFichas, navigate) {
  try {
    const response = await fetch(`${apiPath}/pessoas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      // Atualiza o estado para remover a ficha
      setFichas((prevFichas) =>
        prevFichas.filter((ficha) => ficha.NIS_CPF !== id)
      );

      // Navega para a página Queue com uma mensagem de sucesso
      navigate(Links.HOME, {
        state: { message: "Ficha excluída com sucesso!" },
      });
    } else {
      console.error("Failed to delete", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error in fetch:", error);
  }
}

/* Get Next Status */
export function getNextStatus(currentStatus) {
  if (currentStatus[0] === "A ser atendido") {
    return "stts_1";
  }
  if (currentStatus[0] === "Em atendimento") {
    return "stts_2";
  }
  if (currentStatus[0] === "Atendimento encerrado") {
    return "stts_0";
  }
}

/* Edit */
export function handleEdit(id, navigate) {
  navigate(`${Links.CRIAR_FICHA}/${id}`);
}

/* Get Pessoas do dia */
export function usePeopleFichas(updateTrigger) {
  const [fichas, setFichas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${apiPath}/pessoas`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const updatedData = data.map((ficha) => ({
          ...ficha,
          Status: reducer(ficha.Status), // Atualiza o status com reducer
        }));
        setFichas(updatedData);
        setIsLoading(false); // Finaliza o carregamento
      })
      .catch((err) => console.log(err));
    setIsLoading(false); // Finaliza o carregamento
  }, [updateTrigger]);
  return [fichas, setFichas];
}

export function handleStatusChange(
  id,
  currentFicha,
  setFichas,
  setUpdateTrigger
) {
  const nextStatus = getNextStatus(currentFicha.Status);
  // Atualiza o status com a nova cor e título
  const updatedFicha = {
    ...currentFicha,
    Status: nextStatus,
  };

  fetch(`${apiPath}/pessoas/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFicha), // Envia o objeto inteiro com o novo status
  })
    .then((response) => {
      if (response.ok) {
        setFichas((prevFichas) =>
          prevFichas.map((ficha) =>
            ficha.NIS_CPF === id ? { ...ficha, Status: nextStatus } : ficha
          )
        );
        setUpdateTrigger((prev) => !prev);

        console.log(
          "Failed to update status",
          response.status,
          response.statusText
        );
        return response.json().then((data) => {
          console.error("Error details:", data);
        });
      }
    })
    .catch((err) => console.log("Error in fetch:", err));
}
