export const dateObjectToStringObject = (obj) => {
  const object = {}
  for (const prop in obj) {
    object[prop] = obj[prop].toISOString().substr(0, 10)
  }
  return object
}
