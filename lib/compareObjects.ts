function compareObjects(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  if (
    obj1 === null ||
    obj1 === undefined ||
    obj2 === null ||
    obj2 === undefined
  ) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!isEqual(value1, value2)) {
      return false
    }
  }

  return true
}

function isEqual(value1: any, value2: any): boolean {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false
    }

    for (let i = 0; i < value1.length; i++) {
      if (!isEqual(value1[i], value2[i])) {
        return false
      }
    }

    return true
  }

  if (
    typeof value1 === "object" &&
    typeof value2 === "object" &&
    value1 !== null &&
    value2 !== null
  ) {
    const keys1 = Object.keys(value1)
    const keys2 = Object.keys(value2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      if (!value2.hasOwnProperty(key) || !isEqual(value1[key], value2[key])) {
        return false
      }
    }

    return true
  }

  return value1 === value2
}

export { compareObjects }
