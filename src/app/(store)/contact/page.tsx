'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    toast.success('Message sent successfully!');
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CheckCircle style={{ width: '40px', height: '40px', color: '#10b981' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            marginBottom: '16px',
            color: '#1d1d1f'
          }}>
            Message Sent
          </h1>
          <p style={{ fontSize: '15px', color: '#6e6e73', marginBottom: '24px', lineHeight: 1.6 }}>
            Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: '#1d1d1f',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main" style={{ padding: '60px 20px 80px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(32px, 6vw, 42px)',
          fontWeight: 400,
          marginBottom: '16px',
          color: '#1d1d1f'
        }}>
          Contact Us
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#6e6e73',
          maxWidth: '500px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Have a question or need assistance? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '48px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Contact Info */}
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '24px',
            color: '#1d1d1f'
          }}>
            Get in Touch
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a
              href="mailto:2wenty3llc@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#1d1d1f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Mail style={{ width: '20px', height: '20px', color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '4px' }}>Email</div>
                <div style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>2wenty3llc@gmail.com</div>
              </div>
            </a>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px',
              backgroundColor: '#f8f8f8',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#1d1d1f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Phone style={{ width: '20px', height: '20px', color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '4px' }}>Response Time</div>
                <div style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>24-48 Hours</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px',
              backgroundColor: '#f8f8f8',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#1d1d1f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin style={{ width: '20px', height: '20px', color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '4px' }}>Location</div>
                <div style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>United States</div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div style={{ marginTop: '32px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              color: '#1d1d1f'
            }}>
              Business Hours
            </h3>
            <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.8 }}>
              Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
              Saturday: 10:00 AM - 4:00 PM (PST)<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '24px',
            color: '#1d1d1f'
          }}>
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select a topic</option>
                <option value="order">Order Inquiry</option>
                <option value="product">Product Question</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="shipping">Shipping Information</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '120px'
                }}
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#1d1d1f',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                border: 'none',
                borderRadius: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send style={{ width: '16px', height: '16px' }} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
