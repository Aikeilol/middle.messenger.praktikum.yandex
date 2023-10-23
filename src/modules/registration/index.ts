import { Input } from './../../components/Input/index';
import { fields } from './config';
import { Button } from '../../components/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../components/Link';


const registrationInputs = document.querySelector("#registration__inputs")
const buttonContainer = document.querySelector("#registration__button")

const htmlArr: string[] = []

const buttonResult = handlebarsCompiler(Button, { text: 'Зарегистрироваться' })
const link = handlebarsCompiler(Link, {
  text: 'Уже есть аккаунт?',
  href: '/src/pages/authorization/index.html',
})

fields.forEach(field => {
  htmlArr.push(handlebarsCompiler(Input, { name: field.name, title: field.title }))
})

registrationInputs!.innerHTML = htmlArr.join('')
buttonContainer!.innerHTML = buttonResult + link