import { apiPath } from "@/context/Links";

export default function handleIcon(nameParam) {
  return fetch(`${apiPath}/nome/icon?name=${nameParam}`)
    .then((resp) => resp.json())
    .then((data) => data.url);
}
