import { ChatApi } from "../../../../../../../api/chat"



export const onAddChat = (e: Event) => {
  e.preventDefault()
  const target = e.target as HTMLFormElement

  if (target.getAttribute('id') === 'create-chat') {
    const inputValue = document.getElementsByName('chat-name')[0] as HTMLInputElement

    return new ChatApi().createChat({ title: inputValue.value })
  }
}
