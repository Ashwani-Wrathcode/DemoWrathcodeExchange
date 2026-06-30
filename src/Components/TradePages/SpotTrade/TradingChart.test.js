import React from 'react'
import { render } from '@testing-library/react'
import TradingChart from './TradingChart'

describe('TradingChart', () => {
  it('renders the TradingView widget for the requested symbol', () => {
    const { container } = render(<TradingChart symbol="CRYPTO:BTCUSD" />)
    const iframe = container.querySelector('iframe')

    expect(iframe).toBeTruthy()
    expect(iframe.getAttribute('title')).toBe('BTC TradingView Chart')
    expect(iframe.getAttribute('src')).toContain('CRYPTO%3ABTCUSD')
  })
})
