import React from 'react'

export default function TradingChart({ symbol = 'CRYPTO:BTCUSD' }) {
  const widgetSrc = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_btc&symbol=${encodeURIComponent(symbol)}&interval=1D&theme=dark&style=1&locale=en&toolbarbg=rgba(15,23,42,1)&enable_publishing=false&withdateranges=true&allow_symbol_change=true&save_image=true&studies%5B0%5D=Volume%40tv-basicstudies&studies%5B1%5D=RSI%40tv-basicstudies&calendar=false&hotlist=true&details=true&watchlist=true&news=stock`

  return (
    <div style={{ width: '100%', minHeight: 560, borderRadius: 12, overflow: 'hidden', background: '#111827' }}>
      <iframe
        title="BTC TradingView Chart"
        src={widgetSrc}
        style={{ width: '100%', height: 560, border: 'none' }}
        loading="lazy"
        allowFullScreen
      />
    </div>
  )
}                                                                                                           