import { apiPath } from "@/context/Links";

export default async function fetchBenefitSituations(access) {
  const response = await fetch(`${apiPath}/benefit_situations/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: access,
    },
  });
  const data = await response.json();
  return Object.values(data);
}
