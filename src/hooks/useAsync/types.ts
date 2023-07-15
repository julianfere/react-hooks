export interface UseAsyncParams<T, E = any> {
  asyncFunction: (...args: any[]) => Promise<T>;
  onSuccess?: (data: T) => void;
  onReject?: (error: E) => void;
  manual?: boolean;
}
