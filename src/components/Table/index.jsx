// Imports
import Paginator from "@/components/Paginator";
import { handleQuery } from "./handles/handleQuery";
import handleHeaders from "./handles/handleHeaders";
import { StyledCaption, StyledFlexContainer, StyledTable } from "./style";
import { Link, useNavigate } from "react-router-dom";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import handleMobile from "./handles/handleMobile";
import Loading from "@/components/Loader";
import { Links } from "@/context/Links";
import useAuthContext from "@/hooks/useAuthContext";

export default function Table({
  isForSelection,
  query,
  headerExtraEmptySpace = false,
  bodyExtraEmptySpace = false,
  count,
  caption,
  hooks = null,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { userName } = useAuthContext();

  const hook = {};
  if (hooks) {
    const { editFicha, getFicha, handleRemove, loading } = hooks(); // Desestruturar o contexto
    hook.editFicha = editFicha;
    hook.getFicha = getFicha;
    hook.handleRemove = handleRemove;
    hook.loading = loading;
  }

  // Modal handlers
  const handleOpenModal = (record) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecord(null);
  };

  const handleConfirmDelete = async () => {
    await hook.handleRemove(selectedRecord);
    handleCloseModal();
  };

  const navigate = useNavigate();
  const { direction } = usePaginatorContext();

  return !hook.loading ? (
    query.length > 0 ? (
      <>
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          bodyContent={`<b>${userName}</b>, Tem certeza que deseja excluir este registro?`}
          textButton="Excluir"
          html
        />
        <StyledCaption>{caption && caption}</StyledCaption>
        <StyledFlexContainer>
          {/* For Desktop */}
          <StyledTable>
            <thead>{handleHeaders(query, headerExtraEmptySpace)}</thead>
            <tbody>
              {hooks
                ? handleQuery(
                    isForSelection,
                    query,
                    bodyExtraEmptySpace,
                    handleOpenModal,
                    navigate,
                    direction,
                    hook.editFicha, // Passar funções e dados do contexto
                    hook.getFicha
                  )
                : handleQuery(
                    isForSelection,
                    query,
                    bodyExtraEmptySpace,
                    handleOpenModal,
                    navigate,
                    direction
                  )}
              <tr>
                <Paginator totalItems={count} />
              </tr>
            </tbody>
          </StyledTable>

          {/* For Mobile */}
          {handleMobile(query)}
        </StyledFlexContainer>
      </>
    ) : (
      <h3>
        Ainda não há fichas,{" "}
        <Link to={Links.CRIAR_FICHA}>
          <span style={{ color: "darkblue" }}>crie uma agora!</span>
        </Link>
      </h3>
    )
  ) : (
    <Loading />
  );
}
