export const httpToHttps = (url) => url.replace(/^http:\/\//i, 'https://')
export const ObjectToQueryString = (obj) => {
  let string = Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')
  return string !== '' ? `?${string}` : ''
}
