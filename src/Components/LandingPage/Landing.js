import React from 'react'
import { useState, useEffect, useRef } from "react"
import Cashback from "../../Icon/Cashback.png"
import FIU from "../../Icon/FIU.png"
import Withdrawal from "../../Icon/Withdrawal.png"
import BackgroundImg from "../../Icon/BackgroundImg.png"
import GroupImage from "../../Icon/GroupImage.png"
import decorationImage from "../../Icon/decorationImage.png"
import USDT from "../../Icon/USDT.png";
import decoationSide from "../../Icon/decorationSide.png"
import Group from "../../Icon/Group.png";
import cryptoMobile from "../../Icon/cryptoMobile.png"
import coinCrypto from "../../Icon/coinCrypto.png";
import cryptoWallet from "../../Icon/cryptoWallet.png";
import mobileLock from "../../Icon/mobileLock.png";
import lock from "../../Icon/lock.png";
import BuyCrypto from "../../Icon/BuyCrypto.png";
import secureWallet from "../../Icon/secureWallet.png";
import sendIcon from "../../Icon/sendIcon.png";
import RealTimeIcon from "../../Icon/RealTimeIcon.png";
import WatchChart from "../../Icon/WatchChart.png";
import solarPlanet from "../../Icon/solarPlanet.png";
import Ellipse from "../../Icon/Ellipse.png";
import GroupDark from "../../Icon/GroupDark.png";
import tradeBTC from "../../Icon/tradeBTC.png";
import tradeLock from "../../Icon/tradeLock.png";
import tradeCoin from "../../Icon/tradeCoin.png";
import goRichMeme from "../../Icon/goRichMeme.png";
import cloudMing from "../../Icon/cloudMing.png";
import downloadTrade from "../../Icon/downloadTrade.jpeg";
import imagesTrading from "../../Icon/imagesTrading.jpeg";
import stockTrading from "../../Icon/stockTrading.jpg";
import tradingCircle from "../../Icon/tradingCircle.png";
import "./Landing.css";

const AnimatedText = ({ text, delayOffset = 0 }) => {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animated-char"
          style={{ animationDelay: `${delayOffset + index * 0.1}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

function Landing() {

  const [activeTab, setActiveTab] = useState('MemeCoins');
  const [visibleCards, setVisibleCards] = useState({
    meme: false,
    gainers: false,
    listings: false,
    featuresHeading: false
  });

  const cardRefs = {
    meme: useRef(null),
    gainers: useRef(null),
    listings: useRef(null),
    featuresHeading: useRef(null)
  };

  const walletImageRef = useRef(null);
  const [walletImageOffset, setWalletImageOffset] = useState({ x: 0, y: 0 });

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -100px 0px'  // Trigger only when scrolled down to bottom 100px
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardKey = entry.target.getAttribute('data-card');
          setVisibleCards((prev) => ({
            ...prev,
            [cardKey]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each card individually
    Object.values(cardRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Wallet image hover animation
  const handleWalletMouseMove = (e) => {
    if (!walletImageRef.current) return;

    const rect = walletImageRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const offsetX = (x - centerX) * 0.2;
    const offsetY = (y - centerY) * 0.2;

    setWalletImageOffset({ x: offsetX, y: offsetY });
  };

  const handleWalletMouseLeave = () => {
    setWalletImageOffset({ x: 0, y: 0 });
  };

  const memeCoins = [
    { name: 'AVAX/USDT', change: '-2.07%', price: '6.67' },
    { name: 'DOGE/USDT', change: '', price: '0.08561' },
    { name: 'FLOKI/USDT', change: '-1.645%', price: '0.00087' },
    { name: 'TURBO/USDT', change: '-0.458%', price: '' },
    { name: 'SHIB/USDT', change: '1.207%', price: '-0.63%' },
  ];

  const topGainers = [
    { name: 'NEAR/USDT', change: '11.74%', price: '2.17' },
    { name: 'ZEC/USDT', change: '', price: '426.95' },
    { name: 'TST/USDT', change: '3.274%', price: '0.0794' },
    { name: 'ETH/USDT', change: '1.478%', price: '1663.1' },
    { name: 'BTC/USDT', change: '', price: '63393.64' },
  ];

  const newListings = [
    { name: 'TUSD/USDT', change: '0%', price: '' },
    { name: 'APT/USDT', change: '0.07%', price: '0.945' },
    { name: 'DOT/USDT', change: '-0.923%', price: '' },
    { name: 'POL/USDT', change: '-1105%', price: '' },
    { name: '', change: '', price: '' },
  ];


  return (
    <div className='landingMain-container'>

      {/* 1. Hero Section */}
      <section className="hero-section">
        {/* Animated Modern Background */}
        <div className="hero-bg-elements">
          <div className="tech-grid"></div>
          <div className="bg-glow-2"></div>
          <img src={coinCrypto} className="bg-coin coin-1" alt="coin" />
          <img src={coinCrypto} className="bg-coin coin-2" alt="coin" />
          <img src={coinCrypto} className="bg-coin coin-3" alt="coin" />
          <img src={coinCrypto} className="bg-coin coin-4" alt="coin" />
          <img src={coinCrypto} className="bg-coin coin-5" alt="coin" />
        </div>

        <div className="hero-main">

          <div className="hero-content">
            <h1>
              <span style={{ color: '#ffffff' }}>
                <AnimatedText text="Master the " delayOffset={0} />
              </span>
              <span className="text-highlight" style={{ fontSize: "45px" }}>
                <AnimatedText text="Markets" delayOffset={1.1} />
              </span>
              <br />
              <span style={{ color: '#d1d5db' }}>
                <AnimatedText text="with Next-Gen " delayOffset={1.8} />
              </span>
              <span className="text-highlight">
                <AnimatedText text="Digital Trading" delayOffset={3.2} />
              </span>
            </h1>

            <p className="hero-subtitle animated-fade-in" style={{ animationDelay: '0.8s' }}>
              Experience the next generation of crypto platforms. Demo environment only — no real funds.
            </p>

            <div className="hero-buttons animated-fade-in" style={{ animationDelay: '1.2s' }}>
              <button className="btn-primary">Get Started</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>

          <div className="hero-image-container">
            <img src={GroupImage} alt="decoration" />
            <img src={decorationImage} className="decoration-image" alt='decoration1' />
            <img src={decoationSide} className="decoration2" alt='decoration2' />
            <img src={Group} className="decoration3" alt='decoration3' />

          </div>

        </div>
      </section>


      {/* 2. Info Cards Section */}
      {/* <section className="info-cards-section">
        <div className="slider-track">
          <img src={Cashback} alt="cashback" />
          <img src={FIU} alt="fiu" />
          <img src={Withdrawal} alt="withdrawal" />
          <img src={USDT} alt="usdt" />


          <img src={Cashback} alt="cashback" />
          <img src={FIU} alt="fiu" />
          <img src={Withdrawal} alt="withdrawal" />
          <img src={USDT} alt="usdt" />
        </div>
      </section> */}

      {/* 3. Trending Cryptocurrencies Section (Preserved Mapping Logic) */}
      <section className="trending-section">
        <div className="trending-container">

          <div className="trending-header">
            <h2>Trending Cryptocurrencies</h2>
            <p>
              Real-time market movers powered by live data and smart analytics.
            </p>
          </div>

          <div className="cards-container">

            {/* Meme Coins */}
            <div
              className={`crypto-card ${visibleCards.meme ? 'card-visible' : ''}`}
              ref={cardRefs.meme}
              data-card="meme"
            >
              <h3>Meme Coins</h3>

              <table className="crypto-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {memeCoins.map((item, index) => (
                    <tr key={index}>
                      <td className="coin-name">{item.name}</td>

                      <td>
                        <div>{item.price}</div>

                        <div
                          className={
                            item.change.includes("-")
                              ? "negative"
                              : "positive"
                          }
                        >
                          {item.change}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Gainers */}
            <div
              className={`crypto-card ${visibleCards.gainers ? 'card-visible' : ''}`}
              ref={cardRefs.gainers}
              data-card="gainers"
            >
              <h3>Top Gainers</h3>

              <table className="crypto-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {topGainers.map((item, index) => (
                    <tr key={index}>
                      <td className="coin-name">{item.name}</td>

                      <td>
                        <div>{item.price}</div>

                        <div
                          className={
                            item.change.includes("-")
                              ? "negative"
                              : "positive"
                          }
                        >
                          {item.change}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* New Listings */}
            <div
              className={`crypto-card ${visibleCards.listings ? 'card-visible' : ''}`}
              ref={cardRefs.listings}
              data-card="listings"
            >
              <h3>New Listings</h3>

              <table className="crypto-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {newListings.map((item, index) => (
                    <tr key={index}>
                      <td className="coin-name">{item.name}</td>

                      <td>
                        <div>{item.price}</div>

                        <div
                          className={
                            item.change.includes("-")
                              ? "negative"
                              : "positive"
                          }
                        >
                          {item.change}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </section>
      {/* 4. Wallet Section */}
      <section className="wallet-section">
        {/* Ambient glow left */}
        <div className="wallet-glow-left"></div>

        <div className="wallet-content">
          <h2>
            A Crypto Exchange Built<br />for <span className="text-highlight">the future.</span>
          </h2>
          <p className="wallet-subtitle">
            Securely manage, swap, and grow your crypto assets with our next-generation wallet solution.
          </p>
          <ul className="features-checklist">
            <li>
              <span className="check-icon">🛡</span> Lowest transaction fees in the market
            </li>
            <li>
              <span className="check-icon">⚡</span> Instant deposits and withdrawals
            </li>
            <li>
              <span className="check-icon">🔒</span> Advanced 256-bit encryption security
            </li>
            <li>
              <span className="check-icon">📈</span> Real-time portfolio tracking
            </li>
            <li>
              <span className="check-icon">💼</span> Multi-asset wallet support
            </li>
          </ul>
          <button className="btn-primary">⬇ &nbsp;Download App</button>
        </div>
        <div
          className="image-placeholder-container wallet-image-container"
          ref={walletImageRef}
          onMouseMove={handleWalletMouseMove}
          onMouseLeave={handleWalletMouseLeave}
        >
          <div className="image-placeholder">
            <div className="placeholder-content" style={{
              transform: `translate(${walletImageOffset.x * 0.5}px, ${walletImageOffset.y * 0.5}px)`,
              transition: 'transform 0.3s ease-out'
            }}>
              <img src={cryptoMobile} className='cyptoMobile' alt='mobile' />
              <img src={coinCrypto} className='coinCrypto' alt='trade' />
              {/* <img src={tradeBTC} className='cryptoWallet' alt='trade' /> */}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Security Section */}
      <section className="security-section">
        <div className="image-placeholder-container security-image-container">
          <div className="image-placeholder">
            <div className="placeholder-content">
              <div className="security-image-container">
                <img src={mobileLock} className='security-phone' alt='mobile' />

                <img src={lock} className='security-lock' alt='lock' />
              </div>
            </div>
          </div>
        </div>
        <div className='security-mainContent'>
          {/* Background Decorative Icons behind text */}
          <img src={tradingCircle} className="security-bg-icon icon-1" alt="trade" />
          <img src={tradingCircle} className="security-bg-icon icon-2" alt="trade" />
          <img src={downloadTrade} className="security-bg-icon icon-3" alt="trade" />
          <img src={downloadTrade} className="security-bg-icon icon-4" alt="trade" />

          <div className="security-content">
            <h2>
              <span className="text-highlight">Bulletproof</span>  Security,<br></br> Built
              by Design
            </h2>
            <p className="security-subtitle">
              Your assets and data are protected by industry-leading security protocols, advanced encryption, and continuous monitoring — so you can trade with complete peace of mind.
            </p>
            <div className="security-grid">
              <div className="security-grid-item">
                <span className="grid-number">0.</span>
                <p>Security Incidents</p>
              </div>

              <div className="security-grid-item">
                <div className="number-row">
                  <h2>256</h2>
                  <span className="grid-numbers">Bits</span>
                </div>
                <p>AES Encryption</p>
              </div>

              <div className="security-grid-item">
                <span className="grid-number">100%</span>
                <p>Encrypted Data</p>.
              </div>

              <div className="security-grid-item">
                <div className='number-row'>
                  <h2>CISA</h2>
                  <span className="grid-number">+</span>
                </div>
                <p>Security Compliance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Fully Featured Section */}
      <section className="features-grid-section">
        <div className="features-header" ref={cardRefs.featuresHeading} data-card="featuresHeading">
          <h2>
            {visibleCards.featuresHeading ? (
              <>
                <AnimatedText text="Fully Equipped to Buy, " delayOffset={0} />
                <span>
                  <AnimatedText text="Trade & Invest " delayOffset={2.3} />
                </span>
                <AnimatedText text="in Crypto." delayOffset={3.8} />
              </>
            ) : (
              <span style={{ opacity: 0 }}>Fully Equipped to Buy, Trade & Invest in Crypto.</span>
            )}
          </h2>

          <div className="features-buttons">
            <button className="btn-primary">Download App</button>
            <button className="btn-secondary">Browse All Features</button>
          </div>
        </div>

        <div className="crypto-grid">

          {/* Large Card - spans 2 columns in top row */}
          <div className="grid-card large-card">
            <div className="card-content">
              <h3>Buy 100+ Crypto Assets</h3>
              <p>
                Trade top cryptocurrencies and emerging tokens with deep liquidity and real-time pricing across global markets.
              </p>
              <a href="/">Learn More →</a>
            </div>
            <div className="phone-image">
              <img src={BuyCrypto} alt="phone" />
            </div>
          </div>

          {/* Wallet Card - 1 column top-right */}
          <div className="grid-card wallet-card">
            <div className="icon">
              <img src={secureWallet} className='buyCrypto' alt='secure wallet' />
            </div>
            <h3>Secure & Encrypted Wallet</h3>
            <p>
              Protect your assets with enterprise-grade security, multi-layer encryption, and full ownership of your funds.
            </p>
          </div>

          {/* Bottom Row - 3 equal cards */}
          <div className="bottom-cards-row">

            {/* Bottom Card 1 */}
            <div className="grid-card small-card">
              <div className="small-card-icon">
                <img src={sendIcon} alt='send and Receive' />
              </div>
              <h3>Send & Receive Instantly</h3>
              <p>
                Transfer crypto effortlessly with fast confirmations, low fees, and seamless wallet-to-wallet transactions.
              </p>
            </div>

            {/* Bottom Card 2 */}
            <div className="grid-card small-card">
              <div className="small-card-icon">
                <img src={RealTimeIcon} alt='invest real time' />
              </div>
              <h3>Invest in Real Time</h3>
              <p>
                Track market movements, execute trades instantly, and manage your investments as the market evolves.
              </p>
            </div>

            {/* Bottom Card 3 */}
            <div className="grid-card small-card">
              <div className="small-card-icon">
                <img src={WatchChart} alt='watch and analyze' />
              </div>
              <h3>Watch & Analyze Charts</h3>
              <p>
                Make informed decisions using advanced charts, live indicators, and professional-grade analytics tools.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Natively Integrated Section */}
      <section className="integration-section">
        <div className="integration-content">
          <h2>
            Built to Support the Most<br />
            Trusted <span className="integration-highlight">Cryptocurrencies</span>
          </h2>
          <p className="integration-subtitle">
            Seamlessly buy, store, and trade leading digital assets through native blockchain integrations designed for speed, reliability, and performance.
          </p>
          <div className="integration-buttons">
            <button className="btn-primary">Download App</button>
            <button className="btn-secondary">Browse All Cryptos</button>
          </div>
        </div>
        <div className="integration-image-wrapper">
          <div className="integration-glow"></div>
          <img src={solarPlanet} className='solarPlanet' alt='Planet' />
          <img src={Ellipse} className='ellipse' alt='ellipse' />
          <img src={GroupDark} className='groupDark' alt='groupDark' />
        </div>
      </section>

      {/* 8. Latest Resources Section */}
      <section className="resources-section">
        <div className="resources-section-header">
          <h2>
            Latest <span className="text-highlight">resources.</span>
          </h2>
          <p>Stay updated with the latest news, trends and insights from our crypto experts.</p>
        </div>
        <div className="resources-grid">
          <div className="resource-card">
            <div className="image-placeholder-container resource-img-container">
              <div className="image-placeholder">
                <div className="placeholder-contents">
                  <img src={tradeBTC} className='ArticleImage' alt='Article Image' />

                </div>
              </div>
            </div>
            <div className="resource-card-content">
              <h3 className="resource-meta">The Best Platform to Trade Bitcoin</h3>
              <p>Experience lightning-fast trades with our advanced matching engine. Trade BTC, ETH, and 200+ cryptocurrencies with deep liquidity and minimal slippage.</p>

            </div>
          </div>
          <div className="resource-card">
            <div className="image-placeholder-container resource-img-container">
              <div className="image-placeholder">
                <div className="placeholder-contents">
                  <img src={tradeLock} className='ArticleImage' alt='article' />

                </div>
              </div>
            </div>
            <div className="resource-card-content">
              <h3 className="resource-meta">Bank-Grade Security for Your Assets</h3>
              <p>Your funds are protected with multi-signature cold storage, 2FA authentication, and real-time threat monitoring. We've never been compromised.</p>

            </div>
          </div>
          <div className="resource-card">
            <div className="image-placeholder-container resource-img-container">
              <div className="image-placeholder">
                <div className="placeholder-contents">
                  <img src={tradeCoin} className='ArticleImage' alt='Article Image' />

                </div>
              </div>
            </div>
            <div className="resource-card-content">
              <h3 className="resource-meta">Earn Passive Income on Your Crypto</h3>
              <p>Put your idle assets to work with competitive staking rewards and flexible earning plans. Earn up to 12% APY on your holdings.</p>

            </div>
          </div>
        </div>

      </section>

      {/* 9. Features/Services Cards Row */}
      <section className="services-cards-section">
        <div className="services-cards-track">

          <div className="service-card">
            <div className="service-card-icon">
              <img src={cloudMing} alt='clouding' />
            </div>
            <h4>Earning</h4>
            <p>Track trading for all memes</p>
            <a href="/">Find out more →</a>
          </div>

          <div className="service-card">
            <div className="service-card-icon">
              <img src={goRichMeme} alt='Ellipse' />
            </div>
            <h4>Staking</h4>
            <p>Trade US stock tokens with USDT</p>
            <a href="/">Find out more →</a>
          </div>

          <div className="service-card">
            <div className="service-card-icon">
              <img src={goRichMeme} alt='richMeme' />
            </div>
            <h4>Futures Trading</h4>
            <p>Ultra-low latency, seamless execution</p>
            <a href="/">Find out more →</a>
          </div>

          <div className="service-card">
            <div className="service-card-icon">
              <img src={goRichMeme} alt='icon' />
            </div>
            <h4>Spot Trading</h4>
            <p>Over 100+ tokens at your fingertips</p>
            <a href="/">Find out more →</a>
          </div>

          <div className="service-card">
            <div className="service-card-icon">
              <img src={cloudMing} alt='icon' />
            </div>
            <h4>Earning</h4>
            <p>Up to 36% APY in USDT</p>
            <a href="/">Find out more →</a>
          </div>

        </div>
      </section>


      {/* 10. Footer Section */}
      <footer className="footer">

        {/* Top Section */}
        <div className="footer-top">

          {/* Left */}
          <div className="footer-brand">
            <h2>WRATHCODE</h2>
            {/* <img src={} alt='logo' /> */}

            <p>
              Wrathcode Exchange is a blockchain-based banking platform
              for crypto traders and investors, and aims to connect the
              world of traditional finance and cryptocurrencies.
            </p>

            <div className="social-icons">
              <span>f</span>
              <span>𝕏</span>
              <span>📷</span>
              <span>✈</span>
              <span>▶</span>
            </div>
          </div>

          {/* Center */}
          <div className="footer-office">
            <h3>Head Office</h3>

            <p>
              1st floor, JDA Complex, Plot no. 11,
              Sector 4, Vidyadhar Nagar,
              Jaipur, Rajasthan 302039
            </p>
          </div>

          {/* Right */}
          <div className="footer-contact">
            <h3>Contact Us</h3>

            <p>✉ @wrathcode.com</p>
            <p>📞 +91 0000000000</p>
          </div>

        </div>

        {/* Bottom Section */}

        <div className="footer-links">

          <div className="footer-column">
            <h4>About Us</h4>

            <a href="/">Terms of Use</a>
            <a href="/">Risk Disclosure</a>
            <a href="/">Privacy & KYC Policy</a>
          </div>

          <div className="footer-column">
            <h4>Services</h4>

            <a href="/">Announcements</a>
            <a href="/">Trade Crypto</a>
            <a href="/">Fees</a>
            <a href="/">Referral Program</a>
          </div>

          <div className="footer-column">
            <h4>Support</h4>

            <a href="/">Help Center</a>
            <a href="/">FAQ's</a>
            <a href="/">Security</a>
            <a href="/">Submit a Request</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>

            <a href="/">AML/KYC Policy</a>
            <a href="/">Complaints Handling Procedure</a>
            <a href="/">General Disclaimer</a>
          </div>

        </div>

      </footer>

    </div>
  )
}

export default Landing
