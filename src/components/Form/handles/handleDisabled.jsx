/* export default function handleDisabled(field, formData) {
  if (!formData["DocType"] && field != "DocType") {
    return true;
  }
}
 */

export default function handleDisabled(field, formData) {
  if (field === "DocType") {
    return false; // O campo DocType nunca deve ser desabilitado
  }
  if (!formData["DocType"]) {
    return true; // Desabilita campos se DocType não foi selecionado
  }

  return false; // Caso contrário, o campo está habilitado
}
