/**
 * Garante que um array sempre terá um formato simples de array de objetos: [{...}, {...}]
 * @param {Array} arr
 */
export default function superFlat(arr) {
  return arr.flat(Infinity);
}
