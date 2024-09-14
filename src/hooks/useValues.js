export default function useValues(query) {
  let values = [];
  if (query.length > 0) {
    if (Array.isArray(query)) {
      query.map((obj) => values.push(Object.values(obj)));
    } else {
      throw new Error("paramêtro 'query' deve ser um array[]");
    }
    return values;
  }
}
