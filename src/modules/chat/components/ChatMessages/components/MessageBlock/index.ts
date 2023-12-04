import { oldMessages } from '../../../../../../api/chat/websocket'
import { Store } from '../../../../../../store'
import { Block } from '../../../../../../utils/Block'
import './style.scss'

export class MessageBlock extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    const propsMessages = this.props.props?.messages as oldMessages

    propsMessages.sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime() 
    })

    const messages = propsMessages.map((message) => {
      const position = new Store().getState('accData')?.id === message.user_id ? 'right' : 'left'
      return (
        ` <p class="messageBlock__message messageBlock__message_${position}">
          <span class="messageBlock__message_color">${message.content}</span>
        </p>
        `
      )
    }).join('')
    content.classList.add('messageBlock')
    content!.innerHTML = messages
    setTimeout(() => {
      content.scrollTo(0, content.scrollHeight)
    }, 0)
  }
}
