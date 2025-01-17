export interface CustomError {
  message: string;
  code: string;
  statusCode: number;
}

export function createCustomError(message: string, code: string, statusCode: number): CustomError & Error {
  const error = new Error(message) as CustomError & Error;
  error.code = code;
  error.statusCode = statusCode;
  return error;
}