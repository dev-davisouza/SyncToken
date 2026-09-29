// src/pages/Queue/index.tsx

import Container from "@/components/Container";
import Loading from "@/components/Loader";
import Table from "@/components/Table";
import useFetchContext from "@/hooks/useFetchContext";
import { useEffect, useState } from "react";
import { HandleQuery, QueueCard } from "./handleQuery";
import { ColorCaption } from "@/components/MiniBall";
import Message from "@/context/SocketContext/FlashMessage";
import useSocketContext from "@/hooks/useSocketContext";
import FichaTableData, {
  FichaTableDataPrevReturn,
} from "@/constants/tableData";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import { fieldsListEditable } from "@/constants/fieldsList";
import { useQueueActions } from "./useQueueActions";
import { QueryRowType } from "@/interfaces/recordTypes";
import Modal from "@/components/Modal";

export default function Queue() {
  const { pessoasAll, pessoasAllCount } = useFetchContext();
  const { flashMessages } = useSocketContext();
  const { perPage } = usePaginatorContext();

  const queueActions = useQueueActions();

  const [data, setData] = useState<FichaTableDataPrevReturn[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pessoasAll.length > 0) {
      setData(
        FichaTableData({
          pessoasAll,
          anyOtherFieldstoRemove: fieldsListEditable,
        }),
      );
    }
    setLoading(false);
  }, [perPage, pessoasAll]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return data && pessoasAllCount ? (
    <Container>
      {flashMessages.length > 0 && <Message />}
      <ColorCaption />
      <Table
        caption="Fila das Fichas"
        query={data}
        handleQuery={(q) => HandleQuery(q as QueryRowType[], queueActions)}
        // 👇 agora o index é passado como prop — não reinicia mais em #1
        renderCard={(row, index) => (
          <QueueCard
            key={String(row["NIS/CPF"])}
            row={row}
            index={index}
            actions={queueActions}
          />
        )}
        count={pessoasAllCount}
        isForSelection={false}
      />

      <Modal
        open={queueActions.isModalOpen}
        onClose={queueActions.handleCloseModal}
        onConfirm={queueActions.handleConfirmDelete}
        bodyContent="Tem certeza que deseja excluir este registro?"
        textButton="Excluir"
      />
    </Container>
  ) : (
    <Loading />
  );
}
