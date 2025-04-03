import type { Metadata } from 'next'
import './globals.css'
import { ApiProvider } from '@/components/api-provider'

export const metadata: Metadata = {
  title: 'Zimbabwe Healthcare Inventory',
  description: 'Healthcare inventory management system for Zimbabwe Ministry of Health and Child Care',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ApiProvider>
          {children}
        </ApiProvider>
      </body>
    </html>
  )
}
