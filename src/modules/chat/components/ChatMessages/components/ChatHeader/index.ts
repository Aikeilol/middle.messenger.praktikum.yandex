import { Block } from '../../../../../../utils/Block';
import './style.scss';

export class ChatHeader extends Block {

  render(): string {
    return (
      `<div class="ChatHeader">
        <div class="ChatHeader__img">
  
        </div>
        <div class="ChatHeader__menu">
          <div class="ChatHeader__menu__dot"></div>
          <div class="ChatHeader__menu__dot"></div>
          <div class="ChatHeader__menu__dot"></div>
        </div>
      </div>`
    )
  }
}
