import { Input } from "@/components/Field";
import Container from "@/components/Container";
import SubmitButton from "@/components/SubmitButton";
import Message from "@/components/Message";
import { Links } from "@/context/Links";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const apiPath = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login(user, password); // Chame a função de login do contexto
      navigate(Links.HOME, {
        state: { message: "Login executado com sucesso!" },
      });
    } catch (error) {
      setMessage("Login failed!");
    }
  }

  return (
    <Container>
      {message && <Message type="error" msg={message} />}
      <form onSubmit={handleSubmit}>
        <Input
          name="user"
          type="text"
          placeholder="Seu usuário de acesso"
          label="Usuário:"
          note="Somente usuários criados pelo administrador podem entrar!"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <Input
          name="password"
          type="password"
          placeholder="Seu senha de acesso"
          label="Senha:"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <SubmitButton type="submit">Login</SubmitButton>
      </form>
    </Container>
  );
}
