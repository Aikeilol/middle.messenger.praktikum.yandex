import { addFormValidation } from './../../../../utils/validation/index';
import { Input } from '../../../../components/Input'
import { Block } from '../../../../utils/Block'
import { formInputs } from './config'
import './style.scss'

export const AccountDataForm1 = () => {


}

export class AccountDataForm extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('account-settings')
    const form: HTMLFormElement = content as HTMLFormElement
    const inputs = content.querySelectorAll('input')
    addFormValidation(form, inputs)

  }

  render(): string {
    const inputs = formInputs.map(input => {
      return (
        `
        <div class="account-settings__setting">
          <p class="">${input.title}</p>
          ${Input(input)}
        </div>
        `
      )
    })

    return (
      `
      <label class="custom-file-upload">
        <input name="avatar" type="file" />
      </label>
      ${inputs.join('')}
      <div class="account-settings__setting_blue account-settings__setting">
        <button class="">Изменить данные</button>
      </div>
      <div class="account-settings__setting_red account-settings__setting">
        <p class="">Выйти</p>
      </div>
    `
    )
  }
}
