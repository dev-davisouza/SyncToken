// src/pages/Reports/reportTable.tsx

import {
  RelatoriesContainer,
  RelatoryCard,
  RelatoryCardItem,
  RelatoryCardNumber,
  RelatoryCardValue,
} from "@/pages/Reports/style";
import { StyledCaption, ActionContainer } from "@/components/Table/style";
import Button from "@/components/Button";
import Paginator from "@/components/Paginator";
import { handleViewRelatorio } from "@/pages/Reports/handlers/handleViewRelatorio";
import localeDateFormatter from "@/constants/localeDateFormatter";
import IRelatorio from "@/interfaces/IRelatorios";
import { useNavigate } from "react-router-dom";

interface ReportTableProps {
  relatorios: IRelatorio[];
  relatoriosCount: number;
}

export default function ReportTable({
  relatorios,
  relatoriosCount,
}: ReportTableProps) {
  const navigate = useNavigate();

  return (
    <>
      <StyledCaption>Relatórios diários</StyledCaption>
      <RelatoriesContainer>
        {relatorios.map((relatorio) => (
          <RelatoryCard key={relatorio.data} direction="down">
            <RelatoryCardNumber>
              {localeDateFormatter(relatorio.data)}
            </RelatoryCardNumber>
            <RelatoryCardItem>
              <div>Total de fichas:</div>
              {relatorio && (
                <RelatoryCardValue>{relatorio.total_pessoas}</RelatoryCardValue>
              )}
            </RelatoryCardItem>
            <ActionContainer $opacity={1}>
              <Button
                onClick={() => handleViewRelatorio(relatorio.data, navigate)}
                type="button"
              >
                Visualizar Livro
              </Button>
            </ActionContainer>
          </RelatoryCard>
        ))}
        <Paginator totalItems={relatoriosCount} />
      </RelatoriesContainer>
    </>
  );
}
