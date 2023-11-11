import { EventBus } from '../../utils/EventBus';
import { ChatMessages } from './components/ChatMessages';
import { ChatsList } from './components/ChatsList';

const html = ChatsList() + ChatMessages()
const eventBus = new EventBus()
eventBus.on('pepe', (one, two) => console.log(one, two))

eventBus.emit('pepe', 'jopa', 'siski')
document.querySelector<HTMLDivElement>('#chat')!.innerHTML = html
