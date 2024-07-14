import { ActionContainer, StyledCaption } from "@/components/QueueTable/styles";
import SubmitButton from "@/components/SubmitButton";
import { useRelatorios } from "./getters";
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

export default function ReportTable() {
  const navigate = useNavigate();
  const relatorios = useRelatorios();

  function handleViewRelatorio(id) {
    navigate(`${Links.RELATORIOS}/${id}`);
  }

  return relatorios.length !== 0 ? (
    <>
      <Search placeholder="Filte por data!" />
      <StyledCaption>Relatórios diários</StyledCaption>
      <RelatoriesContainer>
        {relatorios.map((relatorio) => (
          <RelatoryCard>
            <RelatoryCardNumber>{relatorio.data}</RelatoryCardNumber>
            <RelatoryCardItem>
              <div>Total de fichas:</div>
              {relatorio.pessoas && (
                <RelatoryCardValue>
                  {relatorio.pessoas.length}
                </RelatoryCardValue>
              )}
            </RelatoryCardItem>
            <ActionContainer $opacity="1">
              <SubmitButton
                onClick={() => handleViewRelatorio(relatorio.data)}
                type="button"
              >
                Vizualizar Livro
              </SubmitButton>
            </ActionContainer>
          </RelatoryCard>
        ))}
      </RelatoriesContainer>
    </>
  ) : (
    <Loading />
  );
}
