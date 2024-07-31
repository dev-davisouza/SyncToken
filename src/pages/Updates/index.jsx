import {
  UpdateContainer,
  MainTitle,
  Subtitle,
  UpdateLink,
  Note,
  NoteHeader,
  NoteBody,
  VersionsContainer,
} from "./styles";

export default function Updates() {
  return (
    <UpdateContainer>
      <MainTitle>Versões do SyncToken</MainTitle>
      <Subtitle>
        O histórico com todos os lançamentos do SyncToken está disponível no{" "}
        <UpdateLink href="">GitHub</UpdateLink>. A documentação mais recente
        pode ser encontrada abaixo.
      </Subtitle>
      <Note>
        <NoteHeader>Nota</NoteHeader>
        <NoteBody>
          Esses documentos valem para todas as possíveis versões posteriores do
          SyncToken!
        </NoteBody>
      </Note>
      <VersionsContainer>
        <h3>1.0 (Lançamento)</h3>
      </VersionsContainer>
    </UpdateContainer>
  );
}
