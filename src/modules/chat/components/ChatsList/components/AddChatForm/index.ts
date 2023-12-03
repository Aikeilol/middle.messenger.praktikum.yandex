import { Input } from "../../../../../../components/Input";
import { Block } from "../../../../../../utils/Block";
import { inputValidation } from "../../../../../../utils/validation";
import './style.scss'


export class AddChatForm extends Block {

  componentDidMount(): void {
    this.getContent().classList.add('chat__list__search')
    
    const input = new Input('input', {
      props: {
        name: 'chat-name',
        placeholder: "",
        className: "search-input"
      },
      events: {
        blur: inputValidation
      }
    }).getContent()
    this.getContent().insertBefore(input,this.getContent().querySelector('button'))
  }

  render(): string {
    return (
      `
      <img class="chat__list__img">
      <button id='create-chat'>Создать чат</button>
    `
    )
  }
}