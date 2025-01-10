import Container from "@/components/Container";
import Table from "@/components/Table";
import useFichaContext from "@/hooks/useFichaContext";
import mapperTheaders from "@/Middlewares/mapperTheaders";
import { useEffect, useMemo, useState } from "react";
import { removeFields } from "@/Middlewares/filterFields";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import { useParams } from "react-router-dom";
import useMessageContext from "@/hooks/useMessageContext";
import Message from "@/components/Message";
import useTriggerContext from "@/hooks/useTriggerContext";
import Loading from "@/components/Loader";
import Search from "@/components/Search";

export default function People({ isForSelection = false }) {
  const { updatedTrigger, activateTrigger } = useTriggerContext();
  const { id } = useParams();
  const { setPerPage, perPage } = usePaginatorContext();
  const { fetchAllPessoas, loading, setLoading } = useFichaContext();
  const { messageContent, setMessageContent, setTypeMessage } =
    useMessageContext();
  const [pessoas, setPessoas] = useState([]);
  const [totalPessoas, setTotalPessoas] = useState(0);

  // Estados de pesquisa (filtro)
  const [searchValue, setSearchValue] = useState(null);

  // Busque as pessoas
  useEffect(() => {
    async function getAllPessoas() {
      const nameFilter = searchValue ? `Nome=${searchValue}` : "";
      setLoading(true);
      const [response, count] = isForSelection
        ? await fetchAllPessoas(`${nameFilter}&isUnderInvestigation=0`)
        : await fetchAllPessoas(`${nameFilter}`);

      if (nameFilter && count == 0) {
        setMessageContent(
          "Nenhuma pessoa encontrada pela pesquisa; tente novamente."
        );
        setTypeMessage("error");
        return;
      }
      setTotalPessoas(count);
      setPessoas(response);
      setLoading(false);
    }
    getAllPessoas();
  }, [perPage, updatedTrigger]);

  // Filtra `fichas` somente quando eles mudarem
  const filteredPessoas = useMemo(() => {
    const fieldsToRemove = [
      "Status",
      "DocType",
      "NdaFicha",
      "isUnderInvestigation",
    ];
    if (pessoas.length > 0)
      return pessoas.map((pessoa) => removeFields(pessoa, fieldsToRemove));
    else return [];
  }, [pessoas, updatedTrigger]);

  useEffect(() => {
    // Resetar perPage ao valor padrão sempre que a rota mudar
    setPerPage(10);
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  const handleSearch = () => {
    activateTrigger();
  };

  return (
    filteredPessoas.length > 0 &&
    totalPessoas > 0 && (
      <Container>
        <Search
          placeholder="Pesquise por nome"
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          onSubmit={handleSearch}
        />
        {messageContent && <Message />}
        <Table
          isForSelection={isForSelection}
          caption={"Pessoas Registradas"}
          query={filteredPessoas}
          count={totalPessoas}
          headerMiddleware={mapperTheaders}
          hooks={useFichaContext}
        />
      </Container>
    )
  );
}
