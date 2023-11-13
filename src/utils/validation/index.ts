

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
    return value.match(/^[a-zA-Z]*[0-9-]+$/i)
  }

  if (name === 'password') {
    return value.match(/^(?=\w*[A-Z])(?=\w*\d)\w{8,40}$/)
  }

  if (name === 'phone') {
    return value.match(/(\+7|8)[0-9]{10,15}/ig)
  }

}
