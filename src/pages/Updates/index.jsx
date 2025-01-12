import {
  UpdateContainer,
  MainTitle,
  Subtitle,
  UpdateLink,
  Note,
  NoteHeader,
  NoteBody,
  RepositoryContainer,
} from "./styles";

export default function Updates() {
  return (
    <UpdateContainer>
      <MainTitle>Versões do SyncToken</MainTitle>
      <Subtitle>
        O histórico com todos os lançamentos do SyncToken está disponível no{" "}
        <UpdateLink
          target="_blank"
          href="https://github.com/dev-davisouza/SyncToken"
        >
          GitHub
        </UpdateLink>
        . A documentação mais recente pode ser encontrada abaixo.
      </Subtitle>
      <RepositoryContainer>
        {/* Card gerado pelo GitHub Readme Stats */}
        <a href="https://github.com/dev-davisouza/SyncToken" target="_blank">
          <img
            src="https://github-readme-stats.vercel.app/api/pin/?username=dev-davisouza&repo=SyncToken"
            alt="SyncToken GitHub Repo"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              maxWidth: "100%",
              marginBottom: "2rem",
            }}
          />
        </a>
      </RepositoryContainer>
      <Note>
        <NoteHeader>Nota</NoteHeader>
        <NoteBody>
          Esses documentos valem para todas as possíveis versões posteriores do
          SyncToken!
        </NoteBody>
      </Note>
    </UpdateContainer>
  );
}
