import { Block } from '../../../../../../utils/Block';
import './style.scss'

export class ChatItem extends Block {

  render(): string {
    return (
      `<div id=${this.props.props?.id} class="chat-card">
      ${this.props.props?.avatar
        ? `<img src=https://ya-praktikum.tech/api/v2/resources${this.props.props?.avatar} class="chat-card__img"/>`
        : '<img class="chat-card__img"/>'}
      <div class="chat-card__description">
        <div class="chat-card__description__name">
          ${this.props.props?.title}
        </div>
        <div class="chat-card__description__text">
          ${this.props.props?.chatDescription}
        </div>
      </div>
      <div class="chat-card__other">
        <div class="chat-card__other__time">${this.props.props?.chatDate}</div>
        ${this.props.props?.unread_count ? '<div class="chat-card__other__count">${this.props.props?.unread_count}</div>' : ''}
      </div>
      </div>`
    )
  }
} 
