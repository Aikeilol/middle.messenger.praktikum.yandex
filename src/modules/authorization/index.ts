import { FormInput } from '../../components/FormInput/index';
import { fields } from './config';
import { Button } from '../../components/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../components/Link';


const authorizationInputs = document.querySelector("#authorization__inputs")
const buttonContainer = document.querySelector("#authorization__button")

const htmlArr: string[] = new Array(fields.length)

const buttonResult = handlebarsCompiler(Button(), { text: 'Войти' })
const link = handlebarsCompiler(Link(), {
  text: 'Ещё не зарегистрированы ?',
  href: '/src/pages/registration/index.html',
})

fields.forEach(field => {
  htmlArr.push(handlebarsCompiler(FormInput(), { name: field.name, title: field.title }))
})

authorizationInputs!.innerHTML = htmlArr.join('')
buttonContainer!.innerHTML = buttonResult + link