function unzip(...args: Array<number[]>) {
  const result = []

  for (let i = 0; i < args.length; i++) {
    if (!Array.isArray(args[i])) {
      throw Error(`${args[i]} is not array`)
    }

    args[i].forEach((item, j) => {
      if (!result?.[j]) {
        result[j] = Array(args.length).fill(undefined)
      }
      result[j][i] = item
    })
  }

  return result

}

export default unzip
