import useHeaders from "@/hooks/useHeaders";
import useValues from "@/hooks/useValues";
import mapperTheaders from "@/Middlewares/mapperTheaders";
import {
  ActionButton,
  Card,
  CardItem,
  CardNumber,
  CardValue,
  ActionContainer,
} from "../style";
import { MiniBallButton } from "@/components/MiniBall";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

export default function handleMobile(query) {
  if (query.length > 0) {
    const theaders = useHeaders(query);
    return query.map((obj, objIndex) => (
      <Card key={objIndex}>
        {theaders.map((header, headerIndex) => (
          // Hard Code...
          <>
            {header === "NdaFicha" && (
              <CardNumber>
                {mapperTheaders(header, false, true)}
                {obj[header]}
              </CardNumber>
            )}
            <CardItem key={headerIndex}>
              <div>{mapperTheaders(header, false, true)}:</div>
              <CardValue>{obj[header]}</CardValue>
            </CardItem>
          </>
        ))}
        <ActionContainer>
          <ActionButton title="Excluir um registro é permanente!">
            <FaRegTrashCan />
          </ActionButton>
          <ActionButton>
            <FaPenToSquare />
          </ActionButton>
        </ActionContainer>
      </Card>
    ));
  }
}
