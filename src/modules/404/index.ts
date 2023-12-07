
import { ErrorsPage } from '../../templates/ErrorsBlock';
import { Block } from '../../utils/Block';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';
import './style.scss'


export class Error400 extends Block {

  componentDidMount(): void {
    this.getContent().classList.add('errors')
  }

  render(): string {
    return handlebarsCompiler(ErrorsPage(), {
      number: '404',
      errorText: 'Не туда попали',
      text: 'Назад к чатам',
      href: '/',
    })
  }
}

