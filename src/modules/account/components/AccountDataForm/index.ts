import { validation } from './../../../../utils/validation/index';
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
    const form = content
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