// src/pages/Reports/index.tsx

import Container from "@/components/Container";
import Message from "@/context/SocketContext/FlashMessage";
import useSocketContext from "@/hooks/useSocketContext";
import Loading from "@/components/Loader";
import useFetchContext from "@/hooks/useFetchContext";
import ReportTable from "./reportTable";
import { useState } from "react";
import Filter from "@/pages/Reports/Filter";
import IRelatorio from "@/interfaces/IRelatorios";

export default function Reports() {
  const { flashMessages } = useSocketContext();
  const { relatorios, relatoriosCount } = useFetchContext();
  const [filteredRelatorios, setFilteredRelatorios] = useState<IRelatorio[]>(
    []
  );
  const [filteredRelatoriosCount, setFilteredRelatoriosCount] = useState(0);

  return relatorios.length > 0 ? (
    <Container>
      {flashMessages.length > 0 && <Message />}
      {/* The Filter */}
      <Filter
        setFilteredRelatorios={setFilteredRelatorios}
        setFilteredRelatoriosCount={setFilteredRelatoriosCount}
      />
      <ReportTable
        relatorios={
          filteredRelatorios.length > 0 ? filteredRelatorios : relatorios
        }
        relatoriosCount={
          filteredRelatorios.length > 0
            ? filteredRelatoriosCount
            : relatoriosCount
        }
      />
    </Container>
  ) : (
    <Loading />
  );
}
