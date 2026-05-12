import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Maia Technologies</h3>
            <p>Building tomorrow's AI-powered businesses</p>
            <p className="copyright">&copy; 2025 Maia AI, LLC. All rights reserved.</p>
          </div>
          
          <div className="footer-section">
            <h4>Products</h4>
            <ul>
              <li><Link to="/products#maia">Maia</Link></li>
              <li><Link to="/products#buildmyapp">BuildMyApp</Link></li>
              <li><Link to="/products#vilora">Vilora</Link></li>
              <li><Link to="/products#alphaai">AlphaAI</Link></li>
              <li><Link to="/products#alphapoker">AlphaPoker</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              {/* <li><Link to="/team">Team</Link></li> */}
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:info@maiatech.ai">info@maiatech.ai</a></li>
              {/* <li><a href="https://linkedin.com/company/maia-technologies" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com/maiatech" target="_blank" rel="noopener noreferrer">Twitter</a></li> */}
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Transforming Industries Through AI Innovation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;