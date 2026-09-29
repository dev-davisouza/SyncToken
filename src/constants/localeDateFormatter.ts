export default function localeDateFormatter(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00-03:00`);
  return date.toLocaleDateString("pt-BR", { timeZone: "America/Recife" });
}
