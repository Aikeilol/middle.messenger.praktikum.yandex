import router from ".."

export const onLinkClick = (e: Event) => {
  e.preventDefault()
  const event = e.target as HTMLLinkElement
  const href = event.getAttribute('href')
  if (event && href) {
    router.go(href)
  }
}