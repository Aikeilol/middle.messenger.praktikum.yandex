import { AuthorizationApi, SignInParams } from '../../../api/authorization';
import router from '../../../router';
import { Store } from '../../../store';
import { formValidation } from './../../../utils/validation/index';


export const authOnSubmit = (event: Event) => {
  const formValues = formValidation(event)
  if (formValues) {
    const authorizationApi = new AuthorizationApi()
    authorizationApi.signInRequest(formValues as SignInParams)
      .then(res => {
        const message = document.querySelector('#onSubmitMessage')
        if (res.reason) {
          message!.textContent = res.reason
          return
        }

        authorizationApi.getAccData().then(res => {
          const store = new Store()
          store.setState('accData', res)
          router.go.bind(router)('/messenger')
        })
          .catch(err => console.log(err))
      })
      .catch(err => {
        if (err?.reason) {
          const message = document.querySelector('#onSubmitMessage')
          console.log(err)
          if (message) {
            message.textContent = err?.response
          }
        }
      })
  }
}
