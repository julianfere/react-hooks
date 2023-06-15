import { useEffect } from "react";
import { UseAsyncParams } from "./types";

/**
 * Custom hook for handling asynchronous operations with promises.
 *
 * @param { Promise<any>} asyncFunction - The async function to be executed.
 * @param {(data: any) => void} [onSuccess=() => {}] - Callback function to be called on successful completion of the async function.
 * @param {(error: any) => void} [onReject=() => {}] - Callback function to be called if the async function throws an error.
 * @param {boolean} [manual=false] - Flag indicating whether the async function should be executed manually.
 * @returns {(() => void) | void} - If `manual` is true, returns the `executePromise` function. Otherwise, returns a void function that does nothing.
 */
const useAsync = ({
  asyncFunction,
  onSuccess,
  onReject,
  manual,
}: UseAsyncParams) => {
  let isMounted = true;
  const executePromise = () => {
    asyncFunction()
      .then((data) => {
        if (isMounted) {
          onSuccess?.(data);
        }
      })
      .catch((error) => {
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

  return manual ? executePromise : () => {};
};

export default useAsync;
