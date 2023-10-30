import { ChatMessages } from './components/ChatMessages';
import { ChatsList } from './components/ChatsList';

const html = ChatsList() + ChatMessages()


document.querySelector<HTMLDivElement>('#chat')!.innerHTML = html
