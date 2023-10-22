

export const first = <T>(list: T[]) => {
  if (!Array.isArray(list)) {
    return undefined
  }

  return list[0]
}

