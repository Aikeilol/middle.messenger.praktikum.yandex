import { HTTPTransport } from "../../utils/HTTPTransport";

export type SignInParams = {
  login: string,
  password: string,
}

export type ChangeUserDataResponse = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string
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

export type ChangePassData = {
  oldPassword: string,
  newPassword: string
}

export class UserApi {
  _HTTPTransport = new HTTPTransport()

  changeUserData(data: AccData) {
    return this._HTTPTransport.put('/user/profile', { data }) as Promise<ChangeUserDataResponse>
  }

  saveAvatar(formData: FormData) {
    return this._HTTPTransport.put('/user/profile/avatar',
     { data: formData, contentType: '' }) as Promise<ChangeUserDataResponse>
  }

  changePassword(data: ChangePassData) {
    return this._HTTPTransport.put('/user/password', { data: data }) as Promise<{ reason?: string }>

  }
}
