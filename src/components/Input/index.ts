import { Block } from '../../utils/Block'
import './style.scss'
export class Input extends Block {

  componentDidMount(): void {
    const content = this.getContent()
    content.setAttribute("name", String(this.props.props?.name))
    content.setAttribute("value", String(this.props.props?.value))
    content.setAttribute("type", 'text')
    content.setAttribute("placeholder", this.props.props?.placeholder ? String(this.props.props.placeholder) : '')
    content.setAttribute('autocomplete', this.props.props?.autocomplete ? String(this.props.props.autocomplete) : 'on')
    content.classList.add(String(this.props.props?.className))
  }

}
