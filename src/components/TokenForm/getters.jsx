import { useState, useEffect } from "react";
import { ServiceBookModel } from "@/context/Model";
import apiPath from "@/context/Api";

export function usePrioridades() {
  const [prioridades, setPrioridades] = useState([]);
  useEffect(() => {
    fetch(`${apiPath}/prioridades/`, {
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
    fetch(`${apiPath}/acoes/`, {
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

export function useDocTypes() {
  const [docTypes, setDocTypes] = useState([]);
  useEffect(() => {
    fetch(`${apiPath}/doctypes/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDocTypes(Object.values(data));
      })
      .catch((err) => console.error("Erro ao buscar status:", err));
  }, []);
  return docTypes;
}

export function usePessoas(id = "") {
  const [data, setData] = useState({ ServiceBookModel });
  useEffect(() => {
    if (id) {
      fetch(`${apiPath}/pessoas/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setData(data);
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`${apiPath}/pessoas/`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setData(data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);
  return data;
}

export function useStatusChoices() {
  const [statusChoices, setStatusChoices] = useState([]);
  useEffect(() => {
    fetch(`${apiPath}/status_choices/`, {
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
