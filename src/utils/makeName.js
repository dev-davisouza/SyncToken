export default async function fetchNome() {
  const nome = await fetch("http://localhost:5000/nome/aleatorio")
    .then((resp) => resp.json())
    .then((data) => {
      // Extrair primeiro par chave-valor
      // eslint-disable-next-line no-unused-vars
      return data;
    });

  return nome;
}
