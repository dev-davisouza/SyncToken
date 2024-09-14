import { apiPath } from "@/context/Links";

export default async function fetchAções() {
  const response = await fetch(`${apiPath}/acoes`);
  const data = await response.json();
  return Object.values(data);
}
