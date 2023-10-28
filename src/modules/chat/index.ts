import { ChatMessages } from './components/ChatMessages';
import { ChatsList } from './components/ChatsList';
// import './style.scss'

const html = ChatsList() + ChatMessages()


document.querySelector<HTMLDivElement>('#chat')!.innerHTML = html
