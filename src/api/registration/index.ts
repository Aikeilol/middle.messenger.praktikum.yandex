import { HTTPTransport } from "../../utils/HTTPTransport";

export type SignUpParams = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type SignUpResponse = {
  id: number
  reason?: string
}

export class RegistrationApi {
  _HTTPTransport = new HTTPTransport()

  signUpRequest(signUpParams: SignUpParams): Promise<SignUpResponse> {
    return this._HTTPTransport.post(
      '/auth/signup',
      { data: signUpParams }) as Promise<SignUpResponse>;
  }

}
