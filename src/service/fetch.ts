// src/service/fetch.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPessoasFetch, QueryRowType } from "@/interfaces/recordTypes";
import { apiPath } from "@/context/Links";
import { IRelatoriosFetch } from "@/interfaces/IRelatorios";
import {
  IFetchAções,
  IFetchBenefitSituations,
  IFetchDocTypes,
  IFetchModel,
  IFetchStatusChoices,
  IStaticInfosResponse,
} from "@/interfaces/IStaticFetches";

type ResponseNotOKType = { status: number; message: string };

/** Type Guard */
export function isErrorResponse(response: any): response is ResponseNotOKType {
  return "status" in response && "message" in response;
}

export async function fetchData<T>(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  body?: QueryRowType | null,
  headers: HeadersInit = { "Content-Type": "application/json" }
): Promise<T | ResponseNotOKType> {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Pega o corpo da resposta do erro
      const resp = { status: response.status, message: errorDetails };
      console.log(resp);
      return resp;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Erro ao buscar dados de ${url}`, ": ", error);
    return { status: 500, message: "Erro interno ao buscar dados" };
  }
}

export default async function fetchAll(perPage: number) {
  try {
    const [pessoasAllResponse, fichasResponse, relatoriosResponse] =
      await Promise.all([
        fetchData<IPessoasFetch>(
          `${apiPath}/pessoas-all/?page_size=${perPage}`
        ),
        fetchData<IPessoasFetch>(`${apiPath}/pessoas/?page_size=${perPage}`),
        fetchData<IRelatoriosFetch>(
          `${apiPath}/relatorios/?page_size=${perPage}`
        ),
      ]);

    // Verifica se houve erro nas respostas antes de acessar as propriedades
    if (
      isErrorResponse(pessoasAllResponse) ||
      isErrorResponse(fichasResponse) ||
      isErrorResponse(relatoriosResponse)
    ) {
      console.error("Erro ao buscar dados:", {
        pessoasAllResponse,
        fichasResponse,
        relatoriosResponse,
      });
      return null;
    }

    return {
      pessoasAll: pessoasAllResponse.results ?? [],
      pessoasAllCount: pessoasAllResponse.count ?? 0,
      //
      fichas: fichasResponse.results ?? [],
      fichasCount: fichasResponse.count ?? 0,
      //
      relatorios: relatoriosResponse.results ?? [],
      relatoriosCount: relatoriosResponse.count ?? 0,
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null; // Ou outro valor padrão
  }
}

export async function fetchStaticInfos(): Promise<IStaticInfosResponse | null> {
  try {
    const [
      açõesResponse,
      statusChoicesResponse,
      docTypesResponse,
      modelResponse,
      periodsResponse,
      benefitSituationsResponse,
    ] = await Promise.all([
      fetchData<IFetchAções>(`${apiPath}/acoes/`),
      fetchData<IFetchStatusChoices>(`${apiPath}/status_choices/`),
      fetchData<IFetchDocTypes>(`${apiPath}/doctypes/`),
      fetchData<IFetchModel>(`${apiPath}/model/`),
      fetchData<string[]>(`${apiPath}/periods/`),
      fetchData<IFetchBenefitSituations>(`${apiPath}/benefit_situations/`),
    ]);

    if (
      isErrorResponse(açõesResponse) ||
      isErrorResponse(statusChoicesResponse) ||
      isErrorResponse(docTypesResponse) ||
      isErrorResponse(modelResponse) ||
      isErrorResponse(periodsResponse) ||
      isErrorResponse(benefitSituationsResponse)
    ) {
      console.error("Erro ao buscar dados estáticos:", {
        açõesResponse,
        statusChoicesResponse,
        docTypesResponse,
        modelResponse,
        periodsResponse,
        benefitSituationsResponse,
      });
      return null;
    } else {
      return {
        actions: açõesResponse,
        statusChoices: statusChoicesResponse,
        docTypes: docTypesResponse,
        model: modelResponse,
        periods: periodsResponse,
        benefitSituations: benefitSituationsResponse,
      };
    }
  } catch (error) {
    console.error("Erro ao buscar dados estáticos:", error);
    return null;
  }
}
