/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react"

const useAsync = (
  asyncFunction: (...args: any[]) => Promise<any>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void,
) => {
  useEffect(
    () => {
      let isMounted = true
      asyncFunction()
        .then(data => {
          if (isMounted) {
            successCallback(data)
          }
        })
        .catch(error => {
          if (isMounted) {
            errorCallback(error)
          }
        })
      return () => {
        isMounted = false
      }
    }
  , [])
}

export default useAsync