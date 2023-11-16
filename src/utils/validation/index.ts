

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

  if (name === 'display_name' || name === 'message') {
    return value
  }

}

export const addFormValidation = (form: HTMLFormElement, inputs: NodeListOf<HTMLInputElement>) => {
  form?.addEventListener('submit', (event) => {
    event.preventDefault()
    let isError = false
    const formValue: Record<string, string> = {}
    inputs.forEach(input => {
      formValue[input.name] = input.value
      if (!validation(String(input.name), String(input.value))) {
        isError = true
        input.classList.add('form_error')
        return
      }
      input.classList.remove('form_error')
    })

    if (!isError) {
      console.log(formValue)
    }

  })

  inputs.forEach(input => {
    input.addEventListener('blur', () => {

      if (!input.value) {
        return null
      }

      if (!('name' in input && 'value' in input)) {
        return null
      }

      const validatedValue = validation(String(input.name), String(input.value))
      if (!validatedValue) {

        input.classList.add('form_error')
        return null
      }

      input.classList.remove('form_error')
      input.value = String(validatedValue)
    })
  })
}
