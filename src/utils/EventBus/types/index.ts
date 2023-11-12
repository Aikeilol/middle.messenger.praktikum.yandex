export type event = string
export type listeners = Record<string, Array<(...args: unknown[]) => void>> 
