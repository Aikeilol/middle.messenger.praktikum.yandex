import { HTTPTransport } from "../../utils/HTTPTransport";

export type signInParams = {
  login: string,
  password: string,
}

export type signInResponse = {
  id: number
  reason?: string
}
export type accData = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string
}

export class AuthorizationApi {
  _HTTPTransport = new HTTPTransport()

  signInRequest(signUpParams: signInParams) {
    return this._HTTPTransport.post(
      '/auth/signin',
      { data: signUpParams }) as Promise<signInResponse>;
  }

  getAccData() {
    return this._HTTPTransport.get('/auth/user') as Promise<accData>
  }

  logout(){
    return this._HTTPTransport.post('/auth/logout')
  }
}
