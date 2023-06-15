export interface UseAsyncParams {
  asyncFunction: (...args: any[]) => Promise<any>;
  onSuccess?: (data: any) => void;
  onReject?: (error: any) => void;
  manual?: boolean;
}
