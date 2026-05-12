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
          <h1>Building Tomorrow's AI-Powered Businesses</h1>
          <p className="tagline">Transforming Industries Through AI Innovation</p>
          <p className="hero-description">
            We're a technology innovation lab that identifies transformative opportunities in the AI landscape and builds category-defining software products, from flagship AI assistants to mediation platforms, marketplaces, and analytical tools.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn-primary">Explore Our Products</a>
            <a href="/about" className="btn-secondary">About Our Approach</a>
          </div>
        </div>
      </section>

      <section id="products" className="products-showcase">
        <div className="container">
          <h2>Our Flagship Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-icon">
                <img src="/images/maia-icon.jpg" alt="Maia" className="product-icon-img" />
              </div>
              <h3>Maia</h3>
              <p>
                Maia is the flagship AI assistant from Maia AI LLC. Leveraging advanced language models and adaptive learning, Maia transforms how individuals manage tasks, information, and daily workflows.
              </p>
              <span className="product-badge">Available on iOS</span>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/buildmyapp-icon.png" alt="BuildMyApp" className="product-icon-img" />
              </div>
              <h3>BuildMyApp</h3>
              <p>
                A demand-first software marketplace where non-technical buyers commission custom software from independent developers and license completed products with one-click launch.
              </p>
              <a href="https://appmarketplace.dev" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More &rarr;</a>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/vilora-icon.png" alt="Vilora" className="product-icon-img" />
              </div>
              <h3>Vilora</h3>
              <p>
                An AI-powered platform for mediation, collaboration, brainstorming, and decision-making. Use it alone, with another person, or as a group.
              </p>
              <a href="https://vilora.ai" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More &rarr;</a>
            </div>

            <div className="product-card">
              <div className="product-icon">
                <img src="/images/alphaai-icon.jpg" alt="AlphaAI" className="product-icon-img" />
              </div>
              <h3>AlphaAI</h3>
              <p>
                An intelligent investment research platform combining on-demand AI agents for research, analysis, and strategy development with an automated investment discovery system.
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
                Practice poker against GTO-style AI opponents in No-Limit Texas Hold'em and Pot-Limit Omaha, with a real-time AI coach providing GTO-based feedback on every decision.
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
              <h3>Mission</h3>
              <p>AI-Driven Transformation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="innovation-approach">
        <div className="container">
          <h2>Our Innovation Approach</h2>
          <p className="approach-intro">
            At Maia AI, we don't just build products; we identify market opportunities where AI can create transformative value and develop solutions that define new categories.
          </p>
          <div className="approach-grid">
            <div className="approach-card">
              <h3>Market Discovery</h3>
              <p>We continuously scan industries for opportunities where AI can solve real problems and create significant value.</p>
            </div>
            <div className="approach-card">
              <h3>Rapid Prototyping</h3>
              <p>Our agile development process allows us to quickly validate ideas and iterate based on user feedback.</p>
            </div>
            <div className="approach-card">
              <h3>Strategic Partnerships</h3>
              <p>We collaborate with industry leaders to ensure our solutions integrate seamlessly into existing ecosystems.</p>
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
