import { ChatApi } from '../../api/chat';
import { getChatData } from '../../api/chat/types';
import { Websocket } from '../../api/chat/websocket';
import { Store } from '../../store';
import { Block } from '../../utils/Block';
import { ChatMessages } from './components/ChatMessages';
import { ChatsList } from './components/ChatsList';
import './style.scss'

export class Chat extends Block {
  chatMessages!: InstanceType<typeof ChatMessages>
  offset = 0
  limit = 20
  chatData: getChatData | [] = []
  selectedChatId: number = 0
  selectedChatToken = ''

  getChats() {
    if (!this.offset) {
      this.offset = 0
    }
    if (!this.limit) {
      this.limit = 20
    }

    return new ChatApi().getChats({ offset: this.offset, limit: this.limit }).then(res => {
      this.chatData = [...this.chatData, ...res]
      this.offset = this.offset + this.limit
    })
  }

  getSingleChat() {
    return new ChatApi().getChats({ offset: 0, limit: 1 }).then(res => {

      this.chatData.unshift(res.shift() as never)
      // chatsList?.setProps({ chatData: this.chatData })
    })
  }

  getSelectedChatId(id: number) {
    this.selectedChatId = id
    new ChatApi().getChatToken(this.selectedChatId).then((res) => {
      this.selectedChatToken = res.token
      // const websocket = new Websocket(String(new Store().getState('accData')?.id || 0), this.selectedChatId, this.selectedChatToken)
      // setTimeout(() => websocket.sendMessage('pepega'), 1000)
      this.chatMessages.setProps({
        userId: String(new Store().getState('accData')?.id || 0),
        chatId: this.selectedChatId,
        token: this.selectedChatToken
      })
    })
  }

  renderChatMessages() {
    this.chatMessages = new ChatMessages('div', {
      props: {
        userId: String(new Store().getState('accData')?.id || 0),
        chatId: this.selectedChatId,
        token: this.selectedChatToken
      }
    })

    setTimeout(() => console.log(this.chatMessages), 12000)

    return this.chatMessages.getContent()
  }

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('chat')

    const chatsList = new ChatsList('div', {
      props: {
        getSingleChat: () => {
          this.getSingleChat().then(() => {
            chatsList.setProps({ chatData: this.chatData })
          })
        },
        getSelectedChatId: this.getSelectedChatId.bind(this),
        chatData: this.chatData || []
      },
      events: {
        click: (e: Event) => {
          e.preventDefault()
          const event = e.target as HTMLLinkElement
          const id = event.getAttribute('id')
          if (id === 'load-more') {
            this.getChats().then(() => {
              chatsList.setProps({ chatData: this.chatData })
            })
          }
        }
      }
    })

    this.getChats().then(() => {
      chatsList.setProps({ chatData: this.chatData })
    })
    chatsList.getContent().classList.add('chat__list')

    content.append(chatsList.getContent(), this.renderChatMessages())
  }

}

// document.querySelector<HTMLDivElement>('#content')!.append(new Chat().getContent())
