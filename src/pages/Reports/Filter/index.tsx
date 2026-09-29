// src/pages/Reports/Filter/index.tsx

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  StyledContainer,
  FilterButton,
  Content,
  ListItem,
  LabelCheckbox,
  Checkbox,
  List,
  ContentTitle,
  /* AppliedFiltersContainer,
  FiltersList,
  FilterItem, */
} from "./style";
import { FaFilter } from "react-icons/fa";
import Modal from "@/components/Modal";
import useFetchContext from "@/hooks/useFetchContext";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import IRelatorio from "@/interfaces/IRelatorios";

interface FilterProps {
  setFilteredRelatorios: React.Dispatch<React.SetStateAction<IRelatorio[]>>;
  setFilteredRelatoriosCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Filter({
  setFilteredRelatorios,
  setFilteredRelatoriosCount,
}: FilterProps) {
  const [active, setActive] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const { periods, fetchRelatoriosWithFilter } = useFetchContext();
  const { perPage } = usePaginatorContext();

  const handleActive = () => {
    setActive((prev) => !prev);
  };

  const handleDateSelection = (date: string) => {
    setSelectedDates((prev) => {
      if (prev.includes(date)) {
        return prev.filter((d) => d !== date);
      } else {
        return [...prev, date];
      }
    });
  };

  // FIltrando os relatórios
  const handleFilter = async (filter: string[]) => {
    const query = { data: filter };
    async function fetchRelatorios() {
      const response = await fetchRelatoriosWithFilter(query, perPage);
      if (response) {
        setFilteredRelatoriosCount(response.count);
        setFilteredRelatorios(response.results);
      }
    }
    await fetchRelatorios();
  };

  useEffect(() => {
    if (selectedDates.length > 0) {
      handleFilter(selectedDates);
    } else {
      // Se não houver filtro, resetar a lista
      setFilteredRelatorios([]);
      setFilteredRelatoriosCount(0);
    }
  }, [perPage, selectedDates]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <StyledContainer>
          <span>Filtre por data!</span>
          <FilterButton
            onClick={() => handleActive()}
            className={active ? "active" : ""}
          >
            <FaFilter />
          </FilterButton>
        </StyledContainer>
      </div>

      {active && (
        <Modal
          $buttonColor="#6278f2"
          open={active && true}
          onClose={() => handleActive()}
          bodyContent={
            <Content>
              <ContentTitle>Selecione o período</ContentTitle>
              <List>
                {periods &&
                  periods.map((date) => {
                    return (
                      <ListItem key={date}>
                        <LabelCheckbox>
                          <Checkbox
                            checked={selectedDates.includes(date)}
                            onChange={() => handleDateSelection(date)}
                          />
                          {date}
                        </LabelCheckbox>
                      </ListItem>
                    );
                  })}
              </List>
            </Content>
          }
          onConfirm={async () => {
            handleActive();
            await handleFilter(selectedDates);
          }}
          textButton="Aplicar Filtro"
        />
      )}
    </>
  );
}
