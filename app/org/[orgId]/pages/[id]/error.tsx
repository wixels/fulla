"use client"

// Error components must be Client Components
import { useEffect } from "react"

import { err } from "@/types/error"
import { Title } from "@/components/ui/title"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <Title showAs={5}>
        The document you are trying to view does not exist
      </Title>
      <pre>{JSON.stringify(error, null, 3)}</pre>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
