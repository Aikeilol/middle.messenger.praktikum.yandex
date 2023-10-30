
type props = {
  name: string
  className: string
  placeholder: string
}

export const Input = ({ name, className, placeholder }: props) => {

  return (
    `<input name=${name} type='text' placeholder="${placeholder}" class=${className}>`
  )
}
