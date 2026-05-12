import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Maia Technologies</h1>
          <p className="lead">Innovation Lab Building the Future of AI-Powered Software</p>
        </div>
      </section>

      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, Maia Technologies emerged from a simple observation: while AI technology 
              was advancing rapidly, many industries lacked the expertise and resources to 
              harness its transformative potential. We set out to bridge this gap.
            </p>
            <p>
              Our team of experienced technologists and entrepreneurs came together with a 
              shared vision: to identify opportunities where AI could create revolutionary 
              change and build the products that would define new categories.
            </p>
            <p>
              Today, we operate as an innovation lab, developing AI-powered products across personal productivity, software marketplaces, mediation, financial research, and consumer applications. We're committed to building products that matter.
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
                To identify and capitalize on transformative AI opportunities across industries, 
                creating software products that redefine how people work, play, and interact 
                with technology.
              </p>
            </div>
            <div className="mv-card">
              <h2>Our Vision</h2>
              <p>
                To be a premier AI innovation lab, known for creating category-defining 
                products and businesses that seamlessly integrate artificial intelligence into everyday life 
                and business operations.
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
              <h3>Innovation First</h3>
              <p>We constantly push boundaries, exploring new applications of AI technology.</p>
            </div>
            <div className="value-card">
              <h3>User-Centric Design</h3>
              <p>Every product we build starts with understanding real user needs and pain points.</p>
            </div>
            <div className="value-card">
              <h3>Rapid Execution</h3>
              <p>We move fast, iterate quickly, and aren't afraid to pivot when needed.</p>
            </div>
            <div className="value-card">
              <h3>Strategic Thinking</h3>
              <p>We carefully select opportunities where we can create the most significant impact.</p>
            </div>
            <div className="value-card">
              <h3>Partnership Focused</h3>
              <p>We believe in collaborative innovation and actively seek strategic partnerships.</p>
            </div>
            <div className="value-card">
              <h3>Ethical AI</h3>
              <p>We're committed to developing AI solutions that are responsible and beneficial.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="technology-partners">
        <div className="container">
          <h2>Technology Partners</h2>
          <p className="partners-intro">
            We leverage best-in-class technologies and platforms to build our innovative solutions.
          </p>
          <div className="partners-grid">
            <div className="partner">Google Cloud Platform</div>
            <div className="partner">OpenAI</div>
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