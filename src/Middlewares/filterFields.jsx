/* 
fields: [] 
fieldsToRemove: []
*/

export default function filterFields(fields, fieldsToRemove) {
  return fields.filter((field) => !fieldsToRemove.includes(field));
}

export function removeFields(obj, fieldsToRemove) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fieldsToRemove.includes(key))
  );
}
