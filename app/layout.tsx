import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fluxedita',
  description: 'Fluxedita - The ultimate platform for building and managing editable websites.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
