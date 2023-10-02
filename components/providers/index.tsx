"use client"

import { combineProviders } from "@/lib/combine-providers"

import { NextAuthProvider } from "./next-auth-provider"
import QueryClientProvider from "./query-client-provider"
import { ThemeProvider } from "./theme-provider"

export const Providers = combineProviders([
  [
    ThemeProvider,
    { attribute: "class", defaultTheme: "dark", enableSystem: true },
  ],
  [NextAuthProvider],
  [QueryClientProvider],
])
