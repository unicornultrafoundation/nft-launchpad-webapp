import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import 'react-toastify/dist/ReactToastify.css'
import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'
import Providers from '@/components/Providers'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'U2U NFT launchpad',
  description: 'U2U NFT launchpad'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <ErrorBoundary>
      <Providers>
        <MainHeader />
        <div className="py-20">
          {children}
        </div>
        <MainFooter />
      </Providers>
    </ErrorBoundary>
    </body>
    </html>
  )
}
