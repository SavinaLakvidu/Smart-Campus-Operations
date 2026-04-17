import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ContactPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setForm({ name: '', email: '', message: '' });
    };

    const contactInfo = [
        { icon: '📍', title: 'Visit Us', detail: 'Pita Kotte, Sri Lanka' },
        { icon: '📞', title: 'Call Us', detail: '+94 11 123 4567', sub: 'Mon-Fri, 9am-5pm' },
        { icon: '📧', title: 'Email Us', detail: 'support@zentrix.edu', sub: 'Response within 24 hours' },
        { icon: '🕒', title: 'Hours', detail: 'Monday - Friday', sub: '9:00 AM - 6:00 PM' }
    ];

    const faqs = [
        { q: 'How do I book a resource?', a: 'Login to your account and navigate to "New Booking" to select available resources and schedule your booking.' },
        { q: 'How do I report an incident?', a: 'Go to "Report Incident" from the navigation menu, fill in the details, and submit. Our team will respond promptly.' },
        { q: 'How can I check my booking status?', a: 'Visit "My Bookings" section to view all your bookings and their current status.' },
        { q: 'What if I need technical support?', a: 'Contact our support team via email or phone, or submit a ticket through the system.' }
    ];

    return (
        <div style={styles.page}>
            {/* Hero Section */}
            <div style={styles.heroSection}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.container}>
                    <div style={styles.heroContent}>
                        <div style={styles.badge}>
                            <span style={styles.badgeIcon}>📞</span>
                            Get in Touch
                        </div>
                        <h1 style={styles.heroTitle}>
                            Contact
                            <span style={styles.heroAccent}> Zentrix Campus</span>
                        </h1>
                        <p style={styles.heroDescription}>
                            Have questions? We're here to help. Reach out to us through any of the channels below.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <div style={styles.infoSection}>
                <div style={styles.container}>
                    <div style={styles.infoGrid}>
                        {contactInfo.map((info, index) => (
                            <div key={index} style={styles.infoCard}>
                                <div style={styles.infoIcon}>{info.icon}</div>
                                <h3 style={styles.infoTitle}>{info.title}</h3>
                                <p style={styles.infoDetail}>{info.detail}</p>
                                {info.sub && <p style={styles.infoSub}>{info.sub}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Form and Map Section */}
            <div style={styles.formSection}>
                <div style={styles.container}>
                    <div style={styles.formGrid}>
                        {/* Contact Form */}
                        <div style={styles.formCard}>
                            <div style={styles.formHeader}>
                                <h2 style={styles.formTitle}>Send us a Message</h2>
                                <p style={styles.formDescription}>
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            {submitted && (
                                <div style={styles.successMessage}>
                                    ✓ Message sent successfully! We'll respond shortly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="How can we help you?"
                                        rows="5"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        style={styles.textarea}
                                    />
                                </div>

                                <button type="submit" style={styles.submitButton}>
                                    Send Message
                                    <span style={styles.buttonArrow}>→</span>
                                </button>
                            </form>
                        </div>

                        {/* Map Section - Updated with Pita Kotte Location */}
                        <div style={styles.mapCard}>
                            <div style={styles.mapHeader}>
                                <h2 style={styles.mapTitle}>Find Us Here</h2>
                                <p style={styles.mapDescription}>
                                    Visit our campus located in Pita Kotte, Sri Lanka
                                </p>
                            </div>
                            
                            <div style={styles.mapContainer}>
                                <iframe
                                    title="Zentrix Campus Location - Pita Kotte"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126868.20924791005!2d79.85478695644034!3d6.892041818541607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b3b5a9e9e4b%3A0x2e7d8c8e5a9f7e2a!2sPita%20Kotte%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>

                            <div style={styles.addressBox}>
                                <div style={styles.addressIcon}>🏢</div>
                                <div>
                                    <h4 style={styles.addressTitle}>Zentrix Campus Headquarters</h4>
                                    <p style={styles.addressText}>Pita Kotte, Sri Lanka</p>
                                    <p style={styles.addressText}>Conveniently located in the heart of Kotte</p>
                                </div>
                            </div>

                            <div style={styles.directionsBox}>
                                <p style={styles.directionsText}>
                                    🚗 Ample parking available on campus
                                </p>
                                <p style={styles.directionsText}>
                                    🚌 Bus stop within walking distance
                                </p>
                                <p style={styles.directionsText}>
                                    🚉 Convenient access to public transportation
                                </p>
                                <p style={styles.directionsText}>
                                    📍 Easily accessible from Colombo via main roads
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div style={styles.faqSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionLabel}>FAQ</div>
                        <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
                        <p style={styles.sectionDescription}>
                            Find quick answers to common questions
                        </p>
                    </div>

                    <div style={styles.faqGrid}>
                        {faqs.map((faq, index) => (
                            <div key={index} style={styles.faqCard}>
                                <div style={styles.faqQuestion}>{faq.q}</div>
                                <p style={styles.faqAnswer}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={styles.ctaSection}>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <h2 style={styles.ctaTitle}>Need Immediate Assistance?</h2>
                        <p style={styles.ctaDescription}>
                            Our support team is ready to help you 24/7
                        </p>
                        <div style={styles.ctaButtons}>
                            <a href="tel:+94111234567" style={styles.ctaButtonPrimary}>
                                Call Support
                            </a>
                            <Link to="/login" style={styles.ctaButtonSecondary}>
                                Access Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },

    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
    },

    heroSection: {
        position: 'relative',
        backgroundColor: '#000000',
        overflow: 'hidden'
    },

    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
    },

    heroContent: {
        position: 'relative',
        textAlign: 'center',
        padding: '80px 0 100px',
        zIndex: 1
    },

    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '6px 16px',
        borderRadius: '100px',
        fontSize: '0.875rem',
        color: '#e5e7eb',
        marginBottom: '24px'
    },

    badgeIcon: {
        fontSize: '1rem'
    },

    heroTitle: {
        fontSize: '3rem',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '16px',
        letterSpacing: '-0.02em'
    },

    heroAccent: {
        color: '#ffffff'
    },

    heroDescription: {
        fontSize: '1.125rem',
        color: '#d1d5db',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6'
    },

    infoSection: {
        padding: '60px 0',
        backgroundColor: '#f8f9fa'
    },

    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
    },

    infoCard: {
        textAlign: 'center',
        padding: '32px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        transition: 'transform 0.3s ease',
        border: '1px solid #e5e7eb'
    },

    infoIcon: {
        fontSize: '2rem',
        marginBottom: '16px'
    },

    infoTitle: {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '8px'
    },

    infoDetail: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '4px'
    },

    infoSub: {
        fontSize: '0.75rem',
        color: '#9ca3af'
    },

    formSection: {
        padding: '80px 0',
        backgroundColor: '#ffffff'
    },

    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '32px'
    },

    formCard: {
        padding: '40px',
        backgroundColor: '#f8f9fa',
        borderRadius: '20px',
        border: '1px solid #e5e7eb'
    },

    formHeader: {
        marginBottom: '32px'
    },

    formTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '8px'
    },

    formDescription: {
        fontSize: '0.875rem',
        color: '#6b7280'
    },

    successMessage: {
        backgroundColor: '#10b981',
        color: '#ffffff',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '0.875rem',
        textAlign: 'center'
    },

    inputGroup: {
        marginBottom: '20px'
    },

    label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '8px'
    },

    input: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
        backgroundColor: '#ffffff'
    },

    textarea: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
        backgroundColor: '#ffffff',
        fontFamily: 'inherit',
        resize: 'vertical'
    },

    submitButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#000000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },

    buttonArrow: {
        transition: 'transform 0.2s ease'
    },

    mapCard: {
        padding: '40px',
        backgroundColor: '#f8f9fa',
        borderRadius: '20px',
        border: '1px solid #e5e7eb'
    },

    mapHeader: {
        marginBottom: '24px'
    },

    mapTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '8px'
    },

    mapDescription: {
        fontSize: '0.875rem',
        color: '#6b7280'
    },

    mapContainer: {
        marginBottom: '24px',
        borderRadius: '12px',
        overflow: 'hidden'
    },

    addressBox: {
        display: 'flex',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        marginBottom: '20px'
    },

    addressIcon: {
        fontSize: '1.5rem'
    },

    addressTitle: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '4px'
    },

    addressText: {
        fontSize: '0.75rem',
        color: '#6b7280',
        marginBottom: '2px'
    },

    directionsBox: {
        padding: '16px',
        backgroundColor: '#f3f4f6',
        borderRadius: '12px'
    },

    directionsText: {
        fontSize: '0.75rem',
        color: '#4b5563',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },

    faqSection: {
        padding: '80px 0',
        backgroundColor: '#f8f9fa'
    },

    sectionHeader: {
        textAlign: 'center',
        marginBottom: '48px'
    },

    sectionLabel: {
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#000000',
        marginBottom: '12px'
    },

    sectionTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '16px',
        letterSpacing: '-0.02em'
    },

    sectionDescription: {
        fontSize: '1rem',
        color: '#6b7280',
        maxWidth: '600px',
        margin: '0 auto'
    },

    faqGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px'
    },

    faqCard: {
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        transition: 'transform 0.3s ease'
    },

    faqQuestion: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '12px'
    },

    faqAnswer: {
        fontSize: '0.875rem',
        color: '#6b7280',
        lineHeight: '1.6'
    },

    ctaSection: {
        backgroundColor: '#000000',
        padding: '80px 0'
    },

    ctaContent: {
        textAlign: 'center'
    },

    ctaTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '16px'
    },

    ctaDescription: {
        fontSize: '1rem',
        color: '#d1d5db',
        marginBottom: '32px'
    },

    ctaButtons: {
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },

    ctaButtonPrimary: {
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: '12px 28px',
        borderRadius: '10px',
        fontSize: '0.875rem',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 0.3s ease'
    },

    ctaButtonSecondary: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        padding: '12px 28px',
        borderRadius: '10px',
        fontSize: '0.875rem',
        fontWeight: '600',
        textDecoration: 'none',
        border: '1px solid #ffffff',
        transition: 'all 0.3s ease'
    }
};

// Add hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .info-card:hover,
    .faq-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .submit-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .submit-button:hover .button-arrow {
        transform: translateX(4px);
    }
    
    input:focus,
    textarea:focus {
        outline: none;
        border-color: #000000;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
    
    .cta-button-primary:hover,
    .cta-button-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    
    .cta-button-secondary:hover {
        background-color: #ffffff;
        color: #000000;
    }
`;
document.head.appendChild(styleSheet);

export default ContactPage;