import Container from "@/components/Container";
import Loading from "@/components/Loader";
import Table from "@/components/Table";
import { fieldsListNotEditable } from "@/constants/fieldsList";
import localeDateFormatter from "@/constants/localeDateFormatter";
import FichaTableData, {
  FichaTableDataPrevReturn,
} from "@/constants/tableData";
import Message from "@/context/SocketContext/FlashMessage";
import useFetchContext from "@/hooks/useFetchContext";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import useSocketContext from "@/hooks/useSocketContext";
import IRelatorio from "@/interfaces/IRelatorios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReportDetail() {
  const { fetchRelatorioByDate } = useFetchContext();
  const { flashMessages } = useSocketContext();
  const { id } = useParams();
  const [pessoas, setPessoas] = useState<FichaTableDataPrevReturn[]>([]);
  const [count, setCount] = useState(0);
  const { perPage } = usePaginatorContext();

  useEffect(() => {
    async function loadPessoas() {
      try {
        const { pessoas: pessoasFetched, total_pessoas } =
          (await fetchRelatorioByDate(id as string, perPage)) as IRelatorio;
        setPessoas(
          FichaTableData({
            pessoasAll: pessoasFetched,
            anyOtherFieldstoRemove: fieldsListNotEditable,
          })
        );
        setCount(total_pessoas);
      } catch (error) {
        console.error("Erro ao carregar as fichas:", error);
      }
    }
    loadPessoas();
  }, [id, perPage, fetchRelatorioByDate]);

  return count ? (
    <Container>
      {flashMessages.length > 0 && <Message />}
      <Table
        caption={`Relatório ${localeDateFormatter(id as string)}`}
        query={pessoas}
        count={count}
        isForSelection={false}
      />
    </Container>
  ) : (
    <Loading />
  );
}
