export interface Response<T> {
  code: number;
  data: T;
  message: string;
}

export interface ResponseList<T> {
  code: number;
  data: {
    list: T[];
    totalPages: number;
    totalItems: number;
    pageSize: number;
    pageNumber: number;
  }
  message: string;
}
