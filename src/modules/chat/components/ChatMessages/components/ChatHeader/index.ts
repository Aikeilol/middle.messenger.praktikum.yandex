import { Input } from '../../../../../../components/Input';
import { Block } from '../../../../../../utils/Block';
import { inputValidation } from '../../../../../../utils/validation';
import './style.scss';

export class ChatHeader extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    const input = new Input('input', {
      props: {
        name: 'addUser',
        value: "",
        className: "ChatHeader_input",
        autocomplete: "off",
        placeholder: 'Введите id пользователя'
      },
      events: {
        blur: inputValidation
      }
    }).getContent()

    content.querySelector('.ChatHeader__form')?.prepend(input)
  }

  render(): string {
    return (
      `<div class="ChatHeader">
        <div class="ChatHeader__form">
          <button id='add' class='ChatHeader__form__button'>Добавить</button>
          <button id='remove' class='ChatHeader__form__button ChatHeader__form__button_remove'>Удалить</button>
        </div>
      </div>`
    )
  }
}
