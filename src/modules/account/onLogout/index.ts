import { AuthorizationApi } from "../../../api/authorization"
import router from "../../../router"



export const onLogout = (e: Event) => {
  const event = e.target as HTMLLinkElement
  const isLogout = event.getAttribute('id') === 'logout'
  if (isLogout) {
    new AuthorizationApi().logout().then(() => {
      router.go('/sign-in')
    })
  }
}