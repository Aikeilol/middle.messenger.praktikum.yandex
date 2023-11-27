import { Block } from "../../utils/Block";
import { formValidation, inputValidation } from "../../utils/validation";
import { AccountDataForm } from "./components/AccountDataForm";
import './style.scss'
export class Account extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('account')
    const accountDataForm = new AccountDataForm('form', {
      events: {
        submit: formValidation,
        blur: inputValidation
      }
    })
    content.append(accountDataForm.getContent())
  }

}


