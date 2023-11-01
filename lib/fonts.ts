import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"
import { GeistMono, GeistSans } from "geist/font"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// export const fontGeist = fontGeist
