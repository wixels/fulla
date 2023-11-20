"use client"

import { ProviderConfig,  combineProviders } from "@/lib/combine-providers"

import { NextAuthProvider } from "./next-auth-provider"
import QueryClientProvider from "./query-client-provider"
import { ThemeProvider } from "./theme-provider"

type Props = {
  children: React.ReactNode
}
const ProviderConfig: ProviderConfig[] = [
  {
    Provider: ThemeProvider,
    props: { attribute: "class", defaultTheme: "dark", enableSystem: true },
  },
  { Provider: NextAuthProvider },
  { Provider: QueryClientProvider } as ProviderConfig
]
export const Providers: React.FC<Props> = ({ children }) => {
  return combineProviders({
    children,
    providers: ProviderConfig,
  })
}

