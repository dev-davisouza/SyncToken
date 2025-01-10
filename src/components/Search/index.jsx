import { SearchIcon, StyledContainer, StyledInputText } from "./style";
import { Note } from "../Field/style";

const Search = ({ placeholder, setSearchValue, searchValue, onSubmit }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "right",
        textAlign: "right",
      }}
    >
      <StyledContainer>
        <StyledInputText
          value={searchValue ? searchValue : ""}
          type="search"
          placeholder={placeholder}
          onKeyUp={handleKeyPress}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchIcon onClick={onSubmit} />
      </StyledContainer>
      <div style={{ margin: "15px 15px 0 0" }}>
        <Note>Nota: Somente pesquisa por nomes funcionam!</Note>
      </div>
    </div>
  );
};

export default Search;
