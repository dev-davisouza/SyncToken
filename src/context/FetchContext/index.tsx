// src/context/FetchContext/index.tsx

import { createContext } from "react";
import { FetchContextType } from "./types";

const FetchContext = createContext<FetchContextType | undefined>(undefined);
FetchContext.displayName = "FetchContext";

export default FetchContext;

/* CADÊ ESSE DOM QUE NÃO TA ATUALIZANDO AÊ PAEZAO */
