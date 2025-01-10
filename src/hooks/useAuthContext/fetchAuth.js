export default async function fetchAuth(
  domain,
  path = "",
  params = "",
  query = "",
  method = "GET",
  body,
  access // Fornecido pelo próprio contexto
) {
  // Validação básica do domínio
  if (!domain) {
    throw new Error("Favor forneça 'domain' para executar o fetch");
  }

  const methods = ["PUT", "DELETE", "GET", "POST"];
  methods.forEach((met) => {
    if (!methods.includes(met)) {
      throw new Error("Método HTTP fornecido é inválido!");
    }
  });

  // Criação inicial da URL
  const url = new URL(domain);

  // Adiciona o caminho (path) se fornecido
  if (path) {
    url.pathname += `/${path}`;
  }

  // Adiciona parâmetros (params) ao caminho se fornecidos
  if (params) {
    url.pathname += `/${params}`;
  }

  // Adiciona query string (se fornecida) de forma segura
  if (query) {
    const queryParams = new URLSearchParams(query);
    url.search = queryParams.toString();
  }

  // Transforma a url final numa string como string
  const URL = url.toString();

  const response =
    method == "PUT" || "POST"
      ? await fetch(URL, {
          method: method,
          headers: {
            Authorization: access,
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...body }),
        })
      : "";
}
