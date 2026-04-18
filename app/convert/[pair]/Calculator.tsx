'use client'
import { useState } from 'react'

export default function Calculator({ rate, from, to, initialAmount }: { 
  rate: number; from: string; to: string; initialAmount?: number 
}) {
  const [fromCurrency, setFromCurrency] = useState(from)
  const [toCurrency, setToCurrency] = useState(to)
  const [fromAmount, setFromAmount] = useState(initialAmount?.toString() ?? '1')
  const [toAmount, setToAmount] = useState(
    initialAmount ? (initialAmount * rate).toFixed(4) : rate.toFixed(4)
  )
  const [lastEdited, setLastEdited] = useState<'from' | 'to'>('from')

  const currentRate = fromCurrency === from ? rate : 1 / rate

  const handleFromChange = (val: string) => {
    setFromAmount(val)
    setLastEdited('from')
    const num = parseFloat(val)
    if (!isNaN(num)) setToAmount((num * currentRate).toFixed(4))
    else setToAmount('')
  }

  const handleToChange = (val: string) => {
    setToAmount(val)
    setLastEdited('to')
    const num = parseFloat(val)
    if (!isNaN(num)) setFromAmount((num / currentRate).toFixed(4))
    else setFromAmount('')
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '28px',
    fontWeight: '700',
    outline: 'none',
    color: '#0f172a',
    background: 'white',
    textAlign: 'right' as const,
  }

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '700',
    opacity: 0.75,
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    textAlign: 'left' as const,
  }

  return (
    <div style={{ maxWidth: '580px', margin: '0 auto' }}>
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '20px',
        padding: '28px',
        backdropFilter: 'blur(10px)'
      }}>
        {/* FROM */}
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>{fromCurrency}</label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              value={fromAmount}
              onChange={e => handleFromChange(e.target.value)}
              style={inputStyle}
            />
            <span style={{
              position: 'absolute', left: '16px', top: '50%',
              transform: 'translateY(-50%)', fontSize: '16px',
              fontWeight: '700', color: '#64748b'
            }}>{fromCurrency}</span>
          </div>
        </div>

        {/* SWAP BUTTON */}
        <div style={{ textAlign: 'center', margin: '8px 0', position: 'relative' }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', margin: '12px 0' }} />
          <div
            onClick={handleSwap}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#1e40af',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '50%', width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', cursor: 'pointer'
            }}
          >
            ⇅
          </div>
        </div>

        {/* TO */}
        <div style={{ marginTop: '12px' }}>
          <label style={labelStyle}>{toCurrency}</label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              value={toAmount}
              onChange={e => handleToChange(e.target.value)}
              style={inputStyle}
            />
            <span style={{
              position: 'absolute', left: '16px', top: '50%',
              transform: 'translateY(-50%)', fontSize: '16px',
              fontWeight: '700', color: '#64748b'
            }}>{toCurrency}</span>
          </div>
        </div>

        {/* RATE INFO */}
        <div style={{
          marginTop: '20px', padding: '12px 16px',
          background: 'rgba(255,255,255,0.1)', borderRadius: '10px',
          fontSize: '14px', opacity: 0.85,
          display: 'flex', justifyContent: 'space-between'
        }}>
          <span>1 {fromCurrency} = {currentRate.toFixed(4)} {toCurrency}</span>
          <span>1 {toCurrency} = {(1/currentRate).toFixed(4)} {fromCurrency}</span>
        </div>
      </div>
    </div>
  )
}