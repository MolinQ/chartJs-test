export const CutArray = (array) => {
  const limit = 14;
  if (array.length > limit) {
    array.shift();
  }
  return array;
};
