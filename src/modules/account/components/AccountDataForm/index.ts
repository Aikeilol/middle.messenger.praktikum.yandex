import { Input } from '../../../../components/Input'
import { formInputs } from './config'
import './style.scss'

export const AccountDataForm = () => {

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
    <form class="account-settings">
    <label class="custom-file-upload">
      <input name="avatar" type="file" />
    </label>
    ${inputs.join('')}
    <div class="account-settings__setting_blue account-settings__setting">
      <p class="">Изменить данные</p>
    </div>
    <div class="account-settings__setting_red account-settings__setting">
      <p class="">Выйти</p>
    </div>
  </form>
  `
  )
}