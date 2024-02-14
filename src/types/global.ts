import React from "react";

export type TErrorResponse = {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: {
    success: boolean;
    statusCode: number;
    message: string;
    errorSource: {
      path: string;
      message: string;
    };
  };
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: TMeta;
  error?: TErrorResponse;
};

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
