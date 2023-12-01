import { Block } from "../utils/Block";
import { Registration } from "../modules/registration";
import { Chat } from "../modules/chat";
import { props } from "../utils/Block/types";
import { MainPage } from "../modules/mainPage";
import { Account } from "../modules/account";
import { Error500 } from "../modules/500";
import { Error400 } from "../modules/404";
import { Authorization } from "../modules/authorization";
import { onLinkClick } from "./onLinkClick";
import { regOnSubmit } from "../modules/registration/regOnSubmit";
import { authOnSubmit } from "../modules/authorization/authOnSubmit";
import { AuthorizationApi } from "../api/authorization";
import { Store } from "../store";

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
  _props: props & { rootQuery: string }
  constructor(pathname: string, view: typeof Block, props: props & { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
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

class Router {
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

    new AuthorizationApi().getAccData().then(res => {
      store.setState('accData', res)
    })

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, props?: props) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, props: props });
    this.routes.push(route);
    return this
  }

  start() {
    window.onpopstate = event => {
      const target = event.currentTarget as typeof window
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
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


const router = new Router("#content");

router
  .use("/", MainPage, {
    events: {
      click: onLinkClick
    }
  })
  .use('/messenger', Chat)
  .use('/sign-up', Registration, {
    events: {
      submit: regOnSubmit,
      click: onLinkClick
    }
  })
  .use('/sign-in', Authorization, {
    events: {
      submit: authOnSubmit,
      click: onLinkClick
    }
  })
  .use('/settings', Account, {
    events: {
      click: onLinkClick
    }
  })
  .use('/500', Error500, {
    events: {
      click: onLinkClick
    }
  })
  .use('/404', Error400, {
    events: {
      click: onLinkClick
    }
  })
  .start()


export default router
