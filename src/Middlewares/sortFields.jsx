/* 
  fields: []
  ord: []
*/
export default function sortFields(fields, ord) {
  // Extraindo o campo que deve ser colocado primeiro
  const [firstField, ...rest] = ord;
  // Filtrando o campo que deve ser colocado primeiro do array fields
  const remainingFields = fields.filter((field) => field !== firstField);

  // Retornando o campo desejado primeiro, seguido pelos campos restantes
  return [firstField, ...remainingFields];
}
