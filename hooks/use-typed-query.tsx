"use client"

import { useCallback, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"

type OptionalKeys<T> = {
  [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? K : never
}[keyof T]

type FilteredKeys<T, U> = { [K in keyof T as T[K] extends U ? K : never]: T[K] }

// Take array as a string and return zod array
export const queryNumberArray = z
  .string()
  .or(z.number())
  .or(z.array(z.number()))
  .transform((a) => {
    if (typeof a === "string") return a.split(",").map((a) => Number(a))
    if (Array.isArray(a)) return a
    return [a]
  })

// Take array as a string and return zod  number array

// Take string and return return zod string array - comma separated
export const queryStringArray = z
  .preprocess((a) => z.string().parse(a).split(","), z.string().array())
  .or(z.string().array())

export function useTypedQuery<T extends z.AnyZodObject>(schema: T) {
  type Output = z.infer<typeof schema>
  type FullOutput = Required<Output>
  type OutputKeys = Required<keyof FullOutput>
  type OutputOptionalKeys = OptionalKeys<Output>
  type ArrayOutput = FilteredKeys<FullOutput, Array<unknown>>
  type ArrayOutputKeys = keyof ArrayOutput

  const unparsedQuery = useSearchParams()

  const path = usePathname()
  const router = useRouter()
  const paramsObject: { [key: string]: any } = {}
  // @ts-ignore
  for (const [key, value] of unparsedQuery) {
    paramsObject[key] = value
  }
  const parsedQuerySchema = schema.safeParse(paramsObject)

  let parsedQuery: Output = useMemo(() => {
    return {} as Output
  }, [])

  if (parsedQuerySchema.success) parsedQuery = parsedQuerySchema.data
  else if (!parsedQuerySchema.success) console.error(parsedQuerySchema.error)

  // Set the query based on schema values
  const setQuery = useCallback(
    function setQuery<J extends OutputKeys>(key: J, value: Output[J]) {
      // Remove old value by key so we can merge new value
      const { [key]: _, ...newQuery } = parsedQuery
      const newValue = { ...newQuery, [key]: value }
      const search = new URLSearchParams(newValue).toString()
      router.replace(`${path}${search ? `?${search}` : ""}`)
      // router.replace({ query: search }, undefined, { shallow: true })
    },
    [parsedQuery, router]
  )

  function setMultipleQueries<J extends Partial<Output>>(newValues: J) {
    const newQuery = { ...parsedQuery, ...newValues }
    const search = new URLSearchParams(
      newQuery as Record<string, string>
    ).toString()
    router.replace(`${path}${search ? `?${search}` : ""}`)
  }

  // Delete a key from the query
  function removeByKey(key: OutputOptionalKeys) {
    const { [key]: _, ...newQuery } = parsedQuery
    const search = new URLSearchParams(newQuery).toString()
    router.replace(`${path}${search ? `?${search}` : ""}`)
    // router.replace({ query: search }, undefined, { shallow: true })
  }

  // push item to existing key
  function pushItemToKey<J extends ArrayOutputKeys>(
    key: J,
    value: ArrayOutput[J][number]
  ) {
    const existingValue = parsedQuery[key]
    if (Array.isArray(existingValue)) {
      if (existingValue.includes(value)) return // prevent adding the same value to the array
      // @ts-expect-error this is too much for TS it seems
      setQuery(key, [...existingValue, value])
    } else {
      // @ts-expect-error this is too much for TS it seems
      setQuery(key, [value])
    }
  }

  // Remove item by key and value
  function removeItemByKeyAndValue<J extends ArrayOutputKeys>(
    key: J,
    value: ArrayOutput[J][number]
  ) {
    const existingValue = parsedQuery[key]
    if (Array.isArray(existingValue) && existingValue.length > 1) {
      // @ts-expect-error this is too much for TS it seems
      const newValue = existingValue.filter((item) => item !== value)
      setQuery(key, newValue)
    } else {
      // @ts-expect-error this is too much for TS it seems
      removeByKey(key)
    }
  }

  // Remove all query params from the URL
  function removeAllQueryParams() {
    const newPath = path.split("?")[0]
    router.replace(newPath)
  }

  return {
    data: parsedQuery,
    setQuery,
    removeByKey,
    pushItemToKey,
    removeItemByKeyAndValue,
    removeAllQueryParams,
    setMultipleQueries,
  }
}
