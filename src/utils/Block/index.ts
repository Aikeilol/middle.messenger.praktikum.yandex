import { EventBus } from './../EventBus/index';
import { Meta, Props } from './types/index';


export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement | null = null
  _meta: Meta | null = null
  props: Props
  _isFirstRender: boolean = true
  eventBus: () => InstanceType<typeof EventBus>

  constructor(tagName = "div", props: Props = { props: {}, events: {} }) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };


    this.eventBus = () => eventBus;
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: InstanceType<typeof EventBus>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta as Meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {

  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    this._removeEvents()
    this._render();
    this.componentDidUpdate();
  }


  componentDidUpdate() {

  }

  setProps = (nextProps: Props['props'] = {}) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props.props as Props || {}, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU)
  };

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      if (eventName === 'blur') {
        const inputs = this.getContent().querySelectorAll('input')
        inputs.forEach(input => input.addEventListener(eventName, events[eventName]))
        return
      }

      this.getContent().addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      if (eventName === 'blur') {
        const inputs = this.getContent().querySelectorAll('input')
        inputs.forEach(input => input.removeEventListener(eventName, events[eventName]))
        return
      }

      this.getContent().removeEventListener(eventName, events[eventName]);
    });
  }

  _render() {
    const block = this.render();
    this._element!.innerHTML = String(block);
    if (this._isFirstRender) {
      this.dispatchComponentDidMount()
      this._isFirstRender = false
    }
    this._addEvents()
  }

  render() {
    return ''
  }

  getContent() {
    return this.element as HTMLElement;
  }

  _makePropsProxy(props: Props = {}) {
    const eventBus = this.eventBus
    return new Proxy(props, {
      get(target, prop) {
        const targetType = target as Props['events'] | Props['props']
        const value = targetType?.[prop]
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const targetType = target as Required<Props>['events'] | Required<Props>['props']
        targetType[prop] = value;
        eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: Meta['tagName']) {
    return document.createElement(tagName);
  }

  show() {
    document.querySelector('#content')?.append(this.getContent())
  }

  hide() {
    this.getContent().remove()
  }
}
