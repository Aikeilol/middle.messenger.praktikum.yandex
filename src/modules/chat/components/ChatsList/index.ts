import { Input } from "../../../../components/Input"
import { handlebarsCompiler } from "../../../../utils/handelbarsCompiler"
import { ChatItem } from "./components/ChatItem"
import { chatItems } from "./config"
import './style.scss'


export const ChatsList = () => {

  const chats = chatItems.map(item => handlebarsCompiler(ChatItem(), item)).join('')

  return (`
  <div class="chat__list">
    <div class="chat__list__search">
    <div class="chat__list__img"></div>
      ${Input({name:'search', placeholder: "Поиск", className: "search-input"})}
    </div>
    <div class="chat__list__chats">
      ${chats}
    </div>
  </div>`
  )
}