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
  AppliedFiltersContainer,
  FiltersList,
  FilterItem,
} from "./style";
import { FaFilter } from "react-icons/fa";
import Modal from "@/components/Modal";
import useRelatorioContext from "@/hooks/useRelatorioContext";

export default function Filter({
  setFilteredRelatorios,
  perPage,
  setFilteredRelatoriosCount,
}) {
  const [active, setActive] = useState(false);
  const [periods, setPeriods] = useState([]);
  const { fetchPeriods, fetchRelatoriosWithFilter } = useRelatorioContext();

  const handleActive = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    async function fetchPeriodsList() {
      const dates = await fetchPeriods();
      setPeriods(dates);
    }
    fetchPeriodsList();
  }, []);

  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelection = (date) => {
    setSelectedDates((prev) => {
      if (prev.includes(date)) {
        return prev.filter((d) => d !== date);
      } else {
        return [...prev, date];
      }
    });
  };

  // FIltrando os relatórios
  const handleFilter = async (filter = []) => {
    const query = { data: filter };
    async function fetchRelatorios() {
      const [count, results] = await fetchRelatoriosWithFilter(query, perPage);
      setFilteredRelatoriosCount(count);
      setFilteredRelatorios(results);
    }
    await fetchRelatorios();
  };

  useEffect(() => {
    async function triggerFilter() {
      await handleFilter(selectedDates);
    }
    triggerFilter();
  }, [perPage]);

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

      {/* Quadro com os filtros aplicados 
      {selectedDates.length > 0 && (
        <AppliedFiltersContainer>
          <span>Filtros aplicados:</span>
          <FiltersList>
            {selectedDates.map((date, index) => (
              <FilterItem key={index}>{date}</FilterItem>
            ))}
          </FiltersList>
        </AppliedFiltersContainer>
      )}*/}

      {active && (
        <Modal
          buttonColor="#6278f2"
          open={active && "open"}
          onClose={() => handleActive()}
          bodyContent={
            <Content>
              <ContentTitle>Selecione o período</ContentTitle>
              <List>
                {periods.map((date) => (
                  <ListItem key={date}>
                    <LabelCheckbox>
                      <Checkbox
                        checked={selectedDates.includes(date)}
                        onChange={() => handleDateSelection(date)}
                      />
                      {date}
                    </LabelCheckbox>
                  </ListItem>
                ))}
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
