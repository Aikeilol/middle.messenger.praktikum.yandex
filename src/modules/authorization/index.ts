import { FormInput } from '../../components/FormInput/index';
import { fields } from './config';
import { Button } from '../../components/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../components/Link';
import './style.scss'
import { Block } from '../../utils/Block';
import { addFormValidation } from '../../utils/validation';

export class Authorization extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('authorization')
    const form = content.querySelector("#authorization__form") as HTMLFormElement
    const inputs = content.querySelectorAll('input')

    addFormValidation(form, inputs)
    
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
