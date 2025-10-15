/**
 * HABS TECHNOLOGIES GROUP
 * Application Form Page Screen
 */

'use client';

import { useState } from 'react';
import './application.css';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Select from '@/components/ui/select';
import Button from '@/components/ui/button';

const projectTypes = [
  { value: 'landing', label: 'Starter Landing (One-Page)' },
  { value: 'multi-page', label: 'Multi-Page Site' },
  { value: 'backend', label: 'Site with Backend' },
  { value: 'ecommerce', label: 'Online Store (E-commerce)' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'other', label: 'Other / Custom' },
];

const budgetRanges = [
  { value: 'under-1k', label: 'Under €1,000' },
  { value: '1-3k', label: '€1,000 - €3,000' },
  { value: '3-7k', label: '€3,000 - €7,000' },
  { value: '7-15k', label: '€7,000 - €15,000' },
  { value: '15k-plus', label: '€15,000+' },
];

const timelines = [
  { value: 'asap', label: 'ASAP' },
  { value: '2-4-weeks', label: '2-4 weeks' },
  { value: '1-2-months', label: '1-2 months' },
  { value: 'flexible', label: 'Flexible' },
];

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    brief: '',
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
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="application">
        <section className="application-success section">
          <div className="container">
            <div className="application-success__content">
              <div className="application-success__icon">✓</div>
              <h1 className="application-success__title">Thanks—your application has been received.</h1>
              <p className="application-success__text">
                An admin will review and contact you within one business day (usually within 24 hours).
              </p>
              <p className="application-success__text">
                We'll send you a confirmation email shortly.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="application">
      {/* Hero */}
      <section className="application-hero section">
        <div className="container">
          <h1 className="application-hero__title">Start a Project</h1>
          <p className="application-hero__subtitle">
            Fill this short brief. We'll reply with next steps and a proposed scope within 24 hours (business days).
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="application-form-section section">
        <div className="container">
          <form onSubmit={handleSubmit} className="application-form">
            {/* Personal Info */}
            <div className="application-form__section">
              <h3 className="application-form__heading">Your Information</h3>

              <div className="application-form__row">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />

                <Input
                  label="Work Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@company.com"
                />
              </div>

              <div className="application-form__row">
                <Input
                  label="Phone / WhatsApp"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />

                <Input
                  label="Company / Organization"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="application-form__section">
              <h3 className="application-form__heading">Project Details</h3>

              <Select
                label="Project Type"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                options={projectTypes}
                required
                placeholder="Select project type"
              />

              <div className="application-form__row">
                <Select
                  label="Budget Range"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  options={budgetRanges}
                  required
                  placeholder="Select budget range"
                />

                <Select
                  label="Target Timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  options={timelines}
                  required
                  placeholder="Select timeline"
                />
              </div>

              <Textarea
                label="Short Brief"
                name="brief"
                value={formData.brief}
                onChange={handleChange}
                required
                rows={8}
                placeholder="Tell us about your project: goals, target audience, key features, references, or any other relevant details..."
              />
            </div>

            {/* Consent */}
            <div className="application-form__consent">
              <label className="application-form__checkbox">
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

            {error && <div className="application-form__error">{error}</div>}

            <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth>
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}













