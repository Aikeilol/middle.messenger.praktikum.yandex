import { EventBus } from "../../../utils/EventBus"


export class Websocket extends EventBus {
  websocket

  constructor(userId: string, chatId: number, token: string) {
    super()
    this.websocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)

    this.websocket.addEventListener('message', event => {
      this.emit('message', event.data)
      console.log('Получены данные', event.data);
    })

  }

  sendMessage(message: string) {
    this.websocket.send(JSON.stringify({
      content: message,
      type: 'message',
    }))
  }
}