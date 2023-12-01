import { Input } from '../../../../components/Input'
import { formInputs } from './config'
import './style.scss'
import { Block } from '../../../../utils/Block';
import { inputValidation } from '../../../../utils/validation';
import { Store, observer } from '../../../../store';
import { accData } from '../../../../api/authorization';


export class accountDataForm extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('account-settings')
    const allinputs = content.querySelectorAll('.account-settings__setting')
    const accData = new Store().getState('accData')
    formInputs.map((input, i) => {
      const htmlInput = new Input('input', {
        props: {
          ...input,
          placeholder: accData?.[input.name as keyof accData] || ''
        },
        events: {
          blur: inputValidation
        }
      }).getContent()
      allinputs?.[i].append(htmlInput)
    })
  }

  componentDidUpdate() {
    const content = this.getContent()
    const allinputs = content.querySelectorAll('.account-settings__setting')
    formInputs.map((input, i) => {
      const htmlInput = new Input('input', {
        props: {
          ...input,
          placeholder: this.props.props?.[input.name as keyof accData] || ''
        },
        events: {
          blur: inputValidation
        }
      }).getContent()
      allinputs?.[i].append(htmlInput)
    })
    return true
  }

  render(): string {
    const inputs = formInputs.map(input => {

      return (
        `
        <div class="account-settings__setting">
          <p class="">${input.title}</p>
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


export const AccountDataForm = observer(accountDataForm, ['accData'])