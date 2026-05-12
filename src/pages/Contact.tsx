import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    type: 'partnership',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      await emailjs.send(
        'service_swi6amx',     // Your EmailJS service ID
        'template_7pbj9pj',    // Your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          inquiry_type: formData.type,
          message: formData.message,
          to_name: 'Maia Technologies Team',
        },
        'DiJ2_UqcVKRzuKMBE'    // Your EmailJS public key
      );

      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        type: 'partnership',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p className="lead">Let's discuss how we can work together</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Partnership Opportunities</h2>
              <p>
                We're open to partnerships, integrations, and conversations with investors or anyone who thinks we could build something together. Email us, or use the form.
              </p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <h3>Contact Us</h3>
                  <p>support@maiatech.ai</p>
                </div>
              </div>

              <div className="partnership-types">
                <h3>Types of Partnerships We Seek</h3>
                <ul>
                  <li>Technology integrations (APIs, data sharing)</li>
                  <li>Distribution and channel partnerships</li>
                  <li>Strategic investors and advisors</li>
                  <li>Industry associations and organizations</li>
                  <li>Research and development collaborations</li>
                </ul>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company/Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Inquiry Type *</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="integration">API/Integration Request</option>
                    <option value="investment">Investment Inquiry</option>
                    <option value="demo">Product Demo</option>
                    <option value="careers">Career Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="What brings you here? A few sentences is fine."
                    disabled={isSubmitting}
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="form-message success">
                    ✓ Thank you! Your message has been sent successfully. We'll be in touch soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message error">
                    ✗ Sorry, there was an error sending your message. Please try again or email us directly at support@maiatech.ai
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="office-info">
        <div className="container">
          <h2>Our Offices</h2>
          <div className="offices-grid">
            <div className="office">
              <h3>Headquarters</h3>
              <p>United States</p>
              <p>Remote-first team across multiple cities and time zones.</p>
            </div>
            <div className="office">
              <h3>How We Work</h3>
              <p>Distributed and asynchronous, with regular video syncs and a shared product cadence.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;