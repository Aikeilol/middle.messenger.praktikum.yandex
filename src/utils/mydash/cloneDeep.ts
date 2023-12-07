function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {

    if (item === null || typeof item !== "object") {
      return item;
    }

    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    if (item instanceof Array) {
      const copy: unknown[] = [];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    if (item instanceof Set) {
      const copy = new Set();

      item.forEach(v => copy.add(_cloneDeep(v)));

      return copy;
    }

    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    if (item instanceof Object) {
      const copy: Record<string | symbol, unknown> = {};
      const itemType = item as Record<string | symbol, T>
      Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep(itemType[s])));

      Object.keys(item).forEach(k => (copy[k] = _cloneDeep(itemType[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}

export default cloneDeep
