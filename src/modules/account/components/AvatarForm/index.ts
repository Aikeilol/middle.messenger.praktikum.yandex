import { Store, observer } from "../../../../store";
import { Block } from "../../../../utils/Block";
import './style.scss'


export class avatarForm extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.classList.add('avatar-container')
  }

  render(): string {
    const avatarUrl = new Store().getState('accData')?.avatar
    return (
      `<div class="personal-image">
  <label class="label">
    <input id='avatar' name='avatar' type="file" />
    <figure class="personal-figure">
      <img src=https://ya-praktikum.tech/api/v2/resources${avatarUrl} 
      class="personal-avatar" alt="avatar">
      <figcaption class="personal-figcaption">
        <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png">
      </figcaption>
    </figure>
  </label>
  <button class='change-avatar-button'>Поменять Аватар</button>
</div>`
    )
  }
}

export const AvatarForm = observer(avatarForm, ['accData'])
