// src/pages/Benefits/handlers/handlePeopleQuery.tsx

import { FichaTableDataPrevReturn } from "@/constants/tableData";
import {
  Td,
  Tr,
  Card,
  CardItem,
  CardNumber,
  CardValue,
} from "@/components/Table/style";
import { StyledCheckbox } from "@/pages/Benefits/components/style";
import usePeopleSelectorContext from "@/hooks/usePeopleSelectorContext";
import { extractValues } from "@/utils/apiHelpers";
import { QueryRowType } from "@/interfaces/recordTypes";

/* ============================================================
 *  DESKTOP — Linhas selecionáveis com checkbox
 * ============================================================ */
export default function HandlePeopleQuery(query: FichaTableDataPrevReturn[]) {
  const { handlePerson, selectedPeople } = usePeopleSelectorContext();

  return query.map((pessoa) => {
    const id = pessoa["NIS/CPF"] as string;
    const isSelected = selectedPeople.includes(id);

    return (
      <Tr
        key={id}
        className={isSelected ? "person-selected" : ""}
        onClick={() => handlePerson(id)}
        style={{
          cursor: "pointer",
          background: isSelected ? "#eef1ff" : undefined,
          boxShadow: isSelected ? "inset 3px 0 0 #6278f2" : undefined,
        }}
      >
        {/* Coluna extra: checkbox */}
        <Td style={{ width: 40 }} onClick={(e) => e.stopPropagation()}>
          <StyledCheckbox
            checked={isSelected}
            onChange={() => handlePerson(id)}
            aria-label={`Selecionar ${pessoa["Nome"] ?? id}`}
          />
        </Td>

        {extractValues<typeof pessoa>(pessoa).map((cell, cellIndex) => (
          <Td key={`${cellIndex}-${String(cell)}`}>{cell}</Td>
        ))}
      </Tr>
    );
  });
}

/* ============================================================
 *  MOBILE — Card único de pessoa, com checkbox
 * ============================================================ */
export function PeopleCard({
  row,
  index,
}: {
  row: QueryRowType;
  index: number;
}) {
  const { handlePerson, selectedPeople } = usePeopleSelectorContext();
  const id = String(row["NIS/CPF"]);
  const isSelected = selectedPeople.includes(id);

  return (
    <Card
      onClick={() => handlePerson(id)}
      style={{
        cursor: "pointer",
        border: isSelected ? "2px solid #6278f2" : "2px solid transparent",
        background: isSelected ? "#eef1ff" : "#f9f9f9",
        transition: "all 0.15s ease",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <StyledCheckbox
          checked={isSelected}
          onChange={() => handlePerson(id)}
          aria-label={`Selecionar ${row["Nome"] ?? id}`}
        />
      </div>

      <CardNumber>#{index + 1}</CardNumber>

      {Object.entries(row).map(([key, value]) => (
        <CardItem key={key}>
          <div>{key}</div>
          <CardValue>{String(value ?? "-")}</CardValue>
        </CardItem>
      ))}
    </Card>
  );
}
