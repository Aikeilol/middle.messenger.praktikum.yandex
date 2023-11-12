import { Input } from '../../../../../../components/Input'
import { Block } from '../../../../../../utils/Block'
import addFile from './img/addFile.svg'
import './style.scss'

export class ChatInput extends Block {

  render(): string {
    return (
      `<form class="ChatInput">
       <img class="ChatInput__img" src=${addFile} /> 
       ${Input({ name: 'message', placeholder: "Наберите текст...", className: "ChatInput_input" })}
      <button class="ChatInput__menu" >
        Отправить
      </button>
    </form>`
    )
  }

}
