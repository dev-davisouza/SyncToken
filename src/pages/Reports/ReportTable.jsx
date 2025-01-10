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
import Filter from "./Filter";
import { useEffect, useState } from "react";

export default function ReportTable({}) {
  const navigate = useNavigate();

  const { relatorios } = useRelatorioContext();
  const [filteredRelatorios, setFilteredRelatorios] = useState([]);
  const [filteredRelatoriosCount, setFilteredRelatoriosCount] = useState(0);

  useEffect(() => {
    if (relatorios.length > 0 && filteredRelatorios.length <= 0) {
      setFilteredRelatorios(relatorios);
    }
  }, [relatorios]);

  const { direction, perPage } = usePaginatorContext();

  function handleViewRelatorio(id) {
    navigate(`${Links.RELATORIOS}/${id}`);
  }

  return filteredRelatorios.length !== 0 ? (
    <>
      {/* The Filter */}
      <Filter
        setFilteredRelatorios={setFilteredRelatorios}
        perPage={perPage}
        setFilteredRelatoriosCount={setFilteredRelatoriosCount}
      />
      <StyledCaption>Relatórios diários</StyledCaption>
      <RelatoriesContainer>
        {filteredRelatorios.map((relatorio) => {
          const date = new Date(`${relatorio.data}T00:00:00-03:00`);
          return (
            <RelatoryCard key={date} direction={direction}>
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
        <Paginator totalItems={filteredRelatoriosCount} />
      </RelatoriesContainer>
    </>
  ) : (
    <Loading />
  );
}
