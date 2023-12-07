
import { ErrorsPage } from '../../templates/ErrorsBlock';
import { Block } from '../../utils/Block';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import './style.scss'
export class Error500 extends Block {

  componentDidMount(): void {
    this.getContent().classList.add('errors')
  }

  render(): string {
    return handlebarsCompiler(ErrorsPage(), {
      number: '500',
      errorText: 'Просим прощения, в данный момент мы улучшаем наш сервис',
      text: 'Назад к чатам',
      href: '/',
    })
  }
}

