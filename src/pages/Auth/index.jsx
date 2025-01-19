import Container from "@/components/Container";
import Form from "@/components/Form";
import Message from "@/components/Message";
import { apiPath, Links } from "@/context/Links";
import useAuthContext from "@/hooks/useAuthContext";
import useFormContext from "@/hooks/useFormContext";
import useMessageContext from "@/hooks/useMessageContext";
import hash from "@/utils/hash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { messageContent, setMessageContent, setTypeMessage } =
    useMessageContext();
  const navigate = useNavigate();
  const { formData, setFormData } = useFormContext();
  const { setAccess, isAuth, setUserName } = useAuthContext();

  useEffect(() => {
    if (isAuth) {
      navigate(Links.HOME);
    }
  }, []);
  const handleSubmit = async () => {
    const { user, password } = formData;

    try {
      const response = await fetch(`${apiPath}/login/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: hash(password),
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (!json.access) {
          setAccess(null);
        } else {
          console.log(json.access);
          setAccess(`Bearer ${json.access}`);
          setUserName(user);
          navigate(Links.HOME);
          // Dando boas vindas ao usuário recém logado:
          setTypeMessage("info");
          setMessageContent(
            `Saudações ${user}! Aproveite a nova versão de SyncToken`
          );
        }
      } else {
        const json = await response.json();
        // Pega a mensagem de erro
        const msg = Object.values(json)[0].toString();

        setMessageContent(msg);
        setTypeMessage("error");

        const resetFormData = Object.keys(formData).reduce((acc, key) => {
          acc[key] = ""; // Define o valor de cada campo como uma string vazia
          return acc;
        }, {});

        setFormData(resetFormData);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      {messageContent && <Message />}
      <Form
        Legend="Login"
        textFields={["user", "password"]}
        selectFields={[]}
        textButton={"Autenticar"}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

// AGORA É SÓ FAZER O MALABARISMO APIEICO E GUARDAR A INFO EM SESSÃO
