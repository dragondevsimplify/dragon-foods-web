export interface Response<T> {
  code: number;
  data: T | null;
  message: string;
}

export interface ResponseList<T> {
  code: number;
  data: DataResponse<T>
  message: string;
}

export interface DataResponse<T> {
  list: T[];
  totalPages: number;
  totalItems: number;
  pageSize: number;
  pageNumber: number;
}
