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
          <p className="lead">Innovative AI Solutions Transforming Industries</p>
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
                <h3>Your AI-powered productivity companion</h3>
                <p>
                  Maia is the flagship AI assistant from Maia AI LLC. Leveraging advanced language models and adaptive learning, Maia transforms how individuals manage tasks, information, and daily workflows.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Natural-language task management</li>
                  <li>Intelligent information retrieval</li>
                  <li>Personalized recommendations</li>
                  <li>Multi-platform sync</li>
                  <li>Privacy-first design</li>
                </ul>
                <h4>Target Market:</h4>
                <p>
                  Professionals, students, and individuals seeking to enhance their productivity through intelligent AI assistance.
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
                <h3>A demand-first software marketplace</h3>
                <p>
                  BuildMyApp is an AI-augmented marketplace where non-technical buyers commission custom software from independent developers and license completed products. Buyers post fixed-price requests, developers commit to build, and BMA operates the runtime so buyers can launch their software with one click. Built-in warranty, AI-mediated collaboration, and lifecycle revenue sharing make it a new model for software commissioning.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Demand-first marketplace: buyers post fixed-price requests; developers compete on quality, not bidding.</li>
                  <li>30-day warranty on every build; AI-mediated dispute resolution.</li>
                  <li>Web-hosted delivery: one-click "Launch" for non-technical buyers; BMA operates the runtime.</li>
                  <li>Developer Marketplace: developers list completed software (Buy and Buy-out pricing).</li>
                  <li>Lifecycle revenue split: original buyers earn when their commissioned software is re-licensed.</li>
                </ul>
                <h4>Target Market:</h4>
                <p>
                  Small businesses commissioning their first piece of custom software, domain experts inside organizations, and developers looking for validated demand.
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
                  Vilora is an AI-powered platform for mediation, collaboration, brainstorming, and decision-making. Whether working through a disagreement, exploring ideas, making a tough decision, or planning something complex, Vilora facilitates the conversation, surfaces what matters, and helps people reach clarity. Use it alone, with another person, or as a group.
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
                <h3>An intelligent investment research platform</h3>
                <p>
                  AlphaAI helps you find alpha in the markets using AI-powered analysis, automated screening, and strategy development. A dual-purpose platform combining on-demand AI agents for research and analysis with an automated investment discovery system. No coding required; point, click, and discover alpha.
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
                  AlphaPoker is a web-based poker training application that helps you sharpen your game against AI opponents using GTO (Game-Theory-Optimal) strategy. Play No-Limit Texas Hold'em and Pot-Limit Omaha in heads-up through 6-max formats, with a real-time AI coach providing GTO-based feedback on every decision.
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
                <h4>Target Market:</h4>
                <p>
                  Poker players seeking professional-level GTO training and analysis without paying for expensive solver software.
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
            We're constantly exploring new opportunities where AI can create transformative value. Our innovation lab is always working on the next breakthrough.
          </p>
          <div className="innovation-cta">
            <p>Interested in partnering with us or learning about upcoming products?</p>
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
