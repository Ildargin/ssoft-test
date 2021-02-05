import { useState, useEffect } from 'react'
import { keyOptions } from './key'
import { ObjectToQueryString } from '../helpers/url'

export function useFetch(url, params = {}) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const queryString = ObjectToQueryString(params)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${url}${queryString}`, keyOptions)
        const result = await response.json()
        if (response.ok) {
          setData(result)
        } else {
          setHasError(true)
          setErrorMessage(result.message)
        }
      } catch (error) {
        setHasError(true)
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])
  return { data, isLoading, hasError, errorMessage }
}
