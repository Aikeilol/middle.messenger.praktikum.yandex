

export const validation = (name: string, value: string) => {

  if (name === 'first_name' || name === 'second_name') {
    const validatedValue = value.match(/^[A-Za-zА-яЁё][A-Za-zа-яёё][-]*[A-Za-zа-яё]+$/u)
    if (validatedValue) {
      return validatedValue[0].replace(/([a-zа-яё])/u, match => match.toUpperCase())
    }
  }

  if (name === 'email') {
    return value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g)
  }

  if (name === 'login') {
    return value.match(/^(?=.{3,20}$)[a-za-zd_-]+(?<!\s)[-d][a-za-zd]*(?=[^\s-]|$)/)
  }
}
