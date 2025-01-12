import { createContext, useEffect, useState } from "react";
import { apiPath } from "@/context/Links";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(null);
  const [isAuth, setIsAuth] = useState(access ? true : false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (access) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [access]);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, access, setAccess, userName, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
