import { errorsText } from './errorsText'
import './style.scss'

export const validation = (name: string, value: string) => {

  if (name === 'first_name' || name === 'second_name') {
    const validatedValue = value.match(/^[A-ZА-ЯЁ]+([A-Za-zА-яЁё]|-)+[A-za-zа-яёё]+$/gu)
    if (validatedValue) {
      return validatedValue
    }
  }

  if (name === 'email') {
    return value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g)
  }

  if (name === 'login') {
    return value.match(/^(?=.*[a-zA-Z])[\w-]{3,20}$/)
  }

  if (name === 'password' || name === 'oldPassword' || name === 'newPassword') {
    return value.match(/^(?=\w*[A-Z])(?=\w*\d)\w{8,40}$/)
  }

  if (name === 'phone') {
    return value.match(/(\+7|8)[0-9]{10,15}/ig)
  }

  if (name === 'display_name' || name === 'message' || name === 'search') {
    return value
  }

}

export const inputValidation = (e: Event) => {
  const input = e.target as HTMLInputElement
  const validatedValue = validation(String(input.name), String(input.value))
  const isAlreadyError = input.parentElement?.querySelector(`#error-message_${input.name}`)
  if (!validatedValue && !isAlreadyError) {
    const errorText = document.createElement('p')
    errorText.setAttribute("id", `error-message_${input.name}`)
    errorText.classList.add('error-message')
    errorText.textContent = errorsText?.[input.name]
    input.parentElement?.insertBefore(errorText, input)
    input.classList.add('form_error')
  }
  if (validatedValue && isAlreadyError) {
    input.parentElement?.removeChild(
      input.parentElement.querySelector(`#error-message_${input.name}`) as Node
    )
    input.classList.remove('form_error')
    input.value = String(validatedValue)
  }
}

export const formValidation = (event: Event) => {
  event.preventDefault()
  const eventTarget = event.target as Element
  const inputs = eventTarget.querySelectorAll('input')
  const formValue: Record<string, string> = {}
  let isError = false
  inputs.forEach(input => {
    formValue[input.name] = input.value
    const validatedValue = validation(String(input.name), String(input.value))
    const isAlreadyError = input.parentElement?.querySelector(`#error-message_${input.name}`)
    if (!validatedValue) {
      isError = true
    }
    if (!validatedValue && !isAlreadyError) {
      const errorText = document.createElement('p')
      errorText.setAttribute("id", `error-message_${input.name}`)
      errorText.classList.add('error-message')
      errorText.textContent = errorsText?.[input.name]
      input.parentElement?.insertBefore(errorText, input)
      input.classList.add('form_error')
      return
    }
    if (validatedValue && isAlreadyError) {
      input.parentElement?.removeChild(
        input.parentElement.querySelector(`#error-message_${input.name}`) as Node)
      input.classList.remove('form_error')
    }
  })
  if (!isError) {
    return(formValue)
  }
}
