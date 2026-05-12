import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Maia Technologies</h1>
          <p className="lead">A small team building practical AI software</p>
        </div>
      </section>

      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Maia AI LLC started in 2024. AI was getting much more capable, and we noticed plenty of everyday problems where the existing tools either didn't exist or felt overpriced and over-engineered. So we started building.
            </p>
            <p>
              We're a small group of technologists and entrepreneurs. The bar for each product is simple: at least one of us actually wants to use it. If it isn't useful to us, we don't ship it.
            </p>
            <p>
              Today we have five active products across personal productivity, software marketplaces, mediation, financial research, and a poker trainer. We're focused on shipping software people actually use.
            </p>
          </div>
        </div>
      </section>

      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <h2>Our Mission</h2>
              <p>
                Build AI software we'd want to use, in areas where good options don't exist yet or could be done better or cheaper.
              </p>
            </div>
            <div className="mv-card">
              <h2>Our Vision</h2>
              <p>
                Be a small lab known for shipping useful AI products. No moonshots, just things people use every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="core-values">
        <div className="container">
          <h2>Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Build What's Missing</h3>
              <p>If a tool would make a thing easier and nobody's built it, that's a good place to start.</p>
            </div>
            <div className="value-card">
              <h3>Use What We Make</h3>
              <p>We use the products we ship. If we wouldn't want to use it, we don't build it.</p>
            </div>
            <div className="value-card">
              <h3>Ship Early</h3>
              <p>Get something working, put it in front of users, fix what's wrong. Then do it again.</p>
            </div>
            <div className="value-card">
              <h3>Pick Real Problems</h3>
              <p>We focus on problems we have or see clearly, not abstract opportunities.</p>
            </div>
            <div className="value-card">
              <h3>Open to Collaboration</h3>
              <p>We work with teams whose tools we want to plug into, and we're easy to integrate with.</p>
            </div>
            <div className="value-card">
              <h3>Ethical AI</h3>
              <p>We think about how each product affects users, and we don't ship things we wouldn't want done to us.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="technology-partners">
        <div className="container">
          <h2>Technology Partners</h2>
          <p className="partners-intro">
            Tools and platforms we use to build our products.
          </p>
          <div className="partners-grid">
            <div className="partner">Google Cloud Platform</div>
            <div className="partner">OpenAI</div>
            <div className="partner">Anthropic</div>
            <div className="partner">Firebase</div>
            <div className="partner">React</div>
            <div className="partner">Python</div>
            <div className="partner">TypeScript</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;