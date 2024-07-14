import TokenForm from "@/components/TokenForm";
import Container from "@/components/Container";
import { useNavigate } from "react-router-dom";
import { Links } from "@/context/Links";
import apiPath from "@/context/Api";

export default function ServiceBook() {
  const navigate = useNavigate();

  function handleSubmit(data, id) {
    const method = id ? "PATCH" : "POST";
    const url = id
      ? `${apiPath}/pessoas-all/${id}/`
      : `${apiPath}/pessoas-all/`;

    fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => {
        const message =
          method === "PATCH"
            ? "Ficha editada com sucesso!"
            : "Pessoa adicionada com sucesso!";

        navigate(Links.HOME, { state: { message } });
      });
  }

  return (
    <Container>
      <TokenForm handleSubmit={handleSubmit} />
    </Container>
  );
}
