// import { createContext, useState } from "react";

export const Links = {
  HOME: "/",
  CRIAR_FICHA: "/criar-ficha",
  RELATORIOS: "/relatorios",
  ALL_PESSOAS: "/pessoas",
  AUTH: "/auth",
  UPDATES: "/notas-de-atualizacoes",
  BENEFITS: "/gestao-de-beneficios",
};

export type LinksType = (typeof Links)[keyof typeof Links];

export const apiPath = import.meta.env.VITE_API_URL;
export const wsPath = import.meta.env.VITE_WS_URL;
