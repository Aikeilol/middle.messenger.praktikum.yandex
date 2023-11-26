import merge from "./objectMerger"

type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {

  if (typeof object !== 'object') {
    return object
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  const valueObj = path.split('.').reduceRight((acc, item) => {
    return { [item]: acc }
  }, value)

  return merge(object as Indexed, valueObj as Indexed)
}
