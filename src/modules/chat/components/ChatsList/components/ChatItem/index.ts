import { ChatData } from '../../../../../../api/chat/types';
import { Block } from '../../../../../../utils/Block';
import './style.scss'

export class ChatItem extends Block {

  render(): string {
    const { avatar, id, unread_count, last_message } = this.props.props as ChatData

    return (
      `<div id=${id} class="chat-card">
      ${avatar
        ? `<img src=https://ya-praktikum.tech/api/v2/resources${avatar} class="chat-card__img"/>`
        : '<img class="chat-card__img"/>'}
      <div class="chat-card__description">
        <div class="chat-card__description__name">
          ${this.props.props?.title}
        </div>
        <div class="chat-card__description__text">
          ${last_message?.content ? last_message.content : ''}
        </div>
      </div>
      <div class="chat-card__other">
        <div class="chat-card__other__time"></div>
        ${unread_count ? `<div class="chat-card__other__count">${this.props.props?.unread_count}</div>` : ''}
      </div>
      </div>`
    )
  }
} 
