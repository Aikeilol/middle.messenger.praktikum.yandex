
export type meta = {
  tagName: string
  props: props
}

export type props = {
  props?: Record<symbol | string, unknown>
  events?: Record<symbol | string, (event: Event) => void>
}
