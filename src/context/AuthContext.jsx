import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAccess, setUserAccess] = useState(
    localStorage.getItem("access_token") || ""
  );

  return (
    <AuthContext.Provider value={{ userAccess, setUserAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
