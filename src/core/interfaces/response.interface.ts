export interface IResponse<T> {
  error: null | string;
  data: T;
  successfulMessage: null | string;
}
