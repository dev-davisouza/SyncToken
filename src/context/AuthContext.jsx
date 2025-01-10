import { createContext, useEffect, useState } from "react";
import { apiPath } from "@/context/Links";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(
    () => sessionStorage.getItem("access_token") || null
  );
  const [isAuth, setIsAuth] = useState(access ? true : false);

  useEffect(() => {
    console.log(sessionStorage.getItem("access_token"));

    if (access) {
      setIsAuth(true);
      sessionStorage.setItem("access_token", access);
    } else {
      setIsAuth(false);
      sessionStorage.removeItem("access_token");
    }
  }, [access]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, access, setAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

/* AGORA PRECISA-SE MEXER NO HANDLE ERRORS
  NÃO PODE FICAR RETORNANDO ERRO 500 SÓ
  PQ O MANO ERROU A SENHA OU O USUÁRIO
*/
