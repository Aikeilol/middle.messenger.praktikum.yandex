import { UserApi } from "../../../../../api/account"
import { Store } from "../../../../../store"


export const onSaveAvatar = (e: Event) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)

  new UserApi().saveAvatar(formData as FormData).then(res => {
    new Store().setState('accData', res)
  })
    .catch(err => console.log(err))
}
