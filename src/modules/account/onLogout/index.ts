import { AuthorizationApi } from "../../../api/authorization"
import router from "../../../router"
import { Store } from "../../../store"



export const onLogout = (e: Event) => {
  const event = e.target as HTMLLinkElement
  const isLogout = event.getAttribute('id') === 'logout'
  if (isLogout) {
    new AuthorizationApi().logout().then(() => {
      new Store().setState('accData', null)
      router.go('/sign-in')
    })
      .catch(err => console.log(err))
  }
}
