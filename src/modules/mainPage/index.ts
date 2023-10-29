import { pages } from './config/index';
import './style.scss'
import { handlebarsCompiler } from '../../utils/handelbarsCompiler';

const template = `
  <li>
    <a href={{href}} class="">{{text}}</a>
  </li>
`


const links = `<ul> ${pages.map(page => {
  return handlebarsCompiler(template, { text: page.text, href: page.href })
}).join('')} </ul>`

const html = `<nav>${links}</nav>`


document.querySelector<HTMLDivElement>('#app')!.innerHTML = html


