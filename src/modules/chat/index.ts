import { ChatApi } from '../../api/chat';
import { GetChatData } from '../../api/chat/types';
import { Websocket, Message, OldMessages } from '../../api/chat/websocket';
import { Store } from '../../store';
import { Block } from '../../utils/Block';
import { ChatMessages } from './components/ChatMessages';
import { ChatsList } from './components/ChatsList';
import './style.scss'

export class Chat extends Block {
  chatsList!: InstanceType<typeof ChatsList>
  chatMessages!: InstanceType<typeof ChatMessages>
  offset = 0
  limit = 20
  chatData: GetChatData | [] = []
  selectedChatId: number = 0
  selectedChatToken = ''
  websocket!: InstanceType<typeof Websocket>

  getChats() {
    if (!this.offset) {
      this.offset = 0
    }
    if (!this.limit) {
      this.limit = 20
    }

    return new ChatApi().getChats({ offset: this.offset, limit: this.limit }).then((res = []) => {
      const currentChatData = this.props.props?.chatData as GetChatData
      this.setProps({
        chatData: [...currentChatData || [], ...res]
      })
      this.offset = this.offset + this.limit
    })
      .catch(err => console.log(err))
  }

  getSingleChat() {
    return new ChatApi().getChats({ offset: 0, limit: 1 }).then(res => {
      const chatData = this.props.props?.chatData as GetChatData
      chatData.unshift(res?.[0] as never)
      this.setProps({
        chatData: chatData
      })

    })
      .catch(err => console.log(err))
  }

  setMessages(message: string) {
    const parsedMessage = JSON.parse(message) as Message | OldMessages
    const currentMessages = this.props.props?.messages as OldMessages
    if (Array.isArray(parsedMessage)) {
      this.setProps({
        messages: [...parsedMessage, ...currentMessages || [],]
      })
      return
    }

    currentMessages.push(parsedMessage)

    this.setProps({
      messages: currentMessages
    })

  }

  getSelectedChatId(id: number) {
    new ChatApi().getChatToken(id).then((res) => {
      this.props.props!.chatId = id
      if (this.websocket) {
        this.websocket.close()
        this.props.props!.messages = []
      }

      this.websocket = new Websocket(String(new Store().getState('accData')?.id || 0), id, res.token, this.setMessages.bind(this))

    })
      .catch(err => console.log(err))
  }

  renderChatMessages() {
    const chatMessages = new ChatMessages('div', {
      props: {
        messages: this.props.props?.messages,
        sendMessage: this.websocket?.sendMessage.bind(this.websocket),
        chatId: this.props.props?.chatId
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
          }).catch(err => console.log(err))
        },
        getSelectedChatId: this.getSelectedChatId.bind(this),
        chatData: this.props.props?.chatData || [],
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
              .catch(err => console.log(err))
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
      .catch(err => console.log(err))

    content.append(this.renderChatList(), this.renderChatMessages())
  }

  componentDidUpdate(): void {
    const content = this.getContent()

    content.append(this.renderChatList(), this.renderChatMessages())
  }

}

