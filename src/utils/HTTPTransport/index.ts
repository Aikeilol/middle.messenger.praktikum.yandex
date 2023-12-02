import { HTTPMethod, httpOptions, METHODS } from "./types";

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {

  get: HTTPMethod = (url, options) => {

    return this.request(url, { ...options, method: METHODS.GET }, options?.timeout);
  };

  post: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST }, options?.timeout);
  };

  put: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);
  };

  request = (url: string, options?: httpOptions, timeout: number = 5000) => {
    const { headers = {}, method, data, contentType = 'application/json; charset=utf-8' } = options || {};
    url = `https://ya-praktikum.tech/api/v2${url}`
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data as Record<string, unknown>)}`
          : url,
      );

      xhr.withCredentials = true

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (contentType === 'application/json; charset=utf-8') {
        xhr.setRequestHeader('Content-Type', contentType)
      }

      xhr.onload = function () {
        try {
          resolve(JSON.parse(xhr.response));
        } catch (e) {
          resolve(xhr.response)
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        contentType === 'application/json; charset=utf-8' ? xhr.send(JSON.stringify(data)) : xhr.send(data as unknown as FormData);
      }
    });
  };
}
