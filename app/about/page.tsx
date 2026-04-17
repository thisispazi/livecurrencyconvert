import Link from 'next/link'

export const metadata = {
  title: 'About | LiveCurrencyConvert.com',
  description: 'About LiveCurrencyConvert.com — free real-time currency converter for 30+ world currencies.',
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ background: '#1e40af', color: 'white', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>LiveCurrencyConvert</span>
          </Link>
        </div>
      </header>
      <main className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px' }}>About LiveCurrencyConvert.com</h1>
        
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', marginBottom: '24px' }}>
          LiveCurrencyConvert.com is a free online currency converter providing live exchange rates for over 30 world currencies. Our tool is designed for travelers, expats, freelancers, and anyone who needs fast and accurate currency conversions without registration or fees.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', marginBottom: '24px' }}>
          Exchange rates are sourced from the European Central Bank via Frankfurter.app and ExchangeRate-API, updated regularly to ensure accuracy. We cover all major currency pairs including USD, EUR, GBP, AED, SAR, INR, PKR, PHP and many more — with dedicated pages for specific amounts like 500 AED to INR or 1000 USD to PHP.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', marginBottom: '24px' }}>
          LiveCurrencyConvert.com is operated by iQoon e.U., based in Austria. Our mission is to provide simple, fast and reliable financial tools that work for everyone — no sign-up required, no hidden fees, just accurate rates.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569' }}>
          For questions or feedback, contact us at <a href="mailto:hello@livecurrencyconvert.com" style={{ color: '#1e40af' }}>hello@livecurrencyconvert.com</a>
        </p>
      </main>
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '40px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '16px', fontSize: '15px' }}>
            <strong style={{ color: 'white' }}>LiveCurrencyConvert.com</strong> — Free currency converter
          </p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '13px' }}>
            <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/impressum" style={{ color: '#94a3b8', textDecoration: 'none' }}>Legal Notice</Link>
            <Link href="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}