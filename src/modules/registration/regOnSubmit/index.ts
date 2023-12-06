import { RegistrationApi, SignUpParams } from '../../../api/registration';
import { formValidation } from './../../../utils/validation/index';


export const regOnSubmit = (event: Event) => {
  const formValues = formValidation(event)
  if (formValues) {
    new RegistrationApi().signUpRequest(formValues as SignUpParams)
      .then(res => {
        if (res?.id) {
          const message = document.querySelector('#onSubmitMessage')
          if (message) {
            message.textContent = 'Вы успешно зарегистрированы'
          }
        }
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
