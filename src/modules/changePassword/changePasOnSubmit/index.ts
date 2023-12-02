import { UserApi, changePassData } from '../../../api/account';
import { formValidation } from './../../../utils/validation/index';


export const changePasOnSubmit = (event: Event) => {
  const formValues = formValidation(event)
  if (formValues) {
    const userApi = new UserApi()
    userApi.changePassword(formValues as changePassData)
      .then(res => {
        const message = document.querySelector('#onSubmitMessage')
        if (res?.reason) {
          message!.textContent = res.reason
          return
        }
        message!.textContent = 'Пароль изменен'
      })
      .catch(err => {
        if (err?.reason) {
          const message = document.querySelector('#onSubmitMessage')
          if (message) {
            message.textContent = err?.response
          }
        }
      })
  }
}
