import { useEffect } from "react";
import { UseAsyncParams } from "./types";

/**
 * Custom hook for handling asynchronous operations with promises.
 *
 * @template T The type of the data returned by the async function.
 * @template E The type of the error thrown by the async function.
 * @property {function(...args: any[]): Promise<T>} asyncFunction The async function to be executed.
 * @property {function(data: T): void} [onSuccess=() => {}] Callback function to be called on successful completion of the async function.
 * @property {function(error: E): void} [onReject=() => {}] Callback function to be called if the async function throws an error.
 * @property {boolean} [manual=false] Flag indicating whether the async function should be executed manually.
 * @param params
 * @returns {(() => void)} If `manual` is true, returns the `executePromise` function. Otherwise, returns a void function that does nothing.
 * @example
 * const asyncFn = (): Promise<string> => Math.random() > 0.5 ? Promise.resolve("Success") : Promise.reject(0);
 * const onSuccess = (data: string) => console.log(data);
 * const onReject = (error: number) => console.log(error);
 * const executePromise = useAsync({ asyncFunction: asyncFn, onSuccess, onReject, manual: true});
 * executePromise();
 */

const useAsync = <T, E = any>({
  asyncFunction,
  onSuccess,
  onReject,
  manual,
}: UseAsyncParams<T, E>): (() => void) => {
  let isMounted = true;
  const executePromise = () => {
    asyncFunction()
      .then((data: T) => {
        if (isMounted) {
          onSuccess?.(data);
        }
      })
      .catch((error: E) => {
        if (isMounted) {
          onReject?.(error);
        }
      });
  };

  useEffect(() => {
    isMounted = true;
    if (!manual) executePromise();

    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return manual ? executePromise : () => {};
};

export default useAsync;
