import { formValidation, inputValidation } from "../../utils/validation";
import { AccountDataForm } from "./components/AccountDataForm";


const accountDataForm = new AccountDataForm('form', {
  events: {
    submit: formValidation,
    blur: inputValidation
  }
})


document.querySelector<HTMLDivElement>('#account')?.append(accountDataForm.getContent()) 
