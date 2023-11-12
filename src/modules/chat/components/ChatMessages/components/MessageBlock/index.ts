import { Block } from '../../../../../../utils/Block'
import { mocChatMessage } from './config'
import './style.scss'

export class MessageBlock extends Block {

  componentDidMount(): void {
    const messages = mocChatMessage.map((message) => {
      return (
        ` <p class="messageBlock__message messageBlock__message_${message.position}">
          <span class="messageBlock__message_color">${message.text}</span>
        </p>
        `
      )
    }).join('')
    this.getContent().classList.add('messageBlock')
    this.getContent()!.innerHTML = messages
  }
}
