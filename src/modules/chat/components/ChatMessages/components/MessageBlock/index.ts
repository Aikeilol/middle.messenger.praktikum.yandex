import { mocChatMessage } from './config'
import './style.scss'

export const MessageBlock = () => {

  const messages = mocChatMessage.map((message) => {
    return (
      ` <p class="messageBlock__message messageBlock__message_${message.position}">
        <span class="messageBlock__message_color">${message.text}</span>
      </p>
      `
    )
  })

  return (
    `<div class="messageBlock">
      ${messages.join('')}
    </div>`
  )
}
