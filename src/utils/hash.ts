import CryptoJS from "crypto-js";

/**
 * função que utiliza o algoritmo SHA-256 para fazer o hash de strings
 * @param {String} string
 */
export default function hash(string: string): string {
  return CryptoJS.SHA256(string).toString(CryptoJS.enc.Hex);
}
