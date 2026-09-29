// src/components/Search/index.tsx

import { SearchIcon, StyledContainer, StyledInputText } from "./style";
import { Note } from "@/components/Field/style";

interface SearchProps {
  placeholder: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSubmit: () => void;
}

export default function Search({
  placeholder,
  searchValue,
  setSearchValue,
  onSubmit,
}: SearchProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Atualiza o valor da pesquisa mas sem realizar a pesquisa ainda
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
          onChange={handleInputChange}
        />
        <SearchIcon onClick={onSubmit} />
      </StyledContainer>
      <div style={{ margin: "15px 15px 0 0" }}>
        <Note>Nota: Somente pesquisa por nomes funcionam!</Note>
      </div>
    </div>
  );
}
