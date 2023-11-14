import { AccountDataForm } from "./components/AccountDataForm";


const accountDataForm = new AccountDataForm('form')


document.querySelector<HTMLDivElement>('#account')?.append(accountDataForm.getContent()) 
