import { Store } from "@/types/store.interface";

export interface ListResponse<T> {
  total: number;
  pages: number;
  size: number;
  pageNum: number;
  pageSize: number;
  startRow: number;
  endRow: number;
  list: T[];
  storeList: Store[];
}

export interface PageResponse<T> {
  code?: number;
  message?: string;
  total?: number;
  data?: T;
  has_next?: boolean;
}

export interface BaseResponse<T> {
  code?: number;
  message?: string;
  total?: number;
  data: T;
}
