import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | LiveCurrencyConvert.com',
  description: 'Privacy Policy for LiveCurrencyConvert.com',
}

export default function PrivacyPage() {
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
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Privacy Policy</h1>
        <p style={{ color: '#64748b', marginBottom: '40px' }}>Last updated: April 2026</p>

        {[
          {
            title: '1. Who We Are',
            content: 'LiveCurrencyConvert.com is operated by iQoon e.U., Patrick Reiter, Gartengasse 26, 2630 Ternitz, Austria. Contact: hello@livecurrencyconvert.com'
          },
          {
            title: '2. What Data We Collect',
            content: 'We do not collect personal data directly. When you visit our website, standard server logs may be created containing your IP address, browser type, and pages visited. This data is used solely for technical operation and security purposes and is automatically deleted after 7 days.'
          },
          {
            title: '3. Cookies',
            content: 'We use cookies to improve your experience and to display advertisements via Google AdSense. You can manage your cookie preferences using the cookie banner shown on your first visit. Essential cookies are required for the website to function. Advertising cookies are only set with your consent.'
          },
          {
            title: '4. Google AdSense',
            content: 'We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google\'s Ads Settings at https://www.google.com/settings/ads.'
          },
          {
            title: '5. Exchange Rate Data',
            content: 'Currency exchange rates are provided by ExchangeRate-API and the European Central Bank via Frankfurter.app. We do not store any currency conversion queries or results. All calculations happen in real-time and are not logged.'
          },
          {
            title: '6. Your Rights (GDPR)',
            content: 'Under GDPR, you have the right to access, correct, or delete any personal data we hold about you. You also have the right to object to processing and to data portability. To exercise these rights, contact us at hello@livecurrencyconvert.com.'
          },
          {
            title: '7. Third Party Links',
            content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.'
          },
          {
            title: '8. Changes to This Policy',
            content: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the new policy.'
          },
          {
            title: '9. Contact',
            content: 'For any privacy-related questions, contact us at: hello@livecurrencyconvert.com'
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>
              {section.title}
            </h2>
            <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '15px' }}>
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