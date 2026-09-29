// src/pages/People/index.tsx

/* eslint-disable react-hooks/exhaustive-deps */
import Container from "@/components/Container";
import Table from "@/components/Table";
import { useEffect, useState } from "react";
import Message from "@/context/SocketContext/FlashMessage";
import useSocketContext from "@/hooks/useSocketContext";
import useFetchContext from "@/hooks/useFetchContext";
import FichaTableData from "@/constants/tableData";
import { fieldsListNotEditable } from "@/constants/fieldsList";
import Search from "@/components/Search";
import { IFicha, QueryRowType } from "@/interfaces/recordTypes";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import { PeopleProps } from "./type";
import Loading from "@/components/Loader";
import { PeopleCard } from "@/pages/Benefits/handlers/handlePeopleQuery";
import {
  SelectionHeader,
  SelectionCounter,
  StyledCheckbox,
} from "@/pages/Benefits/components/style";
import usePeopleSelectorContext from "@/hooks/usePeopleSelectorContext";

export default function People({ isForSelection, handleQuery }: PeopleProps) {
  const { flashMessages } = useSocketContext();
  const { searchPeople, pessoasAll, pessoasAllCount } = useFetchContext();
  const { perPage } = usePaginatorContext();
  const { selectedPeople, setSelectedPeople } = usePeopleSelectorContext();

  const [peopleFoundCount, setPeopleFoundCount] = useState<number>(0);
  const [peopleFound, setPeopleFound] = useState<null | IFicha[]>(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    if (searchValue.trim()) {
      const searchedPeople = isForSelection
        ? await searchPeople(searchValue, perPage, "isUnderInvestigation=0")
        : await searchPeople(searchValue, perPage);

      if (searchedPeople) {
        setPeopleFoundCount(searchedPeople.count);
        setPeopleFound(searchedPeople.results);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [perPage]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  /* Lista efetivamente renderizada (busca ou todos) */
  const queryData = peopleFound
    ? FichaTableData({
        pessoasAll: peopleFound,
        anyOtherFieldstoRemove: fieldsListNotEditable,
      })
    : FichaTableData({
        pessoasAll: pessoasAll,
        anyOtherFieldstoRemove: fieldsListNotEditable,
      });

  const allIdsOnPage = queryData.map((p) => String(p["NIS/CPF"]));
  const allSelectedOnPage =
    allIdsOnPage.length > 0 &&
    allIdsOnPage.every((id) => selectedPeople.includes(id));

  const toggleSelectAllOnPage = () => {
    if (allSelectedOnPage) {
      setSelectedPeople((prev) =>
        prev.filter((id) => !allIdsOnPage.includes(id)),
      );
    } else {
      setSelectedPeople((prev) => {
        const set = new Set([...prev, ...allIdsOnPage]);
        return Array.from(set);
      });
    }
  };

  return (
    pessoasAllCount > 0 && (
      <Container>
        <Search
          placeholder="Pesquise por nome"
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          onSubmit={handleSearch}
        />
        {flashMessages.length > 0 && <Message />}

        {/* Barra de seleção — só no modo seleção */}
        {isForSelection && (
          <SelectionHeader>
            <SelectionCounter>
              <b>{selectedPeople.length}</b>{" "}
              {selectedPeople.length === 1
                ? "pessoa selecionada"
                : "pessoas selecionadas"}
            </SelectionCounter>

            <SelectAllLabelRow
              allSelected={allSelectedOnPage}
              onToggle={toggleSelectAllOnPage}
            />
          </SelectionHeader>
        )}

        <Table
          {...(isForSelection
            ? { isForSelection: true, handleQuery }
            : { isForSelection: false })}
          caption={"Pessoas Registradas"}
          query={queryData}
          count={peopleFoundCount ? peopleFoundCount : pessoasAllCount}
          extraHeader={
            isForSelection ? (
              <StyledCheckbox
                checked={allSelectedOnPage}
                onChange={toggleSelectAllOnPage}
                aria-label="Selecionar todos desta página"
              />
            ) : undefined
          }
          renderCard={
            isForSelection
              ? (row, index) => (
                  <PeopleCard
                    key={String(row["NIS/CPF"])}
                    row={row as QueryRowType}
                    index={index}
                  />
                )
              : undefined
          }
        />
      </Container>
    )
  );
}

/* Bloco auxiliar só para o "Selecionar todos" com label */
import { SelectAllLabel } from "@/pages/Benefits/components/style";

function SelectAllLabelRow({
  allSelected,
  onToggle,
}: {
  allSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <SelectAllLabel>
      <StyledCheckbox checked={allSelected} onChange={onToggle} />
      Selecionar todos desta página
    </SelectAllLabel>
  );
}
