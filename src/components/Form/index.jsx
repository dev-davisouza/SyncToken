/* 
  fields: [{name, type, onChange, label, required?, 
    placeholder, label, disabled?, readOnly, value, note}, ...]
  handleSubmit: () => {}
  Legend: text
*/
import { StyledLegend } from "./style";
import handleFields from "./handles/handleFields";
import Button from "@/components/Button";
import useFormContext from "@/hooks/useFormContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import usePessoa from "@/hooks/useFormContext/usePessoa";
import useMessageContext from "@/hooks/useMessageContext";
import useTriggerContext from "@/hooks/useTriggerContext";

export default function Form({
  Legend,
  textFields,
  selectFields,
  handleSubmit,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { formData, setFormData } = useFormContext();
  const { setMessageContent, setTypeMessage } = useMessageContext();
  const { activateTrigger } = useTriggerContext();

  const onSubmit = (e) => {
    e.preventDefault();
    // Remove pontos e hífens do campo NIS/CPF
    const cleanData = {
      ...formData,
      NIS_CPF: formData.NIS_CPF.replace(/\D/g, ""),
    };
    handleSubmit(
      cleanData,
      setFormData,
      id,
      navigate,
      activateTrigger,
      setMessageContent,
      setTypeMessage
    );
  };

  // Nunca declare um useEffect como async!
  useEffect(() => {
    // Define a função assíncrona dentro do useEffect
    async function fetchPessoa() {
      if (id) {
        await usePessoa(id, setFormData, navigate);
      }
    }
    // Chama a função
    fetchPessoa();

    // Limpa o formData quando o componente for desmontado ou a rota for alterada
    return () => {
      setFormData({});
    };
  }, [id, navigate]);

  // JSX return
  return (
    <form onSubmit={onSubmit}>
      {Legend && <StyledLegend>{Legend}</StyledLegend>}
      {handleFields(textFields, selectFields, id)}
      <Button type="submit">{id ? "Editar ficha" : "Criar ficha"}</Button>
    </form>
  );
}
