
export type Meta = {
  tagName: string
  props: Props
}

export type Props = {
  props?: Record<symbol | string, unknown>
  events?: Record<symbol | string, (event: Event) => void>
}
