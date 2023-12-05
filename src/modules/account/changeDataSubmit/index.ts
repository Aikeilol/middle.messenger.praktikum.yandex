import { Store } from './../../../store/index';
import { UserApi, accData } from "../../../api/account"
import { formValidation } from "../../../utils/validation"



export const changeDataSubmit = (event: Event) => {
  const formValues = formValidation(event)

  if (formValues) {
    const userApi = new UserApi()
    userApi.changeUserData(formValues as unknown as accData).then(res => {
      new Store().setState('accData', res)
    })
  }
}
