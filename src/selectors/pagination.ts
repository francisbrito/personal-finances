export interface IResultPage<T> {
  count: number;
  results: T[];
}

export interface IPaginationOptions {
  limit?: number;
  offset?: number;
}
