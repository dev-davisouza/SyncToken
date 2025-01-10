export default function handleType(field, isSelect) {
  if (field === "password") {
    return "password";
  }
  return isSelect ? "select" : "text";
}
