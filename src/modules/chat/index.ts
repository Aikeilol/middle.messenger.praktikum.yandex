import { ChatMessages } from './components/ChatMessages';
import { ChatsList } from './components/ChatsList';

const chatsList = new ChatsList('div').getContent()
chatsList?.classList.add('chat__list')
const chatMessages = new ChatMessages('div').getContent()

document.querySelector<HTMLDivElement>('#chat')!.append(chatsList, chatMessages)
