import React from 'react'
import TradingChart from './TradingChart'

const sampleCandles = [
  { time: 1704067200, open: 102, high: 108, low: 100, close: 106, volume: 1200 },
  { time: 1704153600, open: 106, high: 112, low: 103, close: 110, volume: 1450 },
  { time: 1704240000, open: 110, high: 115, low: 107, close: 109, volume: 1320 },
  { time: 1704326400, open: 109, high: 118, low: 108, close: 116, volume: 1680 },
  { time: 1704412800, open: 116, high: 121, low: 112, close: 119, volume: 1880 },
]

const statCards = [
  { label: '24h Volume', value: '$12.4B' },
  { label: '24h High', value: '$121,450' },
  { label: '24h Low', value: '$100,200' },
]

export default function SpotTrade() {
  return (
    <div style={{ padding: 20, background: '#020617', minHeight: '100vh', color: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>BTC / USDT</h1>
          <p style={{ margin: '4px 0 0', color: '#94a3b8' }}>Spot trading view with live-style chart and quick order panel.</p>
        </div>
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '10px 14px' }}>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>Last Price</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>$108,240.00</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginBottom: 16 }}>
        {statCards.map((card) => (
          <div key={card.label} style={{ background: '#111827', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', padding: 14 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>{card.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{card.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ background: '#111827', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', padding: 12 }}>
          <TradingChart symbol="CRYPTO:BTCUSD" />
        </div>

        <div style={{ background: '#111827', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Quick Order</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button style={{ flex: 1, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }}>Buy</button>
            <button style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }}>Sell</button>
          </div>

          <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>Price</label>
          <input defaultValue="108240.00" style={{ width: '100%', marginBottom: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: '#0f172a', color: '#fff' }} />

          <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>Amount (BTC)</label>
          <input defaultValue="0.125" style={{ width: '100%', marginBottom: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: '#0f172a', color: '#fff' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#cbd5e1' }}>
            <span>Total</span>
            <span>$13,530.00</span>
          </div>

          <button style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 14px', cursor: 'pointer' }}>Place Order</button>
        </div>
      </div>
    </div>
  )
}
    