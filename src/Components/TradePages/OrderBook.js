import React, { useEffect, useState } from 'react'

export default function OrderBook({ symbol, wsUrl, levels = 20 }) {
  const [bids, setBids] = useState([])
  const [asks, setAsks] = useState([])

  useEffect(() => {
    const ws = new WebSocket(wsUrl)
    ws.onopen = () => ws.send(JSON.stringify({ type: 'subscribe', channel: 'orderbook', symbol }))
    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data)
      if (msg.type === 'snapshot') { setBids(msg.bids); setAsks(msg.asks) }
      if (msg.type === 'update') {
        // apply incremental update logic: merge/update arrays
        setBids(prev => mergeOrderbook(prev, msg.bids))
        setAsks(prev => mergeOrderbook(prev, msg.asks))
      }
    }
    return () => ws.close()
  }, [symbol, wsUrl])

  return (
    <div className="orderbook">
      <div className="asks">
        {asks.slice(0, levels).map(a => <div key={a.price} className="row ask">{a.price} <span>{a.size}</span></div>)}
      </div>
      <div className="bids">
        {bids.slice(0, levels).map(b => <div key={b.price} className="row bid">{b.price} <span>{b.size}</span></div>)}
      </div>
    </div>
  )

  function mergeOrderbook(prev, updates) {
    const map = new Map(prev.map(i => [i.price, i.size]))
    updates.forEach(u => { if (u.size === 0) map.delete(u.price); else map.set(u.price, u.size) })
    return Array.from(map.entries()).map(([price,size]) => ({ price, size })).sort((a,b)=>b.price-a.price)
  }
}