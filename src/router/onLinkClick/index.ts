import router from ".."

export const onLinkClick = (e: Event) => {
  const event = e.target as HTMLLinkElement
  const href = event.getAttribute('href')
  if (event && href) {
    e.preventDefault()
    router.go(href)
  }
}
