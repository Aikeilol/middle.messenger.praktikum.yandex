import { accData } from "../api/authorization"
import { Block } from "../utils/Block"
import { props } from "../utils/Block/types"
import { EventBus } from "../utils/EventBus"


type state = {
  accData: accData | null
}

type keys = keyof state
type values = state[keys]

export class Store extends EventBus {
  state: state = {
    accData: null,
  }
  static __instance: any

  constructor() {
    super()
    if (Store.__instance) {
      return Store.__instance;
    }

    Store.__instance = this;
  }

  getState(stateKey: keys) {
    return this.state[stateKey]
  }

  setState(stateKey: keys, value: values) {
    this.state[stateKey] = value
    this.emit(stateKey, value)
  }

}

export const observer = (Component: typeof Block, subKeys: keys[]) => {
  return class extends Component {
    constructor(...args: any) {
      super(...args);
      const store = new Store()

      subKeys.forEach(key => {
        store.on(key, () => {
          this._componentDidUpdate({ ...store.getState(key) as props });
        })
      })

    }
  }
}
