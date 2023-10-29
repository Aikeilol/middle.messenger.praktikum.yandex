import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'
import { MessageBlock } from './components/MessageBlock'
import './style.scss'

export const ChatMessages = () => {

  return (
    `<div class="chat__message-block" >
      ${ChatHeader() + MessageBlock() + ChatInput()}
    </div>`
  )
}
