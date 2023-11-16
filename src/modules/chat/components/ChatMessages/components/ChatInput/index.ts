import { Input } from '../../../../../../components/Input'
import { Block } from '../../../../../../utils/Block'
import { addFormValidation } from '../../../../../../utils/validation'
import addFile from './img/addFile.svg'
import './style.scss'

export class ChatInput extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    const form = content.querySelector("#ChatInputForm") as HTMLFormElement
    const inputs = content.querySelectorAll('input')
    addFormValidation(form, inputs)
  }

  render(): string {
    return (
      `<form id=ChatInputForm class="ChatInput">
       <img class="ChatInput__img" src=${addFile} /> 
       ${Input({ name: 'message', placeholder: "Наберите текст...", className: "ChatInput_input" })}
      <button class="ChatInput__menu" >
        Отправить
      </button>
    </form>`
    )
  }

}
