import { pages } from './config/index';
import './style.scss'
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import { Block } from '../../utils/Block';


export class MainPage extends Block {

  componentDidMount(): void {
    this.getContent().classList.add('menu')
  }

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

