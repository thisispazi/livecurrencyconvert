import Link from 'next/link'

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: '$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: '$', flag: '🇦🇺' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: '$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: '$', flag: '🇭🇰' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
]



const POPULAR_PAIRS = [
  { from: 'USD', to: 'EUR' },
  { from: 'USD', to: 'INR' },
  { from: 'AED', to: 'INR' },
  { from: 'SAR', to: 'INR' },
  { from: 'GBP', to: 'PKR' },
  { from: 'USD', to: 'PHP' },
  { from: 'EUR', to: 'TRY' },
  { from: 'USD', to: 'THB' },
  { from: 'USD', to: 'NGN' },
  { from: 'GBP', to: 'EUR' },
  { from: 'USD', to: 'MXN' },
  { from: 'CAD', to: 'INR' },
]

const POPULAR_AMOUNTS = [100, 500, 1000, 5000]

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

      {/* HEADER */}
      <header style={{
        background: '#1e40af',
        color: 'white',
        padding: '16px 0',
        borderBottom: '3px solid #1d4ed8'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <h1 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>
              LiveCurrencyConvert
            </h1>
          </Link>
          <span style={{ fontSize: '13px', opacity: 0.85 }}>
            Live exchange rates
          </span>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: '#1e40af', color: 'white', padding: '48px 0 64px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
            Free Currency Converter
          </h2>
          <p style={{ fontSize: '18px', opacity: 0.85, marginBottom: '40px' }}>
            Live exchange rates updated every hour · 30+ currencies
          </p>

          {/* CONVERTER BOX */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '560px',
            margin: '0 auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            color: '#1e293b'
          }}>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', textAlign: 'center' }}>
              Select a currency pair below to get the live rate
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {POPULAR_PAIRS.slice(0, 6).map(pair => (
                <Link
                  key={`${pair.from}-${pair.to}`}
                  href={`/convert/${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#1e40af',
                    fontWeight: '600',
                    fontSize: '15px',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  {pair.from} → {pair.to}
                </Link>
              ))}
            </div>
            <Link href="/convert/usd-to-eur" style={{
              display: 'block',
              background: '#1e40af',
              color: 'white',
              padding: '14px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              textAlign: 'center'
            }}>
              View All Currency Pairs →
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR PAIRS */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
            Popular Currency Pairs
          </h2>
          <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '40px' }}>
            Most searched currency conversions
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {POPULAR_PAIRS.map(pair => (
              <Link
                key={`${pair.from}-${pair.to}`}
                href={`/convert/${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`}
                style={{
                  display: 'block',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  textDecoration: 'none',
                  color: '#1e293b',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#1e40af', marginBottom: '4px' }}>
                  {pair.from} / {pair.to}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {CURRENCIES.find(c => c.code === pair.from)?.flag} {CURRENCIES.find(c => c.code === pair.from)?.name}
                  {' → '}
                  {CURRENCIES.find(c => c.code === pair.to)?.flag} {CURRENCIES.find(c => c.code === pair.to)?.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALL CURRENCIES */}
      <section style={{ padding: '0 0 64px', background: '#f1f5f9' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', paddingTop: '64px', textAlign: 'center' }}>
            All Currencies
          </h2>
          <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '40px' }}>
            Convert any amount between 30+ world currencies
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {CURRENCIES.map(currency => (
              <Link
                key={currency.code}
                href={`/convert/usd-to-${currency.code.toLowerCase()}`}
                style={{
                  display: 'block',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px',
                  textDecoration: 'none',
                  color: '#1e293b',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{currency.flag}</div>
                <div style={{ fontWeight: '700', fontSize: '15px', color: '#1e40af' }}>{currency.code}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{currency.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
<footer style={{ background: '#0f172a', color: '#94a3b8', padding: '40px 0' }}>
  <div className="container" style={{ textAlign: 'center' }}>
    <p style={{ marginBottom: '16px', fontSize: '15px' }}>
      <strong style={{ color: 'white' }}>LiveCurrencyConvert.com</strong> — Free currency converter
    </p>
    <p style={{ fontSize: '13px', marginBottom: '16px' }}>
      Rates updated daily · Data for informational purposes only
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