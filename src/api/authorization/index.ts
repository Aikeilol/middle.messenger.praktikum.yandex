import { HTTPTransport } from "../../utils/HTTPTransport";

export type SignInParams = {
  login: string,
  password: string,
}

export type SignInResponse = {
  id: number
  reason?: string
}
export type AccData = {
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

  signInRequest(signUpParams: SignInParams) {
    return this._HTTPTransport.post(
      '/auth/signin',
      { data: signUpParams }) as Promise<SignInResponse>;
  }

  getAccData() {
    return this._HTTPTransport.get('/auth/user') as Promise<AccData>
  }

  logout(){
    return this._HTTPTransport.post('/auth/logout')
  }
}
