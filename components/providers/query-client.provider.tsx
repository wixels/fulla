"use client"

import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export const QueryClientProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  )
}
