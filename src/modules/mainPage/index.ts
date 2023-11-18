import { pages } from './config/index';
import './style.scss'
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Block } from '../../utils/Block';


class MainPage extends Block {

  render(): string {
    const template = `
    <li>
      <a href={{href}} class="">{{text}}</a>
    </li>`

    return (
      `<ul> ${pages.map(page => {
        return handlebarsCompiler(template, { text: page.text, href: page.href })
      }).join('')} </ul>`
    )
  }
}


document.querySelector<HTMLDivElement>('#app')?.append(
  new MainPage('nav').getContent()
)
