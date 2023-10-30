import { Input } from '../../../../../../components/Input'
import addFile from './img/addFile.svg'
import './style.scss'

export const ChatInput = () => {

  return (
    `<div class="ChatInput">
     <img class="ChatInput__img" src=${addFile} /> 
     ${Input({ name: 'message', placeholder: "Наберите текст...", className: "ChatInput_input" })}
    <div class="ChatInput__menu">
        Отправить
    </div>
  </div>`
  )
}
