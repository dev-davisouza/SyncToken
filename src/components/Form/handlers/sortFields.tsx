// src/components/Form/handlers/sortFields.tsx

export default function sortFields(
  textFields: string[] = [],
  selectFields: Record<string, string[]> = {},
  order: string[] = []
) {
  // Criar um array unificado de campos, respeitando a ordem definida pelo usuário
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let allFields: any[] = [];
  // Adicionar os campos de texto, se existirem
  if (textFields) {
    allFields = allFields.concat(
      textFields.map((field) => ({ type: "text", name: field }))
    );
  }

  // Adicionar os campos de seleção, se existirem
  if (selectFields) {
    allFields = allFields.concat(
      Object.keys(selectFields).map((name) => ({ type: "select", name }))
    );
  }

  // Ordenar os campos com base no array order
  const sortedFields = [...allFields].sort((a, b) => {
    const indexA = order.indexOf(a.name);
    const indexB = order.indexOf(b.name);

    if (indexA === -1 && indexB === -1) return 0; // Ambos não estão no order, mantém a ordem original
    if (indexA === -1) return 1; // 'a' não está na ordem, então fica depois de 'b'
    if (indexB === -1) return -1; // 'b' não está na ordem, então 'a' vem primeiro

    return indexA - indexB; // Ordena conforme a ordem definida
  });

  return sortedFields;
}
