import { HTTPTransport } from "../../utils/HTTPTransport";
import { GetChatData, GetChatsKeys } from "./types";



export class ChatApi {
  _HTTPTransport = new HTTPTransport()

  getChats(data: GetChatsKeys) {
    return this._HTTPTransport.get('/chats', { data }) as Promise<GetChatData>
  }

  createChat(data: { title: string }) {
    return this._HTTPTransport.post('/chats', { data }) as Promise<{ reason?: string }>
  }

  getChatToken(id: number) {
    return this._HTTPTransport.post(`/chats/token/${id}`) as Promise<{ token: string }>
  }

  addUserInChat(userIds: number[], chatId: number) {
    return this._HTTPTransport.put(`/chats/users`, {
      data: {
        users: userIds,
        chatId
      }
    }) as Promise<{ reason?: string }>
  }

  deleteUserFromChat(userIds: number[], chatId: number) {
    return this._HTTPTransport.delete(`/chats/users`, {
      data: {
        users: userIds,
        chatId
      }
    }) as Promise<{ reason?: string }>
  }
}
