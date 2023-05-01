/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const buildController = () => {
  return new AbortController();
}

const buildRequest = (url: string, options?: RequestInit) => {
  return new Request(url, options);
}

const useFetch = () => {
  const [error, setError] = useState<Error | null | unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const controller = buildController();

  const callEndpoint = async (url: string, options?: RequestInit) => {
    setIsLoading(true);
    const request = buildRequest(url, {...options, signal: controller.signal});

    try {
      const response = await fetch(request);
      const json = await response.json();
      setIsLoading(false);
      return json;
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  const abort = () => {
    setIsLoading(false);
    controller.abort();
  }

  useEffect(() => () => abort(), [])

  return { error, isLoading, callEndpoint };
}


export default useFetch;