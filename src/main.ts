import './style.scss'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter'
import * as Handlebars from 'handlebars'


const template = Handlebars.compile(`
<div>
  <a href="https://vitejs.dev" target="_blank">
    <img src="${viteLogo}" class="logo" alt="Vite logo" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
  </a>
  <h1>Vite + TypeScript 
    <a href="/src/pages/registration/index.html" class="">{{pepe}}</a>
    <a href="./src/pages/authorization/index.html" class="">{{pepe}}</a>
  </h1>
  <div class="card">
    <button id="counter" type="button"></button>
  </div>
  <p class="read-the-docs">
    Click on the Vite and TypeScript logos to learn more
  </p>
</div>
`);
const context = { pepe: 'asdadas' };
const html = template(context);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
