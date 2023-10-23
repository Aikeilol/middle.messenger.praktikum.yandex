
import { ErrorsPage } from '../../components/ErrorsBlock';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';


const container = document.querySelector('#container')

const error = handlebarsCompiler(ErrorsPage, {
  number: '404',
  errorText: 'Не туда попали',
  text: 'Назад к чатам',
  href: '/',
})

container!.innerHTML = error