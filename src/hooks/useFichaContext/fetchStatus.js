import { apiPath } from "@/context/Links";

export default async function fetchStatus(access) {
  const response = await fetch(`${apiPath}/status_choices`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: access,
    },
  });
  const data = await response.json();
  return Object.values(data);
}
