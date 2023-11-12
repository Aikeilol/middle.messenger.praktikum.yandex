import { Input } from "../../../../components/Input"
import { Block } from "../../../../utils/Block"
import { ChatItem } from "./components/ChatItem"
import { chatItems } from "./config"
import './style.scss'


export class ChatsList extends Block {


  componentDidMount() {
    chatItems.forEach(item => {
     const chatItem = new ChatItem('div', item)
     this.getContent().querySelector('.chat__list__chats')?.append(chatItem.getContent())
    })
  }

  render(): string {
    return (`
    <div class="chat__list__search">
    <div class="chat__list__img"></div>
      ${Input({ name: 'search', placeholder: "Поиск", className: "search-input" })}
    </div>
    <div class="chat__list__chats" >

    </div>
  `)
  }
}
