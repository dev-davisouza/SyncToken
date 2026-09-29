// src/components/Table/index.tsx

import { extractKeys, extractValues } from "@/utils/apiHelpers";
import {
  StyledCaption,
  StyledFlexContainer,
  StyledTable,
  Td,
  Tr,
  Th,
  Card,
  CardItem,
  CardNumber,
  CardValue,
  MobileCardsContainer,
} from "./style";
import { QueryRowType } from "@/interfaces/recordTypes";
import Paginator from "../Paginator";
import hash from "@/utils/hash";
import { TableProps } from "./type";

/**
 * Componente de Tabela Genérica **responsiva**.
 *
 * - Desktop (>= 769px): renderiza `<StyledTable>`.
 * - Mobile  (<= 768px): oculta a tabela e renderiza os dados em cards.
 *
 * @param {TableProps} props - Propriedades do componente.
 * @returns {React.JSX.Element} Componente de tabela.
 */
// src/components/Table/index.tsx

export default function Table({
  caption,
  query,
  handleQuery,
  renderCard,
  extraHeader,
  count,
  isForSelection,
}: TableProps) {
  if (!query || query.length === 0) {
    return <p>Dados não disponíveis.</p>;
  }

  const theaders = extractKeys(query[0] as QueryRowType);
  const tvalues = query.map((val) => extractValues(val));

  const defaultRenderCard = (row: QueryRowType, index: number) => (
    <Card key={index}>
      <CardNumber>#{index + 1}</CardNumber>
      {Object.entries(row).map(([key, value]) => (
        <CardItem key={key}>
          <div>{key}</div>
          <CardValue>{String(value ?? "-")}</CardValue>
        </CardItem>
      ))}
    </Card>
  );

  return (
    <>
      <StyledCaption>{caption}</StyledCaption>
      <StyledFlexContainer>
        <StyledTable>
          <thead>
            <Tr>
              {extraHeader && <Th style={{ width: 40 }}>{extraHeader}</Th>}
              {theaders.map((theader) => (
                <Th key={theader}>{theader}</Th>
              ))}
            </Tr>
          </thead>
          <tbody>
            {isForSelection || handleQuery
              ? handleQuery!(query)
              : tvalues.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {extraHeader && <Td style={{ width: 40 }} />}
                    {row.map((value, cellIndex) => (
                      <Td key={hash(String(cellIndex))}>{value}</Td>
                    ))}
                  </Tr>
                ))}
            {count && (
              <tr>
                <Paginator totalItems={count} />
              </tr>
            )}
          </tbody>
        </StyledTable>

        <MobileCardsContainer>
          {query.map((row, index) =>
            renderCard ? renderCard(row, index) : defaultRenderCard(row, index),
          )}
          {count && <Paginator totalItems={count} />}
        </MobileCardsContainer>
      </StyledFlexContainer>
    </>
  );
}
