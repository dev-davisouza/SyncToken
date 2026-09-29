import { apiPath } from "@/context/Links";
import { IFetchIcon } from "@/interfaces/IStaticFetches";
import { fetchData } from "@/service/fetch";

export default function handleIcon(nameParam: string) {
  return fetchData<IFetchIcon>(`${apiPath}/nome/icon?name=${nameParam}/`).then(
    (data) => {
      const resp = data as IFetchIcon;
      return resp.url;
    }
  );
}
