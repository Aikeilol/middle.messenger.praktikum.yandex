
export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type timeout = number

export type httpOptions = {
  headers?: Record<string, string>
  method?: METHODS,
  data: Record<string, unknown>,
  timeout?: timeout
}

export type HTTPMethod = (url: string, options: httpOptions) => Promise<unknown>
