import { Block } from '../../../../utils/Block'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'
import { MessageBlock } from './components/MessageBlock'
import './style.scss'

export class ChatMessages extends Block {

  componentDidMount() {
    const chatHeader = new ChatHeader('div').getContent()
    const messageBlock = new MessageBlock('div').getContent()
    const chatInput = new ChatInput('div').getContent()
    this.getContent().classList.add('chat__message-block')
    this.getContent().append(chatHeader, messageBlock, chatInput)
  }
}
