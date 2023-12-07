import { ChatApi } from './../../../../api/chat/index';
import { Block } from '../../../../utils/Block'
import { formValidation } from '../../../../utils/validation'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'
import { MessageBlock } from './components/MessageBlock'
import './style.scss'

export class ChatMessages extends Block {

  renderChatHeader() {
    const chatHeader = new ChatHeader('form', {
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          const event = e as SubmitEvent
          const submiterId = event.submitter?.getAttribute('id')
          const form = event.target as HTMLFormElement
          const userId = Number(form.querySelector('input')?.value)

          if (submiterId === 'add') {
            new ChatApi().addUserInChat([userId], Number(this.props.props?.chatId))
          } else {
            new ChatApi().deleteUserFromChat([userId], Number(this.props.props?.chatId))
          }
        }
      }
    })

    return chatHeader.getContent()
  }

  renderMessageBlock() {
    const messageBlock = new MessageBlock('div', {
      props: {
        messages: this.props.props?.messages || []
      }
    })

    return messageBlock.getContent()
  }

  renderChatInput() {

    const chatInput = new ChatInput('form', {
      events:
      {
        submit: (e: Event) => {
          const sendMessage = this.props.props?.sendMessage as (message: string) => void
          const message = formValidation(e)?.message
          if (message) {
            sendMessage(message as string)
          }
        }
      }
    })

    return chatInput.getContent()
  }

  componentDidMount() {


    this.getContent().classList.add('chat__message-block')

    this.getContent().append(this.renderChatHeader(), this.renderMessageBlock(), this.renderChatInput())
  }

  componentDidUpdate(): void {

    this.getContent().append(this.renderChatHeader(), this.renderMessageBlock(), this.renderChatInput())
  }

}
