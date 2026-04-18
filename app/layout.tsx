import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Live Currency Convert — Real-Time Exchange Rates',
    template: '%s | LiveCurrencyConvert.com',
  },
  description: 'Free real-time currency converter. Instant exchange rates for 30+ currencies.',
  metadataBase: new URL('https://livecurrencyconvert.com'),
  verification: {
    google: 'iSGalkvzZSL8xJfivScx_TpJkULBTd_Eo50-Y07tu3c',
  },
  openGraph: {
    siteName: 'LiveCurrencyConvert.com',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7339237018962749"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn-cookieyes.com/client_data/ac495fcc91ad0169c68375828a4707ba/script.js"
          type="text/javascript"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}