import { Block } from '../../utils/Block'
import './style.scss'

export class FormInput extends Block {

  render(): string {
    return (
      `<div class="input-container">
          <p class="input-container__name">${this.props.props?.title}</p>
          <input id='input' 
          name=${this.props.props?.name} type="text" class="input-container__input">
      </div>`
    )
  }
}
