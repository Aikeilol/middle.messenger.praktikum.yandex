import { HTTPTransport } from "../../utils/HTTPTransport";

export type signUpParams = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type signUpResponse = {
  id: number
  reason?: string
}

export class RegistrationApi {
  _HTTPTransport = new HTTPTransport()

  signUpRequest(signUpParams: signUpParams): Promise<signUpResponse> {
    return this._HTTPTransport.post(
      '/auth/signup',
      { data: signUpParams }) as Promise<signUpResponse>;
  }

}
