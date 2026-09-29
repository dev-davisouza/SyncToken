import { fetchData, isErrorResponse } from "@/service/fetch";
import { IFicha, IPessoasFetch, QueryRowType } from "@/interfaces/recordTypes";
import { apiPath } from "@/context/Links";
import IRelatorio, { IRelatoriosFetch } from "@/interfaces/IRelatorios";

export const fetchPessoas = async (filterFetchAll: string, perPage = 10) => {
  const url = `${apiPath}/pessoas-all/?page_size=${perPage}${
    filterFetchAll ? `&${filterFetchAll}` : ""
  }`;
  const response = await fetchData<IPessoasFetch>(url);
  return !isErrorResponse(response)
    ? {
        count: response?.count,
        results: response?.results,
      }
    : null; // RETORNANDO NULL A PRINCIPIO SEM FAZER O HANDLE DO ERROR
};

export const fetchPessoa = async (NIS_CPF: string) => {
  const response = await fetchData<IFicha>(
    `${apiPath}/pessoas-all/${NIS_CPF}/`
  );
  return !isErrorResponse(response) ? response : null;
};

export const deletePessoa = async (NIS_CPF: string) => {
  const response = await fetchData<IFicha>(
    `${apiPath}/pessoas-all/${NIS_CPF}/`,
    "DELETE"
  );
  return !isErrorResponse(response) ? response : null;
};

export const editFicha = async (
  NIS_CPF: string,
  dataToChange: QueryRowType
) => {
  const response = await fetchData<IFicha>(
    `${apiPath}/pessoas-all/${NIS_CPF}/`,
    "PATCH",
    dataToChange
  );
  if (!response) throw new Error("Resposta não foi obtida com sucesso!");
};

export const fetchRelatorioByDate = async (date: string, perPage = 10) => {
  const response = await fetchData<IRelatorio>(
    `${apiPath}/relatorios/${date}/?pessoas_page_size=${perPage}`
  );

  return !isErrorResponse(response)
    ? {
        data: response?.data,
        total_pessoas: response?.total_pessoas,
        pessoas: response?.pessoas,
      }
    : null;
};

export const fetchRelatoriosWithFilter = async (
  periods: Record<string, string | string[]>,
  perPage = 10
) => {
  // Serializa o objeto `filter` em uma query string

  const queryString = new URLSearchParams(
    periods as unknown as string[][]
  ).toString();
  console.log(queryString);
  const response = await fetchData<IRelatoriosFetch>(
    `${apiPath}/relatorios/?page_size=${perPage}&${queryString}/`
  );
  return !isErrorResponse(response)
    ? {
        count: response.count,
        results: response.results,
      }
    : null;
};
