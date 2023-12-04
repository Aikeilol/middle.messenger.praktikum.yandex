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
      this.setProps({
        chatData: [...this.props.props?.chatData || [], ...res]
      })
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
    console.log(id)
    new ChatApi().getChatToken(id).then((res) => {
      this.selectedChatToken = res.token
      // const websocket = new Websocket(String(new Store().getState('accData')?.id || 0), this.selectedChatId, this.selectedChatToken)
      // setTimeout(() => websocket.sendMessage('pepega'), 1000)
      this.setProps({
        userId: String(new Store().getState('accData')?.id || 0),
        chatId: id,
        token: this.selectedChatToken
      })
    })
  }

  renderChatMessages() {
    const chatMessages = new ChatMessages('div', {
      props: {
        userId: String(new Store().getState('accData')?.id || 0),
        chatId: this.props.props?.selectedChatId,
        token: this.props.props?.selectedChatToken
      }
    })
    return chatMessages.getContent()
  }

  renderChatList() {
    const chatsList = new ChatsList('div', {
      props: {
        getSingleChat: () => {
          this.getSingleChat().then(() => {
            this.setProps({ chatData: this.props.props?.chatData })
          })
        },
        getSelectedChatId: this.getSelectedChatId,
        chatData: this.props.props?.chatData || []
      },
      events: {
        click: (e: Event) => {
          e.preventDefault()
          const event = e.target as HTMLLinkElement
          const id = event.getAttribute('id')
          if (id === 'load-more') {
            this.getChats().then(() => {
              this.setProps({ chatData: this.props.props?.chatData })
            })
          }
        }
      }
    })

    chatsList.getContent().classList.add('chat__list')

    return chatsList.getContent()
  }

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('chat')

    this.getChats().then(() => {
      this.setProps({ chatData: this.props.props?.chatData })
    })

    content.append(this.renderChatList(), this.renderChatMessages())
  }

  componentDidUpdate(): void {
    const content = this.getContent()

    content.append(this.renderChatList(), this.renderChatMessages())
  }

}

// document.querySelector<HTMLDivElement>('#content')!.append(new Chat().getContent())
