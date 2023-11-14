function generateUrlWithSafeParams(
  urlSearchParams: URLSearchParams,
  newParams: Record<string, string | string[]>,
  path: string | null = null
): string {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(newParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== "") {
          params.append(key, item)
        }
      }
    } else {
      if (value && value !== "") params.set(key, value)
    }
  }

  const queryString = params.toString()

  // const existingParams = Array.from(urlSearchParams.entries())
  //   .filter(([key]) => !newParams.hasOwnProperty(key))
  //   .map(([key, value]) => `${key}=${value}`)

  const baseUrl = window.location.origin + window.location.pathname
  const fullUrl = `${baseUrl}${queryString ? `?${queryString}` : ""}`

  return fullUrl
}

export { generateUrlWithSafeParams }
