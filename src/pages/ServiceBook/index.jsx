import TokenForm from "@/components/TokenForm";
import Container from "@/components/Container";
import { useNavigate } from "react-router-dom";
import { Links } from "@/context/Links";

export default function ServiceBook() {
  const navigate = useNavigate();

  function handleSubmit(data, id) {
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5000/fichas/${id}`
      : "http://localhost:5000/fichas";

    fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate(Links.HOME);
      });
  }

  return (
    <Container>
      <TokenForm handleSubmit={handleSubmit} />
    </Container>
  );
}
