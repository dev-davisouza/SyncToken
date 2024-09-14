import { apiPath, Links } from "@/context/Links";

export default async function usePessoa(NIS_CPF, setFormData, navigate) {
  // Faça o fetch
  const response = await fetch(`${apiPath}/pessoas-all/${NIS_CPF}`);

  // Caso não tenha sido stts code 200 permaneça
  if (!response.ok) {
    navigate(`${Links.CRIAR_FICHA}`);

    // Se foi sucesso proceda:
  } else {
    const data = await response.json();
    setFormData(data);
    navigate(`${Links.CRIAR_FICHA}/${NIS_CPF}`);
  }
}
