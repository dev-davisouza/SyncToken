export default function useHeaders(query) {
  /* Nunca use if (query) pra não sofrer dnv */
  if (Array.isArray(query) && query.length > 0) {
    let keys = [];
    let q;
    try {
      q = query.flat();
    } catch (error) {
      q = query;
    }
    if (keys.length === 0) {
      keys = Object.keys(q[0]);
    }
    return keys;
  }
}
