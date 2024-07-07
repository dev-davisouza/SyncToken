import TokenForm from "@/components/TokenForm";
import Container from "@/components/Container";
import { useNavigate } from "react-router-dom";
import { Links } from "@/context/Links";

export default function ServiceBook() {
  const navigate = useNavigate();

  function handleSubmit(data, id) {
    const method = id ? "PATCH" : "POST";
    const url = id
      ? `http://127.0.0.1:8000/pessoas/${id}/`
      : "http://127.0.0.1:8000/pessoas/";

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
