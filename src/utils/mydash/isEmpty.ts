

export const isEmpty = <T>(value: T) => {
  if (!value || typeof value === 'number') {
    return true
  }
  if (typeof value === 'boolean') {
    return value
  }
  if (Array.isArray(value)) {
    return value[0] ? false : true
  }
  if (typeof value === 'object' && !(value instanceof Set || value instanceof Map)) {
    return Object.keys(value).length ? false : true
  }
  if (value instanceof Set || value instanceof Map) {
    return value.size ? false : true
  }
  return false
}
