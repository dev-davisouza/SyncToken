import { createContext, useState } from "react";

export const Links = {
  HOME: "/",
  CRIAR_FICHA: "criar-ficha",
};

/*  
export const LinksContext = createContext();

export const LinksProvider = ({ children }) => {
  const [link, setLink] = useState([]);
  return (
    <LinksContext.Provider value={{ link, setLink }}>
      {children}
    </LinksContext.Provider>
  );
};
*/
