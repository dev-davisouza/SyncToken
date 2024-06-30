import { useState, useEffect } from "react";

export function usePrioridades() {
  const [prioridades, setPrioridades] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/prioridades/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPrioridades(Object.values(data));
      })
      .catch((err) => console.error("Erro ao buscar prioridades:", err));
  }, []);
  return prioridades;
}

export function useAcoes() {
  const [acoes, setAcoes] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/acoes/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAcoes(Object.values(data));
      })
      .catch((err) => console.error("Erro ao buscar ações:", err));
  }, []);
  return acoes;
}

export function useStatusChoices() {
  const [statusChoices, setStatusChoices] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/status_choices/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setStatusChoices(Object.entries(data));
      })
      .catch((err) => console.error("Erro ao buscar status:", err));
  }, []);
  return statusChoices;
}
