// const { headers = {}, method, data } = options;

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}


export type httpOptions = {
  headers?: Record<string, string>
  method: METHODS,
  data: Record<string, unknown>,
  timeout: number
}
