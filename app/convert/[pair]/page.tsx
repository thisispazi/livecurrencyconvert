import Link from 'next/link'
import { notFound } from 'next/navigation'

const CURRENCIES: Record<string, { name: string; symbol: string; flag: string }> = {
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  AED: { name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  SAR: { name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  INR: { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  PKR: { name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  PHP: { name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  BDT: { name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  TRY: { name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  MXN: { name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  THB: { name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  KRW: { name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  CHF: { name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  CAD: { name: 'Canadian Dollar', symbol: '$', flag: '🇨🇦' },
  AUD: { name: 'Australian Dollar', symbol: '$', flag: '🇦🇺' },
  SGD: { name: 'Singapore Dollar', symbol: '$', flag: '🇸🇬' },
  HKD: { name: 'Hong Kong Dollar', symbol: '$', flag: '🇭🇰' },
  NOK: { name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  SEK: { name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  DKK: { name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  PLN: { name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  CZK: { name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  HUF: { name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  NGN: { name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  KES: { name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  GHS: { name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  BRL: { name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  IDR: { name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  VND: { name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  EGP: { name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬' },
  ZAR: { name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  MAD: { name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  QAR: { name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦' },
  KWD: { name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
}

const FRANKFURTER_CURRENCIES = ['EUR','USD','GBP','CHF','JPY','CAD','AUD','NZD','SEK','NOK','DKK','PLN','CZK','HUF','BGN','RON','ISK','HRK','TRY','BRL','CNY','HKD','IDR','ILS','INR','KRW','MXN','MYR','PHP','SGD','THB','ZAR']

const AMOUNTS = [1, 5, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

async function getRate(from: string, to: string): Promise<number | null> {
  const FRANKFURTER_CURRENCIES = ['EUR','USD','GBP','CHF','JPY','CAD','AUD','NZD','SEK','NOK','DKK','PLN','CZK','HUF','BGN','RON','ISK','HRK','TRY','BRL','CNY','HKD','IDR','ILS','INR','KRW','MXN','MYR','PHP','SGD','THB','ZAR']
  
  const useFrankfurter = FRANKFURTER_CURRENCIES.includes(from) && FRANKFURTER_CURRENCIES.includes(to)
  
  try {
    if (useFrankfurter) {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${from}&to=${to}`,
        { next: { revalidate: 3600 } }
      )
      const data = await res.json()
      return data.rates[to] ?? null
    } else {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${from}`,
        { next: { revalidate: 86400 } }
      )
      const data = await res.json()
      return data.rates[to] ?? null
    }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params
  const parts = pair.split('-to-')
  if (parts.length !== 2) return {}
  const from = parts[0].toUpperCase()
  const to = parts[1].toUpperCase()
  if (!CURRENCIES[from] || !CURRENCIES[to]) return {}
  return {
    title: `${from} to ${to} — Live Exchange Rate`,
    description: `Convert ${CURRENCIES[from].name} to ${CURRENCIES[to].name}. Live ${from}/${to} exchange rate updated every hour. Free currency converter.`,
  }
}

export default async function PairPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params
  const parts = pair.split('-to-')
  if (parts.length !== 2) return notFound()

  const from = parts[0].toUpperCase()
  const to = parts[1].toUpperCase()

  if (!CURRENCIES[from] || !CURRENCIES[to]) return notFound()

  const rate = await getRate(from, to)
  const fromCurrency = CURRENCIES[from]
  const toCurrency = CURRENCIES[to]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

      {/* HEADER */}
      <header style={{ background: '#1e40af', color: 'white', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>LiveCurrencyConvert</span>
          </Link>
          <span style={{ fontSize: '13px', opacity: 0.85 }}>Live exchange rates</span>
        </div>
      </header>

      {/* HERO RATE */}
      <section style={{ background: '#1e40af', color: 'white', padding: '48px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '15px', opacity: 0.8, marginBottom: '12px' }}>
            {fromCurrency.flag} {fromCurrency.name} → {toCurrency.flag} {toCurrency.name}
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '12px' }}>
            {from} to {to} Exchange Rate
          </h1>
          {rate ? (
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '420px',
              margin: '0 auto'
            }}>
              <div style={{ fontSize: '18px', opacity: 0.85, marginBottom: '8px' }}>1 {from} =</div>
              <div style={{ fontSize: '52px', fontWeight: '800', letterSpacing: '-2px' }}>
                {rate.toFixed(4)}
              </div>
              <div style={{ fontSize: '22px', fontWeight: '600', opacity: 0.9 }}>{to}</div>
              <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '16px' }}>
                ⏱ {FRANKFURTER_CURRENCIES.includes(from) && FRANKFURTER_CURRENCIES.includes(to) ? 'Rates updated hourly' : 'Rates updated daily'}
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '16px', padding: '32px', maxWidth: '420px', margin: '0 auto' }}>
              <div style={{ fontSize: '18px' }}>Rate temporarily unavailable</div>
            </div>
          )}
        </div>
      </section>

      {/* CONVERSION TABLE */}
      {rate && (
        <section style={{ padding: '64px 0' }}>
          <div className="container">
            <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
              {from} to {to} Conversion Table
            </h2>
            <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '32px' }}>
              Common amounts converted at today&apos;s rate
            </p>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#1e40af', color: 'white', padding: '14px 24px', fontWeight: '700' }}>
                <span>{from} ({fromCurrency.symbol})</span>
                <span>{to} ({toCurrency.symbol})</span>
              </div>
              {AMOUNTS.map((amount, i) => (
                <div key={amount} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  padding: '14px 24px',
                  background: i % 2 === 0 ? 'white' : '#f8fafc',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '15px'
                }}>
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>
                    {amount.toLocaleString()} {from}
                  </span>
                  <span style={{ color: '#1e40af', fontWeight: '600' }}>
                    {(amount * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section style={{ padding: '0 0 64px', background: '#f1f5f9' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '32px', paddingTop: '64px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {[
            {
              q: `How much is 1 ${from} in ${to} today?`,
              a: rate
                ? `1 ${fromCurrency.name} (${from}) is currently equal to ${rate.toFixed(4)} ${toCurrency.name} (${to}). This rate is updated every hour.`
                : `Please check the live rate above.`
            },
            {
              q: `What is the ${from}/${to} exchange rate?`,
              a: `The current ${from} to ${to} exchange rate is ${rate?.toFixed(4) ?? 'unavailable'}. Exchange rates fluctuate based on global market conditions.`
            },
            {
              q: `How often is the ${from} to ${to} rate updated?`,
              a: `Our ${from}/${to} rate is updated every hour using data from the European Central Bank. This ensures you always get an accurate and reliable exchange rate.`
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '16px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>
                {item.q}
              </h3>
              <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED PAIRS */}
      <section style={{ padding: '0 0 64px' }}>
        <div className="container">
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px', textAlign: 'center' }}>
            Related Currency Pairs
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.keys(CURRENCIES).filter(c => c !== from && c !== to).slice(0, 8).map(c => (
              <Link
                key={c}
                href={`/convert/${from.toLowerCase()}-to-${c.toLowerCase()}`}
                style={{
                  padding: '10px 18px',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#1e40af',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                {from} → {c}
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