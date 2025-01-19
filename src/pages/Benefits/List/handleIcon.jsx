import { apiPath } from "@/context/Links";

export default function handleIcon(nameParam, access) {
  return fetch(`${apiPath}/nome/icon?name=${nameParam}/`, {
    headers: {
      Authorization: access,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => data.url);
}
