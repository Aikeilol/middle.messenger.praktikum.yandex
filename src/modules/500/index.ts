
import { ErrorsPage } from '../../components/ErrorsBlock';
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';


const container = document.querySelector('#container')

const error = handlebarsCompiler(ErrorsPage(), {
  number: '500',
  errorText: 'Просим прощения, в данный момент мы улучшаем наш сервис',
  text: 'Назад к чатам',
  href: '/',
})

container!.innerHTML = error