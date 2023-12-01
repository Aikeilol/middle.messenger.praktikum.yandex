import { HTTPTransport } from "../../utils/HTTPTransport";

export type signInParams = {
  login: string,
  password: string,
}

export type changeUserDataResponse = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string
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

export class UserApi {
  _HTTPTransport = new HTTPTransport()

  changeUserData(data: accData) {
    return this._HTTPTransport.put('/user/profile', { data }) as Promise<changeUserDataResponse>
  }
}
