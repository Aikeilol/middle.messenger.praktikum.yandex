import { accData } from "../api/authorization"


interface IStore {
  state: {
    accData: accData | null
    subscribers: Record<keyof IStore['state'], (state: unknown) => void> | null
  }
}

export class Store implements IStore {
  state = {
    accData: null,
    subscribers: null
  }

  setState(stateKey: keyof IStore['state'], value: unknown) {

  }

}
