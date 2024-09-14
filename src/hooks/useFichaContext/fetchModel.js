import { apiPath } from "@/context/Links";

export default async function fetchModel() {
  try {
    const response = await fetch(`${apiPath}/model`);

    const model = await response.json();
    return model;
  } catch (error) {
    console.error("Erro ao pegar model:", error);
    throw new Error("Erro ao pegar model:", error);
  }
}
