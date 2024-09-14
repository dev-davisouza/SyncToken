import { Th } from "../style";
import useHeaders from "@/hooks/useHeaders";
import mapperTheaders from "@/Middlewares/mapperTheaders";

/* 
query: [[{}], [{}], [{}]]
*/

export default function handleHeaders(query, headerExtraEmptySpace) {
  if (query.length > 0) {
    const theaders = useHeaders(query);
    const renderExtraSpace = headerExtraEmptySpace ? <th></th> : <></>;
    if (theaders) {
      return (
        <>{mapperTheaders(theaders, true, false, headerExtraEmptySpace)}</>
      );
    } else {
      return (
        <tr>
          {theaders.map((prop) => (
            <Th key={prop}>{prop}</Th>
          ))}
          {renderExtraSpace}
        </tr>
      );
    }
  }
}
