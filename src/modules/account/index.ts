import { AccountDataForm } from "./components/AccountDataForm";


const html = AccountDataForm()


document.querySelector<HTMLDivElement>('#account')!.innerHTML = html
