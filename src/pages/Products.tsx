import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Products.css';
import AccessRequestModal from '../components/AccessRequestModal';

type AccessProduct = 'AlphaAI' | 'AlphaPoker';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [accessOpen, setAccessOpen] = useState<AccessProduct | null>(null);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <h1>Our Products</h1>
          <p className="lead">Five active products across personal AI, marketplaces, mediation, finance, and games</p>
        </div>
      </section>

      <section className="product-details">
        <div className="container">

          <div className="product-section" id="maia">
            <div className="product-header">
              <h2>Maia</h2>
              <span className="product-status active">Active</span>
            </div>
            <div className="product-content reverse">
              <div className="product-image">
                <img src="/images/maia-icon.jpg" alt="Maia" className="product-detail-img" />
              </div>
              <div className="product-description">
                <h3>An AI assistant for everyday tasks</h3>
                <p>
                  Maia is an iOS app that helps you organize tasks, find information, and stay on top of daily workflows. It learns how you work and adapts to your preferences, with a privacy-first design.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Natural-language task management</li>
                  <li>Intelligent information retrieval</li>
                  <li>Personalized recommendations</li>
                  <li>Multi-platform sync</li>
                  <li>Privacy-first design</li>
                </ul>
                <h4>Who it's for:</h4>
                <p>
                  Anyone who wants help organizing their day.
                </p>
                <span className="product-badge">Available on iOS</span>
              </div>
            </div>
          </div>

          <div className="product-section" id="buildmyapp">
            <div className="product-header">
              <h2>BuildMyApp</h2>
              <span className="product-status active">Active (private pilot)</span>
            </div>
            <div className="product-content">
              <div className="product-description">
                <h3>A marketplace for commissioning custom software</h3>
                <p>
                  BuildMyApp is a marketplace where non-technical buyers commission custom software from independent developers, or license already-built products. Buyers post fixed-price requests, developers build, and BMA operates the runtime so buyers can launch with one click. Every build comes with a 30-day warranty and AI-mediated dispute resolution. When a commissioned product gets re-licensed later, the original buyer earns a share.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Demand-first marketplace: buyers post fixed-price requests; developers compete on quality, not bidding.</li>
                  <li>30-day warranty on every build; AI-mediated dispute resolution.</li>
                  <li>Web-hosted delivery: one-click "Launch" for non-technical buyers; BMA operates the runtime.</li>
                  <li>Developer Marketplace: developers list completed software (Buy and Buy-out pricing).</li>
                  <li>Lifecycle revenue split: original buyers earn when their commissioned software is re-licensed.</li>
                </ul>
                <h4>Who it's for:</h4>
                <p>
                  Small businesses commissioning their first piece of custom software, domain experts inside larger organizations, and developers looking for validated demand.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => window.open('https://appmarketplace.dev', '_blank', 'noopener,noreferrer')}
                >
                  View Detailed Information
                </button>
              </div>
              <div className="product-image">
                <img src="/images/buildmyapp-icon.png" alt="BuildMyApp" className="product-detail-img" />
              </div>
            </div>
          </div>

          <div className="product-section" id="vilora">
            <div className="product-header">
              <h2>Vilora</h2>
              <span className="product-status active">Active</span>
            </div>
            <div className="product-content reverse">
              <div className="product-image">
                <img src="/images/vilora-icon.png" alt="Vilora" className="product-detail-img" />
              </div>
              <div className="product-description">
                <h3>Strength Through Dialogue</h3>
                <p>
                  Vilora is an AI for mediation, collaboration, brainstorming, and decision-making. Working through a disagreement, exploring an idea, making a tough call, or planning something complex: Vilora facilitates the conversation, surfaces what matters, and helps people reach clarity. Use it solo, with another person, or as a group.
                </p>
                <h4>Three Modes:</h4>
                <ul>
                  <li><strong>Group Sessions:</strong> Invite one or more people into a shared conversation. Pick a session purpose (Mediation, Brainstorming, Decision-making, Planning, General discussion) to shape how Vilora shows up.</li>
                  <li><strong>One-on-One with Vilora:</strong> A private conversation. Tone chips let you steer how Vilora engages: quick advice, deep exploration, devil's advocate, action plan, encouragement.</li>
                  <li><strong>The Vilora Council:</strong> Five specialized advisor personas analyze your question in parallel, peer-review each other's blind spots, then deliver a synthesized recommendation with a concrete next step.</li>
                </ul>
                <h4>Key Features:</h4>
                <ul>
                  <li>Eight specialized mediation frameworks (relationships, family, workplace, roommates, neighbors, politics, business partnerships, general disputes).</li>
                  <li>Structured intake: each party shares privately before joint sessions.</li>
                  <li>AI-generated session summaries with concerns, agreements, and next steps.</li>
                  <li>Invite links via email or SMS.</li>
                  <li>Session history with unread counts and quick re-entry.</li>
                </ul>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => window.open('https://vilora.ai', '_blank', 'noopener,noreferrer')}
                >
                  View Detailed Information
                </button>
              </div>
            </div>
          </div>

          <div className="product-section" id="alphaai">
            <div className="product-header">
              <h2>AlphaAI</h2>
              <span className="product-status active">Active (private access)</span>
            </div>
            <div className="product-content">
              <div className="product-description">
                <h3>Investment research and strategy, powered by AI agents</h3>
                <p>
                  AlphaAI is a research tool for investors. Three AI agents handle morning briefings, deep company analysis, and strategy and portfolio building. A separate automated screener works through 21 quantitative factors daily to surface undervalued opportunities. No coding required: point, click, and explore.
                </p>
                <h4>Three Live AI Agents:</h4>
                <ul>
                  <li><strong>Morning Briefing Agent:</strong> Daily market intelligence powered by real economic data. FRED API indicators (unemployment, inflation, Fed rates), earnings calendar, pre-market conditions, weekly themes, and professional market analysis in minutes.</li>
                  <li><strong>Research Agent:</strong> Comprehensive company and stock analysis. Natural-language queries (e.g., "Analyze Tesla's growth potential vs Ford"), financial fundamentals via yfinance, multi-company comparisons, and AI-powered investment recommendations.</li>
                  <li><strong>Strategy Agent:</strong> Investment strategy development and portfolio optimization. Interactive strategy builder (value, growth, momentum), risk tolerance configuration, and portfolio allocation recommendations.</li>
                </ul>
                <p>
                  <strong>Plus, in development:</strong> Investment Discovery System, automated daily screening using 21 quantitative factors to identify undervalued opportunities.
                </p>
                <button type="button" className="btn-primary" onClick={() => setAccessOpen('AlphaAI')}>
                  Request Access
                </button>
              </div>
              <div className="product-image">
                <img src="/images/alphaai-icon.jpg" alt="AlphaAI" className="product-detail-img" />
              </div>
            </div>
          </div>

          <div className="product-section" id="alphapoker">
            <div className="product-header">
              <h2>AlphaPoker</h2>
              <span className="product-status active">Active (private access)</span>
            </div>
            <div className="product-content reverse">
              <div className="product-image">
                <img src="/images/alphapoker-icon.jpg" alt="AlphaPoker" className="product-detail-img" />
              </div>
              <div className="product-description">
                <h3>Practice poker against GTO-style AI opponents</h3>
                <p>
                  AlphaPoker is a web-based poker trainer that lets you practice against AI opponents using GTO (Game-Theory-Optimal) strategy. Play No-Limit Texas Hold'em and Pot-Limit Omaha in heads-up through 6-max formats, with a real-time coach analyzing every decision and comparing your plays to optimal strategy.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Multiple game types: No-Limit Texas Hold'em and Pot-Limit Omaha.</li>
                  <li>Flexible table sizes: heads-up through 6-max.</li>
                  <li>GTO AI opponents: position-aware pre-flop ranges, balanced post-flop strategy.</li>
                  <li>Real-time AI coach with GTO-based analysis.</li>
                  <li>Training feedback comparing your plays to optimal strategy.</li>
                  <li>Hand history tracking and statistics dashboard.</li>
                  <li>Leaderboard for comparing performance.</li>
                  <li>Tournament mode (elimination-style play).</li>
                  <li>Scenario Analyzer with card picker and multi-street coaching.</li>
                  <li>Hand sharing via Text/SMS, WhatsApp, X, Email with OG preview images.</li>
                  <li>Responsive design for desktop, tablet, and mobile.</li>
                </ul>
                <h4>Who it's for:</h4>
                <p>
                  Poker players who want serious GTO training and analysis without paying for expensive solver software.
                </p>
                <button type="button" className="btn-primary" onClick={() => setAccessOpen('AlphaPoker')}>
                  Request Access
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="future-products">
        <div className="container">
          <h2>What's Next?</h2>
          <p className="future-intro">
            We're always poking at new ideas. If one of our products interests you, or you have an idea for something we should build, get in touch.
          </p>
          <div className="innovation-cta">
            <p>Interested in partnering with us, or have an idea for what we should build next?</p>
            <button
              className="btn-secondary"
              onClick={() => {
                navigate('/contact');
                window.scrollTo(0, 0);
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      <AccessRequestModal
        productName={(accessOpen ?? 'AlphaAI') as AccessProduct}
        isOpen={accessOpen !== null}
        onClose={() => setAccessOpen(null)}
      />
    </div>
  );
};

export default Products;
