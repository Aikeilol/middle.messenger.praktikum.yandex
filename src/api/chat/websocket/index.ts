import { EventBus } from "../../../utils/EventBus"

export type Message = {
  content: string
  id: number
  time: string
  type: string
  user_id: number
}

export type OldMessages = Message[]

export class Websocket extends EventBus {
  websocket

  constructor(userId: string, chatId: number, token: string, callback: (data: string) => void) {
    super()
    this.websocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)

    this.websocket.addEventListener('message', event => {
      callback(event.data)
    })

    this.websocket.addEventListener('open', () => {
      this.getMessages()
    })

  }

  getMessages() {
    this.websocket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }))
  }

  sendMessage(message: string) {
    this.websocket.send(JSON.stringify({
      content: message,
      type: 'message',
    }))
  }

  close() {
    this.websocket.close()
  }
}
