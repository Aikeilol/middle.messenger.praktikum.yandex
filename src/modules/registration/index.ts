import { FormInput } from '../../components/FormInput/index';
import { fields } from './config';
import { Button } from '../../templates/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../templates/Link';
import './style.scss'
import { Block } from '../../utils/Block';
import { inputValidation } from '../../utils/validation';

export class Registration extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('registration')
    const inputsContainer = content.querySelector('#registration__inputs')

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

    const buttonResult = handlebarsCompiler(Button(), { text: 'Зарегистрироваться' })
    const link = handlebarsCompiler(Link(), {
      text: 'Уже есть аккаунт ?',
      href: '/sign-in',
    })

    return (
      `
      <div class="registration-container">
      <div class="registration__title">
        Регистрация
      </div>
      <form id="registration__form" class="registration__form" action="">
        <div id="registration__inputs" class="registration__form__inputs">

        </div>
        <div id="registration__button" class="registration__form__button">
        <p class='onSubmitMessage' id='onSubmitMessage'></p>
        ${buttonResult + link}
        </div>
      </form>
      </div>`

    )
  }
}

// const registration = new Registration('div', {
//   events: {
//     submit: formValidation
//   }
// })

// document.querySelector('#content')?.append(registration.getContent())
