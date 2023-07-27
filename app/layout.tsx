import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OLX - Buy and Sell for free anywhere in Pakistan with OLX',
  description: 'olx.com.pk',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>


        {children}

      </body>
    </html>
  )
}
