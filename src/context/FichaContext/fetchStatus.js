import { apiPath } from "@/context/Links";

export default async function fetchStatus() {
  const response = await fetch(`${apiPath}/status_choices`);
  const data = await response.json();
  return Object.values(data);
}
