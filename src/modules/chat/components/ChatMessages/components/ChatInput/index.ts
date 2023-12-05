import { Input } from '../../../../../../components/Input'
import { Block } from '../../../../../../utils/Block'
import { inputValidation } from '../../../../../../utils/validation'
import addFile from './img/addFile.svg'
import './style.scss'

export class ChatInput extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('ChatInput')

    const input = new Input('input', {
      props: {
        name: 'message',
        value: "",
        className: "ChatInput_input",
        autocomplete: "off",
        placeholder: 'Введите сообщение'
      },
      events: {
        blur: inputValidation
      }
    }).getContent()

    content.querySelector('.ChatInput__container')?.append(input)

  }

  render(): string {

    return (
      `
      <img class="ChatInput__img" src=${addFile} />
      <div class='ChatInput__container'></div>
      <button class="ChatInput__menu" >
      Отправить
    </button>
     `
    )
  }

}
