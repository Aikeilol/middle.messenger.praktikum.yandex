import { formValidation, inputValidation } from './../../utils/validation/index';
import { FormInput } from '../../components/FormInput/index';
import { fields } from './config';
import { Button } from '../../templates/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../templates/Link';
import './style.scss'
import { Block } from '../../utils/Block';

export class Authorization extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('authorization')
    const inputsContainer = content.querySelector('#authorization__inputs')

    fields.forEach(field => {
      const formInput = new FormInput('div', {
        props: {
          name: field.name, title: field.title
        },
        events: {
          blur: inputValidation
        }
      }).getContent()
      inputsContainer?.append(formInput)
    })
  }

  render(): string {

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
        </div>
        <div id="authorization__button" class="authorization__form__button">
        ${buttonResult + link}
        </div>
      </form>`
    )
  }
}

const authorization = new Authorization('div', {
  events: {
    submit: formValidation
  }
})

document.querySelector('#container')?.append(authorization.getContent())
