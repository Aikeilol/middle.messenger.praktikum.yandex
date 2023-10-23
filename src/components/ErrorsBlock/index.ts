import { Link } from "../Link"
import './style.scss'

export const ErrorsPage = `<div class="errors">
<p class="errors__number">{{number}}</p>
<p class="errors__text">{{errorText}}</p>
${Link}
</div>`