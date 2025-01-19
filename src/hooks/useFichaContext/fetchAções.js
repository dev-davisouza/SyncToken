import { apiPath } from "@/context/Links";

export default async function fetchAções(access) {
  const response = await fetch(`${apiPath}/acoes/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: access,
    },
  });
  const data = await response.json();
  return Object.values(data);
}
