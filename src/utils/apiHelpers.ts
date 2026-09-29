/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/apiHelpers.ts

/**  Recebe um objeto por vez */
export const extractKeys = (data: Record<string, any>): string[] => {
  return Object.keys(data);
};

/**  Recebe um objeto por vez */
export const extractValues = <T extends object>(data: T): Array<T[keyof T]> => {
  return Object.values(data);
};
