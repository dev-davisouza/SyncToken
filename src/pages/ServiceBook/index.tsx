// src/pages/ServiceBook/index.tsx

import Container from "@/components/Container";
import Form from "@/components/Form";
import useFormConfig from "./config/formConfig";
import useDocType from "./hook/useDocType";
import { handleSubmit } from "./handlers/handleSubmit";
import useFormContext from "@/hooks/useFormContext";
import { useNavigate, useParams } from "react-router-dom";
import handleValueOfNISCPF from "./handlers/handleValueOfNISCPF";
import handleLabel from "./handlers/handleLabel";
import handleDisabled from "./handlers/handleDisabled";
import useSocketContext from "@/hooks/useSocketContext";
import Message from "@/context/SocketContext/FlashMessage";
import HandleFocus from "./handlers/handleFocus";
import { useEffect } from "react";
import handleFormData from "./handlers/handleFormData";
// import { IServiceBook } from "./type";

export default function ServiceBook() {
  const { formData, setFormData } = useFormContext();
  const { flashMessages } = useSocketContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { textFields, selectFields } = useFormConfig();
  const { docType, setDocType } = useDocType();

  useEffect(() => {
    handleFormData({ formData, setFormData, id, navigate });
  }, [formData, setFormData, id, navigate]);

  return (
    <Container>
      {flashMessages.length > 0 && <Message />}
      <Form
        legend="Livro de atendimento"
        textSubmit="Submeter"
        handleSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ formData, navigate, setFormData, param: id });
        }}
        textFields={textFields}
        selectFields={selectFields}
        order={["DocType"]}
        handleValue={(name, value) =>
          handleValueOfNISCPF(name, value, docType, setDocType)
        }
        handleDisabled={handleDisabled}
        handleLabel={handleLabel}
        handleFocus={HandleFocus}
      />
    </Container>
  );
}
