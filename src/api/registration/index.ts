import { HTTPTransport } from "../../utils/HTTPTransport";

type signUpParams = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string

}

export class RegistrationApi {
  _HTTPTransport = new HTTPTransport()

  signUpRequest(signUpParams: signUpParams) {
    return this._HTTPTransport.post('/auth/signup', { data: signUpParams});
  }

}