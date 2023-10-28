import './style.scss'

export const ChatItem = () => {
  return (
    `<div class="chat-card">
    <div class="chat-card__img"></div>
    <div class="chat-card__description">
      <div class="chat-card__description__name">
        {{chatName}}
      </div>
      <div class="chat-card__description__text">
        {{chatDescription}}
      </div>
    </div>
    <div class="chat-card__other">
      <div class="chat-card__other__time">{{chatDate}}</div>
      <div class="chat-card__other__count">{{messageCount}}</div>
    </div>
    </div>`
  )
} 