import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/AccessRequestModal.css';

export type AccessRequestModalProps = {
  productName: 'AlphaAI' | 'AlphaPoker';
  isOpen: boolean;
  onClose: () => void;
};

const EMAILJS_SERVICE_ID = 'service_swi6amx';
const EMAILJS_PUBLIC_KEY = 'DiJ2_UqcVKRzuKMBE';
const EMAILJS_ACCESS_TEMPLATE_ID = 'TEMPLATE_ID_FROM_TIM';

const initialForm = {
  name: '',
  company: '',
  email: '',
  city: '',
  reason: '',
};

const AccessRequestModal: React.FC<AccessRequestModalProps> = ({ productName, isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialForm);
      setSubmitStatus('idle');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ACCESS_TEMPLATE_ID,
        {
          product_name: productName,
          from_name: formData.name,
          company: formData.company,
          from_email: formData.email,
          city: formData.city,
          reason: formData.reason,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitStatus('success');
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error('AccessRequestModal EmailJS error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="access-modal-backdrop"
      data-testid="access-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="access-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="access-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 id="access-modal-title">Request access to {productName}</h2>
        <p className="access-modal-subtitle">
          Tell us a bit about yourself and we'll be in touch.
        </p>

        <form onSubmit={handleSubmit} className="access-modal-form">
          <div className="form-group">
            <label htmlFor="access-name">Name *</label>
            <input
              type="text"
              id="access-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="access-company">Company *</label>
            <input
              type="text"
              id="access-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="access-email">Email *</label>
            <input
              type="email"
              id="access-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="access-city">City *</label>
            <input
              type="text"
              id="access-city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="access-reason">Reason for request *</label>
            <textarea
              id="access-reason"
              name="reason"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          {submitStatus === 'success' && (
            <div className="form-message success">
              Thanks! Your request has been sent. We'll be in touch soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="form-message error">
              Sorry, something went wrong. Please email us directly at <a href="mailto:support@maiatech.ai">support@maiatech.ai</a>.
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccessRequestModal;
