import Link from 'next/link'

export const metadata = {
  title: 'Legal Notice | LiveCurrencyConvert.com',
  description: 'Legal notice and operator information for LiveCurrencyConvert.com',
}

export default function ImpressumPage() {
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
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Legal Notice</h1>
        <p style={{ color: '#64748b', marginBottom: '40px' }}>Information according to § 5 ECG</p>

        {[
          {
            title: 'Operator',
            content: 'iQoon e.U.\nPatrick Reiter\nGartengasse 26\n2630 Ternitz\nAustria'
          },
          {
            title: 'Contact',
            content: 'Email: hello@livecurrencyconvert.com'
          },
          {
            title: 'Purpose',
            content: 'Operation of an online currency conversion platform providing live exchange rate information.'
          },
          {
            title: 'Disclaimer',
            content: 'Exchange rates displayed on this website are for informational purposes only. Despite careful review, we accept no liability for the accuracy, completeness or timeliness of the information. For financial decisions, we recommend consulting an authorized financial advisor.'
          },
          {
            title: 'Data Sources',
            content: 'Exchange rate data is provided by ExchangeRate-API and the European Central Bank via Frankfurter.app.'
          },
          {
            title: 'EU Dispute Resolution',
            content: 'The European Commission provides a platform for online dispute resolution: https://ec.europa.eu/consumers/odr. We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board.'
          },
          {
            title: 'Copyright',
            content: 'All content on this website is protected by copyright. Reproduction, editing, distribution or any use beyond the limits of copyright law requires the written consent of the operator.'
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>
              {section.title}
            </h2>
            <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '15px', whiteSpace: 'pre-line' }}>
              {section.content}
            </p>
          </div>
        ))}
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