import { GetChatData } from "../../../../api/chat/types"
import { onLinkClick } from "../../../../router/onLinkClick"
import { Block } from "../../../../utils/Block"
import { AddChatForm } from "./components/AddChatForm"
import { onAddChat } from "./components/AddChatForm/onAddChat"
import { ChatItem } from "./components/ChatItem"
import './style.scss'


export class ChatsList extends Block {

  renderChats() {
    const chatData = this.props.props?.chatData as GetChatData
    chatData.forEach(chat => {
      const chatItem = new ChatItem('div', {
        props: {
          ...chat,
        },
        events: {
          click: () => {
            const getSelectedChatId = this.props.props?.getSelectedChatId as (id: number) => void
            getSelectedChatId(Number(chat.id))
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
          onLinkClick(e)
          onAddChat(e)?.then((res) => {
            if (!res.reason) {
              const getSingleChat = this.props.props?.getSingleChat as () => void
              getSingleChat()
            }
          })
            .catch(err => console.log(err))
        },
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
