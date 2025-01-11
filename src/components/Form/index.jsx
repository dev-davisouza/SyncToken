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
import useAuthContext from "@/hooks/useAuthContext";

export default function Form({
  Legend,
  textFields,
  selectFields,
  handleSubmit,
  textButton,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { formData, setFormData } = useFormContext();
  const { setMessageContent, setTypeMessage } = useMessageContext();
  const { activateTrigger } = useTriggerContext();
  const { access } = useAuthContext();

  const onSubmit = (e) => {
    e.preventDefault();
    // Remove pontos e hífens do campo NIS/CPF
    const cleanData = formData.NIS_CPF
      ? {
          ...formData,
          NIS_CPF: formData.NIS_CPF.replace(/\D/g, ""),
        }
      : formData;
    handleSubmit(
      cleanData,
      setFormData,
      id,
      navigate,
      activateTrigger,
      setMessageContent,
      setTypeMessage,
      access
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
      {handleFields(textFields, selectFields, id, access)}
      {textButton ? (
        <Button type="submit">{textButton}</Button>
      ) : (
        <Button type="submit">{id ? "Editar ficha" : "Criar ficha"}</Button>
      )}
    </form>
  );
}
