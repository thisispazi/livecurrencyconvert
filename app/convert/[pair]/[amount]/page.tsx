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
}

const FRANKFURTER_CURRENCIES = ['EUR','USD','GBP','CHF','JPY','CAD','AUD','NZD','SEK','NOK','DKK','PLN','CZK','HUF','BGN','RON','ISK','HRK','TRY','BRL','CNY','HKD','IDR','ILS','INR','KRW','MXN','MYR','PHP','SGD','THB','ZAR']

async function getRate(from: string, to: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://open.er-api.com/v6/latest/${from}`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    return data.rates[to] ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string; amount: string }>
}) {
  const { pair, amount } = await params
  const parts = pair.split('-to-')
  if (parts.length !== 2) return {}
  const from = parts[0].toUpperCase()
  const to = parts[1].toUpperCase()
  if (!CURRENCIES[from] || !CURRENCIES[to]) return {}
  const amountNum = parseFloat(amount)
  if (isNaN(amountNum)) return {}
  return {
    title: `${amountNum.toLocaleString()} ${from} to ${to} — Convert ${CURRENCIES[from].name} to ${CURRENCIES[to].name}`,
    description: `How much is ${amountNum.toLocaleString()} ${from} in ${to}? Live exchange rate. Convert ${CURRENCIES[from].name} to ${CURRENCIES[to].name} instantly.`,
  }
}

export default async function AmountPage({
  params,
}: {
  params: Promise<{ pair: string; amount: string }>
}) {
  const { pair, amount } = await params
  const parts = pair.split('-to-')
  if (parts.length !== 2) return notFound()

  const from = parts[0].toUpperCase()
  const to = parts[1].toUpperCase()

  if (!CURRENCIES[from] || !CURRENCIES[to]) return notFound()

  const amountNum = parseFloat(amount)
  if (isNaN(amountNum) || amountNum <= 0) return notFound()

  const rate = await getRate(from, to)
  const fromCurrency = CURRENCIES[from]
  const toCurrency = CURRENCIES[to]
  const converted = rate ? amountNum * rate : null

  const NEARBY_AMOUNTS = [
    Math.round(amountNum * 0.1),
    Math.round(amountNum * 0.25),
    Math.round(amountNum * 0.5),
    amountNum,
    Math.round(amountNum * 2),
    Math.round(amountNum * 5),
    Math.round(amountNum * 10),
  ].filter((a) => a > 0 && a !== amountNum)

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

      {/* HERO */}
      <section style={{ background: '#1e40af', color: 'white', padding: '48px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '15px', opacity: 0.8, marginBottom: '12px' }}>
            {fromCurrency.flag} {fromCurrency.name} → {toCurrency.flag} {toCurrency.name}
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '24px', lineHeight: '1.2' }}>
            {amountNum.toLocaleString()} {from} to {to}
          </h1>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '480px',
            margin: '0 auto'
          }}>
            {converted ? (
              <>
                <div style={{ fontSize: '16px', opacity: 0.85, marginBottom: '8px' }}>
                  {amountNum.toLocaleString()} {from} =
                </div>
                <div style={{ fontSize: '52px', fontWeight: '800', letterSpacing: '-2px', lineHeight: '1.1' }}>
                  {converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '24px', fontWeight: '600', opacity: 0.9, marginBottom: '16px' }}>
                  {to}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.75, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px' }}>
                 1 {from} = {rate?.toFixed(4)} {to} · {FRANKFURTER_CURRENCIES.includes(from) && FRANKFURTER_CURRENCIES.includes(to) ? 'Updated hourly' : 'Updated daily'}
                </div>
              </>
            ) : (
              <div style={{ fontSize: '18px' }}>Rate temporarily unavailable</div>
            )}
          </div>
        </div>
      </section>

      {/* NEARBY AMOUNTS */}
      {rate && (
        <section style={{ padding: '64px 0' }}>
          <div className="container">
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
              Other {from} to {to} Amounts
            </h2>
            <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '32px' }}>
              Quick conversions at today&apos;s rate
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {NEARBY_AMOUNTS.map((a) => (
                <Link
                  key={a}
                  href={`/convert/${from.toLowerCase()}-to-${to.toLowerCase()}/${a}`}
                  style={{
                    display: 'block',
                    background: 'white',
                    color: '#1e293b',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '16px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}
                >
                  <div style={{ fontSize: '18px', marginBottom: '4px' }}>
                    {a.toLocaleString()} {from}
                  </div>
                  <div style={{ fontSize: '14px', color: '#1e40af' }}>
                    = {(a * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section style={{ padding: '0 0 64px', background: '#f1f5f9' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '32px', paddingTop: '64px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {[
            {
              q: `How much is ${amountNum.toLocaleString()} ${from} in ${to} today?`,
              a: converted
                ? `${amountNum.toLocaleString()} ${fromCurrency.name} equals ${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency.name} at today's rate of ${rate?.toFixed(4)} ${to} per ${from}.`
                : 'Please check the live rate above.'
            },
            {
              q: `What is the ${from} to ${to} exchange rate today?`,
              a: `Today's ${from} to ${to} exchange rate is ${rate?.toFixed(4) ?? 'unavailable'}. This means 1 ${fromCurrency.name} = ${rate?.toFixed(4)} ${toCurrency.name}.`
            },
            {
              q: `How do I convert ${from} to ${to}?`,
              a: `Multiply your ${from} amount by ${rate?.toFixed(4) ?? 'the current rate'}. So ${amountNum} × ${rate?.toFixed(4)} = ${converted?.toFixed(2)} ${to}.`
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

      {/* BACK */}
      <section style={{ padding: '32px 0', textAlign: 'center' }}>
        <Link
          href={`/convert/${from.toLowerCase()}-to-${to.toLowerCase()}`}
          style={{ color: '#1e40af', textDecoration: 'none', fontWeight: '600', fontSize: '16px' }}
        >
          ← View full {from} to {to} exchange rate
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '40px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '16px', fontSize: '15px' }}>
            <strong style={{ color: 'white' }}>LiveCurrencyConvert.com</strong> — Free currency converter
          </p>
          <p style={{ fontSize: '13px', marginBottom: '16px' }}>Rates updated every 24 hours</p>
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