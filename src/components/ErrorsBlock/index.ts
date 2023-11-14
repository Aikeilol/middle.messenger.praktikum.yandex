import { Link } from "../Link"
import './style.scss'

export const ErrorsPage = () => `
<h1 class="errors__number">{{number}}</h1>
<p class="errors__text">{{errorText}}</p>
${Link()}
`
