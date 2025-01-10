import { cryptoElementLimit } from "../constants/minCryptoElement.js";

export const CutArray = (array) => {
  if (array.length > cryptoElementLimit) {
    array.shift();
  }
  return array;
};
