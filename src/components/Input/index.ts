import { Block } from '../../utils/Block'
import './style.scss'
export class Input extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.setAttribute("name", String(this.props.props?.name))
    content.setAttribute("placeholder", String(this.props.props?.placeholder))
    content.setAttribute("type", 'text')
    content.classList.add(String(this.props.props?.className))
  }

}
