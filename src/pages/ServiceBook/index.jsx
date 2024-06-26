import TokenForm from "@/components/TokenForm";
import Container from "@/components/Container";

export default function ServiceBook() {
  function createTokenPost(token) {
    fetch("http://localhost:5000/fichas", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <Container>
      <TokenForm handleSubmit={createTokenPost} />
    </Container>
  );
}
