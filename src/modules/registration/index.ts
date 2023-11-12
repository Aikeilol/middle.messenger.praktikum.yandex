import { FormInput } from '../../components/FormInput/index';
import { fields } from './config';
import { Button } from '../../components/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../components/Link';
import './style.scss'
import { Block } from '../../utils/Block';
import { validation } from '../../utils/validation';

class Registration extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('registration')
    const form = content.querySelector("#registration__form")
    const inputs = content.querySelectorAll('input')

    form?.addEventListener('submit', (event) => {
      event.preventDefault()
      inputs.forEach(input => {
        console.log(input.name, input.value)
      })
    })

    inputs.forEach(input => {
      input.addEventListener('blur', (event) => {
        // @ts-ignore
        if (!event.target?.value) {
          return null
        }

        if (!('name' in event.target && 'value' in event.target)) {
          return null
        }
        const validatedValue = validation(String(event.target.name), String(event.target.value))
        if (!validatedValue) {
          // @ts-ignore
          event.target.classList.add('registration_error')
          return null
        }
        // @ts-ignore
        event.target.classList.remove('registration_error')
        event.target.value = validatedValue
      })
    })
  }

  render(): string {
    const inputsArr: string[] = new Array(fields.length)

    fields.forEach(field => {
      inputsArr.push(handlebarsCompiler(FormInput(), { name: field.name, title: field.title }))
    })

    const buttonResult = handlebarsCompiler(Button(), { text: 'Зарегистрироваться' })
    const link = handlebarsCompiler(Link(), {
      text: 'Уже есть аккаунт ?',
      href: '/src/pages/authorization/index.html',
    })

    return (
      `
      <div class="registration__title">
        Регистрация
      </div>
      <form id="registration__form" class="registration__form" action="">
        <div id="registration__inputs" class="registration__form__inputs">
          ${inputsArr.join('')}
        </div>
        <div id="registration__button" class="registration__form__button">
        ${buttonResult + link}
        </div>
      </form>`
    )
  }
}

const registration = new Registration()

document.querySelector('#container')?.append(registration.getContent())
