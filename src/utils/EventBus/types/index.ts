export type Event = string
export type Listeners = Record<string, Array<(...args: unknown[]) => void>> 
