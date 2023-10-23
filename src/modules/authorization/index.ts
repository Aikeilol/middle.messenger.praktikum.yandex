import { Input } from './../../components/Input/index';
import { fields } from './config';
import { Button } from '../../components/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../components/Link';


const authorizationInputs = document.querySelector("#authorization__inputs")
const buttonContainer = document.querySelector("#authorization__button")

const htmlArr: string[] = []

const buttonResult = handlebarsCompiler(Button, { text: 'Войти' })
const link = handlebarsCompiler(Link, {
  text: 'Ещё не зарегистрированы?',
  href: '/src/pages/registration/index.html',
})

fields.forEach(field => {
  htmlArr.push(handlebarsCompiler(Input, { name: field.name, title: field.title }))
})

authorizationInputs!.innerHTML = htmlArr.join('')
buttonContainer!.innerHTML = buttonResult + link