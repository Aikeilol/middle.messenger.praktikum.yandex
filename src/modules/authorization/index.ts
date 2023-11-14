import { FormInput } from '../../components/FormInput/index';
import { fields } from './config';
import { Button } from '../../components/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../components/Link';
import './style.scss'
import { Block } from '../../utils/Block';
import { validation } from '../../utils/validation';

export class Authorization extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('authorization')
    const form = content.querySelector("#authorization__form")
    const inputs = content.querySelectorAll('input')

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

  render(): string {
    const inputsArr: string[] = new Array(fields.length)

    fields.forEach(field => {
      inputsArr.push(handlebarsCompiler(FormInput(), { name: field.name, title: field.title }))
    })

    const buttonResult = handlebarsCompiler(Button(), { text: 'Войти' })
    const link = handlebarsCompiler(Link(), {
      text: 'Ещё не зарегистрированы ?',
      href: '/src/pages/registration/index.html',
    })

    return (
      `
      <div class="authorization__title">
        Регистрация
      </div>
      <form id="authorization__form" class="authorization__form" action="">
        <div id="authorization__inputs" class="authorization__form__inputs">
          ${inputsArr.join('')}
        </div>
        <div id="authorization__button" class="authorization__form__button">
        ${buttonResult + link}
        </div>
      </form>`
    )
  }
}

const authorization = new Authorization()

document.querySelector('#container')?.append(authorization.getContent())
