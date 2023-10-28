import { FormInput } from '../../components/FormInput/index';
import { fields } from './config';
import { Button } from '../../components/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../components/Link';


const registrationInputs = document.querySelector("#registration__inputs")
const buttonContainer = document.querySelector("#registration__button")

const htmlArr: string[] = new Array(fields.length)

const buttonResult = handlebarsCompiler(Button(), { text: 'Зарегистрироваться' })
const link = handlebarsCompiler(Link(), {
  text: 'Уже есть аккаунт ?',
  href: '/src/pages/authorization/index.html',
})

fields.forEach(field => {
  htmlArr.push(handlebarsCompiler(FormInput(), { name: field.name, title: field.title }))
})

registrationInputs!.innerHTML = htmlArr.join('')
buttonContainer!.innerHTML = buttonResult + link