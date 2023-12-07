import { inputValidation } from './../../utils/validation/index';
import { FormInput } from '../../components/FormInput/index';
import { fields } from './config';
import { Button } from '../../templates/Button';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Link } from '../../templates/Link';
import './style.scss'
import { Block } from '../../utils/Block';

export class ChangePassword extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('change-password')
    const inputsContainer = content.querySelector('#change-password__inputs')

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

    const buttonResult = handlebarsCompiler(Button(), { text: 'Изменить пароль' })

    const link = handlebarsCompiler(Link(), {
      text: 'Назад к настройкам аккаунта',
      href: '/settings',
    })

    return (
      `
      <div class="change-password-container">
      <div class="change-password__title">
        Сменить пароль
      </div>
      <form id="change-password__form" class="change-password__form" action="">
        <div id="change-password__inputs" class="change-password__form__inputs">
        </div>
        <div id="change-password__button" class="change-password__form__button">
        <p class='onSubmitMessage' id='onSubmitMessage'></p>
        ${buttonResult + link}
        </div>
      </form>
      </div>`
    )
  }
}
