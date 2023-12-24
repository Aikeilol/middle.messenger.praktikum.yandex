import { AuthorizationApi } from "../../api/authorization";
import { Store } from "../../store";
import { Block } from "../../utils/Block";
import { Props } from "../../utils/Block/types";

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: InstanceType<typeof Block>) {
  const root = document.querySelector(query);
  root?.append(block.getContent())
  return root;
}

class Route {
  _pathname: string
  _blockClass: typeof Block
  _block: InstanceType<typeof Block> | null
  _props: Props & { rootQuery: string, }
  isPrivat: boolean
  constructor(pathname: string, view: typeof Block, props: Props & { rootQuery: string, isPrivat: boolean }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this.isPrivat = props.isPrivat
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
      // document.querySelector('#content')!.removeChild(this._block.getContent())
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass('div', this._props.props);
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export class Router {
  routes: InstanceType<typeof Route>[] = []
  history = window.history;
  isAuth: boolean = false
  _currentRoute: InstanceType<typeof Route> | null = null;
  _rootQuery: string = ''
  static __instance: InstanceType<typeof Router>;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    const store = new Store()

    store.on('accData', () => {
      this.isAuth = !!store.getState('accData')
    })

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, isPrivat: boolean, block: typeof Block, props?: Props & { privat?: boolean }) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, isPrivat, props: props });
    this.routes.push(route);
    return this
  }

  start() {
    window.onpopstate = event => {
      const target = event.currentTarget as typeof window
      this._onRoute(target.location.pathname);
    };
    new AuthorizationApi().getAccData().then(res => {
      const store = new Store()
      store.setState('accData', res)
      this._onRoute(window.location.pathname);
    })
      .catch(err => console.log(err))
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    const isAccess = new Store().getState('accData')?.id
    if (!route) {
      return;
    }

    if (!isAccess && route.isPrivat) {
      this.go('/sign-in')
      return
    }

    if (isAccess && !route.isPrivat) {
      this.go('/messenger')
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this._onRoute(String(this.history.back()))
  }

  forward() {
    this._onRoute(String(this.history.forward()))
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}
