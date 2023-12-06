import { AccData } from "../api/authorization"
import { Block } from "../utils/Block"
import { Props } from "../utils/Block/types"
import { EventBus } from "../utils/EventBus"


type State = {
  accData: AccData | null,

}

type Keys = keyof State
type Values = State[Keys]

export class Store extends EventBus {
  state: State = {
    accData: null,
  }
  static __instance: Store

  constructor() {
    super()
    if (Store.__instance) {
      return Store.__instance;
    }

    Store.__instance = this;
  }

  getState(stateKey: Keys) {
    return this.state[stateKey]
  }

  setState(stateKey: Keys, value: Values) {
    this.state[stateKey] = value
    this.emit(stateKey, value)
  }

}

export const observer = (Component: typeof Block, subKeys: Keys[]) => {
  return class extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any) {
      super(...args);
      const store = new Store()

      subKeys.forEach(key => {
        store.on(key, () => {
          this.setProps({ ...store.getState(key) as Props });
        })
      })

    }
  }
}
