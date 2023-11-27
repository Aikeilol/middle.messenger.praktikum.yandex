import { Block } from "../utils/Block";
import { Authorization } from "../modules/authorization";
import { AccountDataForm } from "../modules/account/components/AccountDataForm";
import { Registration } from "../modules/registration";
import { Chat } from "../modules/chat";

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
  _props: Record<string, unknown>
  constructor(pathname: string, view: typeof Block, props: Record<string, unknown>) {
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
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

class Router {
  constructor(rootQuery) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname, block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this
  }

  start() {
    window.onpopstate = event => {
      this._onRoute(event.currentTarget.location.pathname);
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
    route.render(route, pathname);
  }

  go(pathname) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this._onRoute(this.history.back())
  }

  forward() {
    this._onRoute(this.history.forward())
  }

  getRoute(pathname: string) {
    console.log(this.routes)
    return this.routes.find(route => route.match(pathname));
  }
}


history.pushState({}, '', '/');

const router = new Router("#content");

router
  .use("/", Chat)
  .use('/registration', Registration)
  // .use("/users", Users)
  .start()
  
