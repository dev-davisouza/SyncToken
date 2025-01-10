import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import fetchAuth from "./fetchAuth";

export default function useAuthContext() {
  const { isAuth, setIsAuth, access, setAccess } = useContext(AuthContext);

  return {
    isAuth,
    setIsAuth,
    access,
    setAccess,
    /* fetchAuth: async (
      domain,
      path = "",
      params = "",
      query = "",
      method = "GET",
      body
    ) => fetchAuth(domain, path, params, query, method, body, access), */
  };
}

/* AGORA SÓ TESTAR O CONTEXT AUTH */
