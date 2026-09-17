import type { Metadata, Viewport } from "next"
import { Anek_Latin, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { StoreProvider } from "@/lib/store"

const anek = Anek_Latin({
  subsets: ["latin"],
  variable: "--font-anek",
  weight: ["400", "500", "600", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Groww IRL — Your money. Your next move.",
  description:
    "Investing organised around real life. Verify viral claims, simulate futures, and invest with an income-aware plan.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#c8f04d",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", anek.variable, inter.variable)}
    >
      <body>
        <StoreProvider>
          <div className="app-shell">
            <div className="phone">{children}</div>
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
