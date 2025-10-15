/**
 * HABS TECHNOLOGIES GROUP
 * Contact Page Screen
 */

'use client';

import { useState } from 'react';
import './contact.css';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Button from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        consent: false,
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact">
        <section className="contact-success section">
          <div className="container">
            <div className="contact-success__content">
              <div className="contact-success__icon">✓</div>
              <h1 className="contact-success__title">Thanks—your message is in.</h1>
              <p className="contact-success__text">
                Our team will reply shortly. We typically respond within one business day.
              </p>
              <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="contact">
      {/* Hero */}
      <section className="contact-hero section">
        <div className="container">
          <h1 className="contact-hero__title">Let's build something great.</h1>
          <p className="contact-hero__subtitle">
            Send a note and we'll get back within one business day.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="contact-form-section section">
        <div className="container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form__row">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="contact-form__row">
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />

              <Input
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
              />
            </div>

            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Tell us about your project or inquiry..."
            />

            <div className="contact-form__consent">
              <label className="contact-form__checkbox">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to be contacted and have read the{' '}
                  <a href="/legal/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                  . *
                </span>
              </label>
            </div>

            {error && <div className="contact-form__error">{error}</div>}

            <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}













