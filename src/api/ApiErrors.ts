export interface IApiError<H> extends Error {
  message: string;
  baseURL: string;
  method: string;
  url: string;
  code: number;
  header: H;
}

export interface IApiErrorHeader {
  Accept: string;
  xToken: string;
}

export class ApiError implements IApiError<IApiErrorHeader> {
  message: string;
  baseURL: string;
  method: string;
  url: string;
  code: number;
  header: IApiErrorHeader;
  name: string = 'API ERROR';
  stack?: string | undefined;
  cause?: unknown;

  constructor(
    header: IApiErrorHeader,
    code = 500,
    message: string = '',
    baseUrl: string = '',
    method: string = '',
    url: string = '',
    stack: string = '',
    cause: string = ''
  ) {
    this.message = message;
    this.baseURL = baseUrl;
    this.method = method;
    this.url = url;
    this.header = header;
    this.code = code;
    this.stack = stack;
    this.cause = cause;
  }
}
