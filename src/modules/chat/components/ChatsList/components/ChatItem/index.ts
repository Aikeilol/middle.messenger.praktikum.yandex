import { Block } from '../../../../../../utils/Block';
import './style.scss'

export class ChatItem extends Block {

  render(): string {
    return (
      `<div class="chat-card">
      <div class="chat-card__img"></div>
      <div class="chat-card__description">
        <div class="chat-card__description__name">
          ${this.props.props?.chatName}
        </div>
        <div class="chat-card__description__text">
          ${this.props.props?.chatDescription}
        </div>
      </div>
      <div class="chat-card__other">
        <div class="chat-card__other__time">${this.props.props?.chatDate}</div>
        <div class="chat-card__other__count">${this.props.props?.messageCount}</div>
      </div>
      </div>`
    )
  }
} 
