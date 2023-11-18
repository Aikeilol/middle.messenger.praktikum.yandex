import { Input } from "../../../../components/Input"
import { Block } from "../../../../utils/Block"
import { inputValidation } from "../../../../utils/validation"
import { ChatItem } from "./components/ChatItem"
import { chatItems } from "./config"
import './style.scss'


export class ChatsList extends Block {


  componentDidMount() {
    const content = this.getContent()
    const input = new Input('input', {
      props: {
        name: 'search',
        placeholder: "Поиск",
        className: "search-input"
      },
      events: {
        blur: inputValidation
      }
    }).getContent()
    content.querySelector('.chat__list__search')?.append(input)
    chatItems.forEach(item => {
      const chatItem = new ChatItem('div', { props: item })
      this.getContent().querySelector('.chat__list__chats')?.append(chatItem.getContent())
    })
  }

  render(): string {
    return (`
    <div class="chat__list__search">
      <div class="chat__list__img"></div>

    </div>
    <div class="chat__list__chats" >

    </div>
  `)
  }
}
