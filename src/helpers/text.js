export const underscoreTextNormalizer = (text) =>
  text
    .toLowerCase()
    .split('_')
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ')
