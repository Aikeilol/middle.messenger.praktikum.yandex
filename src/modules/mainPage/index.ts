import { pages } from './config/index';
import './style.scss'
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';

const template = `
<div>
  <h1>
    <a href={{href}} class="">{{text}}</a>
  </h1>
</div>
`


const html = pages.map(page => {
  return handlebarsCompiler(template, { text: page.text, href: page.href })
}).join('')


document.querySelector<HTMLDivElement>('#app')!.innerHTML = html


