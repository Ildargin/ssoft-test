const apiKey = process.env.API_KEY

export const keyOptions = {
  method: 'GET',
  headers: {
    'X-Auth-Token': apiKey
  }
}