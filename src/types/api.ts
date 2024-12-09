export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export const ApiErrorCodes = {
  SUCCESS: 0,
  PARAM_ERROR: 1001,
  UNAUTHORIZED: 1002,
  INSUFFICIENT_CREDITS: 1003,
  FETCH_ERROR: 1004,
  PAYMENT_ERROR: 1005,
  NEED_LOGIN: 1006,
  NO_MORE_DATA: 1007,
  SERVER_ERROR: 5000,
} as const;
