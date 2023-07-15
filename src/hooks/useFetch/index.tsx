/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const buildController = () => {
  return new AbortController();
};

const buildRequest = (url: string, options?: RequestInit) => {
  return new Request(url, options);
};

/**
 * Custom hook for making HTTP requests and handling loading and error states.
 * The request is canceled when the component is unmounted.
 * @template T The type of the data returned by the HTTP request.
 * @template E The type of the error thrown by the HTTP request.
 *
 * @returns {UseFetchReturn} An object containing the error, isLoading, and callEndpoint properties.
 * @property {Error | null | E} error The error object returned from the request, or null if no error occurred.
 * @property {boolean} isLoading A boolean indicating whether the request is currently loading or not.
 * @property {function(url: string, options: RequestInit): Promise<T | undefined>} callEndpoint A function that makes the HTTP request to the specified endpoint.
 * @example
 * function Todos() {
 *  const { error, isLoading, callEndpoint } = useFetch<Todo[]>();
 *  const [todos, setTodos] = useState<Todo[]>([]);
 *
 *  useEffect(() => {
 *    callEndpoint("https://jsonplaceholder.typicode.com/todos").then(setTodos);
 *  }, []);
 * }
 */
const useFetch = <T, E = any>() => {
  const [error, setError] = useState<Error | null | E>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const controller = buildController();

  const callEndpoint = async (
    url: string,
    options?: RequestInit
  ): Promise<T | undefined> => {
    setIsLoading(true);
    const request = buildRequest(url, {
      ...options,
      signal: controller.signal,
    });

    try {
      const response = await fetch(request);
      const json = (await response.json()) as T;
      setIsLoading(false);
      return json;
    } catch (error) {
      setError(error as E);
      setIsLoading(false);
    }
  };

  const abort = () => {
    setIsLoading(false);
    controller.abort();
  };

  useEffect(() => () => abort(), []);

  return { error, isLoading, callEndpoint };
};

export default useFetch;
