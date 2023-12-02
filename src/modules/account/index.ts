import { Block } from "../../utils/Block";
import { inputValidation } from "../../utils/validation";
import { changeDataSubmit } from "./changeDataSubmit";
import { AccountDataForm } from "./components/AccountDataForm";
import { onLogout } from "./onLogout";
import './style.scss'

export class Account extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('account')
    const accountDataForm = new AccountDataForm('form', {
      props: {},
      events: {
        submit: changeDataSubmit,
        blur: inputValidation,
        click: onLogout
      }
    })
    content.append(accountDataForm.getContent())
  }

}

