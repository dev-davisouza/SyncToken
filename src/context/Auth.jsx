import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Links } from "./Links";

const AuthContext = createContext();

const apiPath = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    if (userToken) {
      setUser(true); // Simplificação para a lógica de estado do usuário
    }
  }, []);

  const login = async (username, password) => {
    const response = await fetch(`${apiPath}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setUser(true);
      navigate(Links.HOME);
      window.location.reload(); // Redireciona para a página inicial após o login
    } else {
      throw new Error(data.detail);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
