async function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export async function forceDelay<T>(promise: Promise<T>, ms: number = 500) {
  let [p] = await Promise.all([promise, sleep(ms)])

  return p
}
