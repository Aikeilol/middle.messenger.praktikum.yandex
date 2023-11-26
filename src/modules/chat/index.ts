import { Block } from '../../utils/Block';
import { ChatMessages } from './components/ChatMessages';
import { ChatsList } from './components/ChatsList';
import './style.scss'
// const chatsList = new ChatsList('div').getContent()
// chatsList?.classList.add('chat__list')
// const chatMessages = new ChatMessages('div').getContent()

export class Chat extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('chat')
    const chatsList = new ChatsList('div').getContent()
    chatsList?.classList.add('chat__list')
    const chatMessages = new ChatMessages('div').getContent()
    content.append(chatsList, chatMessages)
  }

}

document.querySelector<HTMLDivElement>('#content')!.append(new Chat().getContent())
