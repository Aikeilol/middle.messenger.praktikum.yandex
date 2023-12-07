
export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Timeout = number

export type HttpOptions = {
  headers?: Record<string, string>
  method?: METHODS,
  data?: Record<string, unknown> | FormData,
  timeout?: Timeout
  contentType?: string
}

export type HTTPMethod = (url: string, options?: HttpOptions) => Promise<unknown>
