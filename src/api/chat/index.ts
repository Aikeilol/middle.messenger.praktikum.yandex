import { HTTPTransport } from "../../utils/HTTPTransport";
import { getChatData, getChatsKeys } from "./types";



export class ChatApi {
  _HTTPTransport = new HTTPTransport()

  getChats(data: getChatsKeys) {
    return this._HTTPTransport.get('/chats', { data }) as Promise<getChatData>
  }

  createChat(data: { title: string }) {
    return this._HTTPTransport.post('/chats', { data }) as Promise<{ reason?: string }>
  }

  getChatToken(id: number) {
    return this._HTTPTransport.post(`/chats/token/${id}`) as Promise<{ token: string }>
  }
}
