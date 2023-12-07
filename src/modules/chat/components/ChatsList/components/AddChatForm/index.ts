import { Input } from "../../../../../../components/Input";
import { Store } from "../../../../../../store";
import { Block } from "../../../../../../utils/Block";
import { inputValidation } from "../../../../../../utils/validation";
import './style.scss'


export class AddChatForm extends Block {

  componentDidMount(): void {
    this.getContent().classList.add('chat__list__search')

    const input = new Input('input', {
      props: {
        name: 'chat-name',
        value: "",
        className: "search-input",
        placeholder: 'Название нового чата'
      },
      events: {
        blur: inputValidation
      }
    }).getContent()
    this.getContent().insertBefore(input, this.getContent().querySelector('button'))
  }

  render(): string {
    const avatarUrl = new Store().getState('accData')?.avatar

    return (
      `
      <img href='/settings' src=https://ya-praktikum.tech/api/v2/resources${avatarUrl} class="chat__list__img">
      <button id='create-chat'>Создать чат</button>
    `
    )
  }
}
