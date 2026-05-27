import React, { useState } from 'react';
import '../styles/Home.css';
import AccessRequestModal from '../components/AccessRequestModal';

type AccessProduct = 'AlphaAI' | 'AlphaPoker';

const Home: React.FC = () => {
  const [accessOpen, setAccessOpen] = useState<AccessProduct | null>(null);

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Building Practical AI-powered Products</h1>
          <p className="tagline">Software we'd want to use ourselves</p>
          <p className="hero-description">
            We're a small team building AI-powered software. We pick problems where good tools don't exist yet, or where existing ones could be cheaper or better. Today our products span personal productivity, software marketplaces, mediation, financial research, and poker training.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn-primary">Explore Our Products</a>
            <a href="/about" className="btn-secondary">About Our Approach</a>
          </div>
        </div>
      </section>

      <section id="products" className="products-showcase">
        <div className="container">
          <h2>Our Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-icon">
                <img src="/images/maia-icon.jpg" alt="Maia" className="product-icon-img" />
              </div>
              <h3><img src="/images/logos/maia-logo.png" alt="Maia" className="product-logo" /></h3>
              <p>
                Maia is an iOS app that makes calls to businesses for you, so you can bypass automated phone systems. She navigates phone trees, gets account information, holds your place in line, and gets you to a live person.
              </p>
              <span className="product-badge">Coming soon to Apple App Store</span>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/buildmyapp-icon.png" alt="BuildMyApp" className="product-icon-img" />
              </div>
              <h3><img src="/images/logos/bma-logo.png" alt="BuildMyApp" className="product-logo" /></h3>
              <p>
                A marketplace for commissioning custom software. Buyers post fixed-price requests, developers build, and the finished app launches with one click, with a 30-day warranty on every build.
              </p>
              <a href="https://appmarketplace.dev" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More &rarr;</a>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/vilora-website-image.jpg" alt="Vilora" className="product-icon-img" />
              </div>
              <h3><img src="/images/logos/vilora-logo.svg" alt="Vilora" className="product-logo" /></h3>
              <p>
                An AI for mediation, collaboration, brainstorming, and decision-making. Use it solo, with another person, or as a group.
              </p>
              <a href="https://vilora.ai" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More &rarr;</a>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/alphaai-icon.jpg" alt="AlphaAI" className="product-icon-img" />
              </div>
              <h3>AlphaAI</h3>
              <p>
                Three AI agents for morning market briefings, company research, and strategy building, plus an automated screener that surfaces undervalued opportunities with regression analysis. No coding required.
              </p>
              <button type="button" className="btn-primary" onClick={() => setAccessOpen('AlphaAI')}>
                Request Access
              </button>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/alphapoker-icon.jpg" alt="AlphaPoker" className="product-icon-img" />
              </div>
              <h3>AlphaPoker</h3>
              <p>
                Practice No-Limit Hold'em and Pot-Limit Omaha against GTO opponents, with a real-time coach analyzing and grading every decision. Solver-grade training without the solver price tag or complexity.
              </p>
              <button type="button" className="btn-primary" onClick={() => setAccessOpen('AlphaPoker')}>
                Request Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="company-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <h3>Founded</h3>
              <p>2024</p>
            </div>
            <div className="stat">
              <h3>Experience</h3>
              <p>45+ Years Combined</p>
            </div>
            <div className="stat">
              <h3>Products</h3>
              <p>5 Active Products</p>
            </div>
            <div className="stat">
              <h3>Approach</h3>
              <p>Practical AI</p>
            </div>
          </div>
        </div>
      </section>

      <section className="innovation-approach">
        <div className="container">
          <h2>How We Work</h2>
          <p className="approach-intro">
            We look for things we'd want to use that either don't exist yet or could be built better or cheaper. Then we build them.
          </p>
          <div className="approach-grid">
            <div className="approach-card">
              <h3>Pick Real Problems</h3>
              <p>We start with problems we have or see firsthand. If the existing solution is fine, we leave it alone.</p>
            </div>
            <div className="approach-card">
              <h3>Build and Ship at Speeds That'll Make Heads Spin</h3>
              <p>Real products to market in days not months.</p>
            </div>
            <div className="approach-card">
              <h3>Better or Cheaper</h3>
              <p>If a tool exists but feels overpriced or under-built, that's a good place to put our time.</p>
            </div>
          </div>
        </div>
      </section>

      <AccessRequestModal
        productName={(accessOpen ?? 'AlphaAI') as AccessProduct}
        isOpen={accessOpen !== null}
        onClose={() => setAccessOpen(null)}
      />
    </>
  );
};

export default Home;
