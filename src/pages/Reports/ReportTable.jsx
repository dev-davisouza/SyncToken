import { StyledCaption, ActionContainer } from "@/components/Table/style";
import Button from "@/components/Button";
import Loading from "@/components/Loader";
import Search from "@/components/Search";
import { useNavigate } from "react-router-dom";
import { Links } from "@/context/Links";
import {
  RelatoriesContainer,
  RelatoryCard,
  RelatoryCardItem,
  RelatoryCardNumber,
  RelatoryCardValue,
} from "./Styles";
import useRelatorioContext from "@/hooks/useRelatorioContext";
import Paginator from "@/components/Paginator";
import usePaginatorContext from "@/hooks/usePaginatorContext";

export default function ReportTable() {
  const navigate = useNavigate();

  const { relatorios, relatoriosCount } = useRelatorioContext();
  const { direction } = usePaginatorContext();

  function handleViewRelatorio(id) {
    navigate(`${Links.RELATORIOS}/${id}`);
  }

  return relatorios.length !== 0 ? (
    <>
      <Search placeholder="Filtre por data!" />
      <StyledCaption>Relatórios diários</StyledCaption>
      <RelatoriesContainer>
        {relatorios.map((relatorio) => {
          const date = new Date(`${relatorio.data}T00:00:00-03:00`);
          return (
            <RelatoryCard direction={direction}>
              <RelatoryCardNumber>
                {date.toLocaleDateString("pt-BR", {
                  timeZone: "America/Recife", // Especifica o fuso horário
                })}
              </RelatoryCardNumber>
              <RelatoryCardItem>
                <div>Total de fichas:</div>
                {relatorio && (
                  <RelatoryCardValue>
                    {relatorio.total_pessoas}
                  </RelatoryCardValue>
                )}
              </RelatoryCardItem>
              <ActionContainer $opacity="1">
                <Button
                  onClick={() => handleViewRelatorio(relatorio.data)}
                  type="button"
                >
                  Visualizar Livro
                </Button>
              </ActionContainer>
            </RelatoryCard>
          );
        })}
        <Paginator totalItems={relatoriosCount} />
      </RelatoriesContainer>
    </>
  ) : (
    <Loading />
  );
}
