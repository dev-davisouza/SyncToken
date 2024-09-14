export default function handleDisabled(field, formData) {
  if (!formData["DocType"] && field != "DocType") {
    return true;
  }
}
