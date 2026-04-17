import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Live Currency Convert — Real-Time Exchange Rates',
    template: '%s | LiveCurrencyConvert.com',
  },
  description: 'Free real-time currency converter. Instant exchange rates for 30+ currencies. Convert USD, EUR, GBP, AED, SAR, INR, PHP and more.',
  metadataBase: new URL('https://livecurrencyconvert.com'),
  verification: {
    google: 'iSGalkvzZSL8xJfivScx_TpJkULBTd_Eo50-Y07tu3c',
  },
  openGraph: {
    siteName: 'LiveCurrencyConvert.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="iSGalkvzZSL8xJfivScx_TpJkULBTd_Eo50-Y07tu3c" />
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/ac495fcc91ad0169c68375828a4707ba/script.js"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}