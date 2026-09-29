// src/utils/dataTransform.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Renomeia chaves de um objeto de cabeçalhos com base em um mapeamento personalizado.
 *
 * @param headers O objeto cujas chaves precisam ser renomeadas.
 * @param customNames Mapeamento de renomeação de chaves.
 * @returns Um novo objeto com as chaves renomeadas.
 */
export function renameHeaders<
  T extends Record<string, any>,
  U extends Partial<Record<keyof T, string>>
>(
  headers: T,
  customNames: U
): {
  [K in keyof T as K extends keyof U
    ? U[K] extends string
      ? U[K]
      : never
    : K]: T[K];
} {
  return Object.keys(headers).reduce((acc, key) => {
    if (key in customNames) {
      (acc as any)[customNames[key as keyof U]] = headers[key as keyof T]; // Renomeia a chave
    } else {
      (acc as any)[key] = headers[key as keyof T]; // Mantém a chave original
    }
    return acc;
  }, {} as any);
}
/* export function renameHeaders<
      T extends Record<string, any>,
      U extends Partial<Record<keyof T, string>>
    >(
      headers: T,
      customNames: U
    ): {
      [K in keyof U as U[K] extends string ? U[K] : never]: T[K & keyof T];
    } & Omit<T, keyof U> {
      return Object.keys(headers).reduce((acc, key) => {
        if (key in customNames) {
          (acc as any)[customNames[key as keyof U]] = headers[key as keyof T]; // Renomeia a chave
        } else {
          (acc as any)[key] = headers[key as keyof T]; // Mantém a chave original
        }
        return acc;
      }, {} as any);
    }
*/

/**
 * Remove propriedades específicas de um array de objetos.
 *
 * @template T - O tipo dos objetos no array.
 * @param {T[]} data - O array de objetos a ser filtrado.
 * @param {string[]} keysToRemove - As chaves que devem ser removidas dos objetos.
 * @returns {T[]} Um novo array com os objetos sem as propriedades especificadas.
 */
export function filterData<T extends Record<string, any>>(
  data: T[],
  keysToRemove: string[]
): T[] {
  try {
    return data.map(
      (item) =>
        Object.fromEntries(
          Object.entries(item).filter(([key]) => !keysToRemove.includes(key))
        ) as T
    );
  } catch (error) {
    console.error("Erro ao filtrar os dados:", error);
    return [];
  }
}

/* 
  

export function filterData<T extends Record<string, any>, K extends keyof T>(
  data: T[],
  keysToRemove: K[]
): Array<Omit<T, K>> {
  try {
    return data.map((item) => {
      const filteredEntry = Object.fromEntries(
        Object.entries(item).filter(([key]) => !keysToRemove.includes(key as K))
      ) as Omit<T, K>;
      return filteredEntry;
    });
  } catch (error) {
    console.error("Erro ao filtrar os dados:", error);
    return [];
  }
}
*/
