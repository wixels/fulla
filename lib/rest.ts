import { User } from "@/types/payload-types"

export const rest = async (
  url: string,
  args?: any,
  options?: RequestInit
): Promise<User | null> => {
  const method = options?.method || "POST"

  try {
    const res = await fetch(url, {
      method,
      ...(method === "POST" ? { body: JSON.stringify(args) } : {}),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (res.ok) {
      const { errors, user } = await res.json()

      if (errors) {
        throw new Error(errors[0].message)
      }

      return user
    } else {
      let errorResponse: string
      try {
        errorResponse = await res.text()
      } catch {
        errorResponse = "Failed to parse error response"
      }

      throw new Error(
        `Request failed with status ${res.status}. Response: ${errorResponse}`
      )
    }
  } catch (e: unknown) {
    throw new Error(e as string)
  }
}
