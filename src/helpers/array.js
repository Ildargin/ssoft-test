export const removeDuplicateById = (arr) =>
  arr.filter((element, index, arr) => arr.findIndex((el) => el.id === element.id) === index)
