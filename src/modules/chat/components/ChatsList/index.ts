import { getChatData } from "../../../../api/chat/types"
import { Block } from "../../../../utils/Block"
import { AddChatForm } from "./components/AddChatForm"
import { onAddChat } from "./components/AddChatForm/onAddChat"
import { ChatItem } from "./components/ChatItem"
import './style.scss'


export class ChatsList extends Block {

  renderChats() {
    const chatData = this.props.props?.chatData as getChatData
    chatData.forEach(chat => {
      const chatItem = new ChatItem('div', {
        props: {
          ...chat,
        },
        events: {
          click: (e: Event) => {
            const target = e.target as HTMLDivElement
            const id = target.getAttribute('id')
            const getSelectedChatId = this.props.props?.getSelectedChatId as (id: number) => void
            getSelectedChatId(Number(id))
          }
        }
      })
      this.getContent().querySelector('.chat__list__chats')?.append(chatItem.getContent())
    })
  }

  renderInput() {
    const addChatForm = new AddChatForm('form', {
      events: {
        click: (e: Event) => {
          onAddChat(e)?.then(() => {
            const getSingleChat = this.props.props?.getSingleChat as () => void
            getSingleChat()
          })
        }
      }
    })
    this.getContent().prepend(addChatForm.getContent())
  }

  componentDidMount() {

    this.renderInput()
    this.renderChats()
    // new ChatApi().createChat({ title: '1234' })
  }

  componentDidUpdate(): void {
    this.renderInput()
    this.renderChats()
  }

  render(): string {
    return (`
    <div class="chat__list__chats" >

    </div>
    <button id='load-more' class='chat__load-more'>Загрузить еще</button>

  `)
  }
}
