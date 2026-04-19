import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import campusResourceImg from '../assets/carousel/campus-resource.png';
import bookingImg from '../assets/carousel/booking.jpg';
import incidentImg from '../assets/carousel/incident.jpg';
import notificationImg from '../assets/carousel/notification.jpg';

function HomePage() {
    const { user, loading } = useAuth();
    const isLoggedIn = !!user;

    const isAdmin = user?.role === 'ADMIN';
    const isTechnician = user?.role === 'TECHNICIAN';
    const isStaff = user?.role === 'STAFF';
    const isStudent = user?.role === 'STUDENT';

    const [currentSlide, setCurrentSlide] = useState(0);

    const carouselSlides = [
        {
            title: 'Book Campus Resources',
            subtitle: 'Smart access to lecture halls, labs, and meeting rooms with real-time availability. Schedule your bookings instantly.',
            icon: '🏛️',
            image: campusResourceImg,
            features: ['24/7 Availability', 'Instant Confirmation', 'Conflict Checking']
        },
        {
            title: 'Track Every Booking',
            subtitle: 'Monitor approvals, rejections, and schedules in real time from your personalized dashboard.',
            icon: '📅',
            image: bookingImg,
            features: ['Real-time Updates', 'Status Tracking', 'History Logs']
        },
        {
            title: 'Report Incidents Fast',
            subtitle: 'Raise maintenance issues and follow progress with ease through our advanced ticketing system.',
            icon: '🔧',
            image: incidentImg,
            features: ['Priority Levels', 'Photo Upload', 'Live Tracking']
        },
        {
            title: 'Smart Notifications',
            subtitle: 'Get instant alerts for booking approvals, ticket updates, and important campus announcements.',
            icon: '🔔',
            image: notificationImg,
            features: ['Email Alerts', 'In-app Notifications', 'Real-time Updates']
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [carouselSlides.length]);

    const features = [
        {
            icon: '🏛️',
            title: 'Smart Resource Access',
            description: 'Browse lecture halls, labs, meeting rooms, and campus facilities in one place with a clean, modern experience.',
            link: '/resources',
            linkText: 'Browse Resources',
            available: false
        },
        {
            icon: '📅',
            title: 'Booking Management',
            description: 'Track your facility bookings, approvals, rejections, and schedules without confusion.',
            link: '/bookings',
            linkText: 'My Bookings',
            available: isLoggedIn
        },
        {
            icon: '➕',
            title: 'Quick Booking',
            description: 'Create a new booking request fast with date, time, resource, purpose, and attendee details.',
            link: '/bookings/new',
            linkText: 'Book Now',
            available: isStudent || isStaff || isAdmin
        },
        {
            icon: '🔧',
            title: 'Incident Reporting',
            description: 'Report campus issues, damaged assets, or maintenance problems and track their progress in real time.',
            link: isTechnician ? '/technician/tickets' : '/incidents/new',
            linkText: isTechnician ? 'Ticket Updates' : 'Report Incident',
            available: isLoggedIn
        },
        {
            icon: '🔔',
            title: 'Live Notifications',
            description: 'Stay updated with booking approvals, incident changes, and important campus activity alerts.',
            link: '/notifications',
            linkText: 'View Notifications',
            available: isLoggedIn
        },
        {
            icon: '🛠️',
            title: 'Technician Workspace',
            description: 'Technicians can manage assigned tickets, update status, and add resolution notes smoothly.',
            link: '/technician/tickets',
            linkText: 'Go to Technician Panel',
            available: isTechnician || isAdmin,
            technicianOnly: true
        },
        {
            icon: '👔',
            title: 'Staff Operations',
            description: 'Staff users can manage operational activities and access their dedicated workspace.',
            link: '/staff/dashboard',
            linkText: 'Go to Staff Area',
            available: isStaff || isAdmin,
            staffOnly: true
        },
        {
            icon: '⚙️',
            title: 'Admin Control Center',
            description: 'Admins can manage bookings, users, incidents, and approvals from one centralized dashboard.',
            link: '/admin/bookings',
            linkText: 'Go to Admin Panel',
            available: isAdmin,
            adminOnly: true
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Student',
            text: 'The booking system has made reserving lab spaces so much easier. Love the real-time availability feature!',
            initial: 'SJ'
        },
        {
            name: 'Prof. Michael Chen',
            role: 'Faculty',
            text: 'Incident reporting is quick and efficient. Our maintenance team responds much faster now and, follow-ups are consistently thorough.',
            initial: 'MC'
        },
        {
            name: 'Dr. Emily Rodriguez',
            role: 'Campus Director',
            text: 'The admin panel gives me complete control over campus resources. A game-changer for management.',
            initial: 'ER'
        }
    ];

    // Shared gradient heading style for both logged-in and non-logged-in users
    const gradientHeadingStyle = {
        ...styles.heroTitle,
        animation: 'colorGradientFade 3s ease-in-out infinite',
        background: 'linear-gradient(135deg, #111827, #1e293b, #1b4d97, #47d3d3, #111827)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundSize: '300% 300%'
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p style={styles.loadingText}>Loading Zentrix Campus...</p>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            {/* Hero Section with Enhanced Carousel */}
            <div style={styles.heroWrapper}>
                <div style={styles.heroContainer}>
                    <div className="container" style={styles.heroInner}>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                {isLoggedIn ? (
                                    <>
                                        <div style={styles.welcomeBadge}>
                                            Welcome back, {user?.username}
                                        </div>
                                        <h1 style={gradientHeadingStyle}>
                                            Campus services
                                            <br />
                                            made simple
                                        </h1>
                                        <p style={styles.heroDescription}>
                                            Manage resource bookings, report incidents, monitor notifications,
                                            and handle campus workflows from one modern platform.
                                        </p>
                                        <div style={styles.buttonGroup}>
                                            {(isStudent || isStaff || isAdmin) && (
                                                <Link to="/bookings/new" style={styles.primaryButton}>
                                                    Book a Resource
                                                </Link>
                                            )}
                                            <Link to="/bookings" style={styles.secondaryButton}>
                                                View My Bookings
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={styles.welcomeBadge}>
                                            Smart Campus, Better Workflow
                                        </div>
                                        <h1 style={gradientHeadingStyle}>
                                            Your digital
                                            <br />
                                            campus operations hub
                                        </h1>
                                        <p style={styles.heroDescription}>
                                            Book facilities, report campus issues, manage workflows, and stay
                                            informed with a smooth modern experience.
                                        </p>
                                        <Link to="/login" style={styles.primaryButton}>
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="col-lg-6 mt-5 mt-lg-0">
                                <div style={styles.carouselWrapper}>
                                    {carouselSlides.map((slide, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                ...styles.carouselSlide,
                                                opacity: currentSlide === index ? 1 : 0,
                                                backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${slide.image})`
                                            }}
                                        >
                                            <div style={styles.slideContent}>
                                                <div style={styles.slideIcon}>{slide.icon}</div>
                                                <h3 style={styles.slideTitle}>{slide.title}</h3>
                                                <p style={styles.slideSubtitle}>{slide.subtitle}</p>
                                                <div style={styles.slideFeatures}>
                                                    {slide.features.map((feature, idx) => (
                                                        <span key={idx} style={styles.slideFeature}>
                                                            ✓ {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div style={styles.carouselIndicators}>
                                        {carouselSlides.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                style={{
                                                    ...styles.indicator,
                                                    width: currentSlide === index ? '30px' : '8px',
                                                    backgroundColor: currentSlide === index ? '#84cc16' : 'rgba(255,255,255,0.5)'
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
                                        style={styles.prevArrow}
                                    >
                                        ❮
                                    </button>
                                    <button
                                        onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)}
                                        style={styles.nextArrow}
                                    >
                                        ❯
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div style={styles.featuresSection}>
                <div className="container">
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionLabel}>What We Offer</div>
                        <h2 style={styles.sectionTitle}>Platform Features</h2>
                        <p style={styles.sectionDescription}>
                            Everything needed for smart campus operations
                        </p>
                    </div>

                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div style={styles.featureCard}>
                                    <div style={styles.featureIconWrapper}>
                                        <div style={styles.featureIcon}>{feature.icon}</div>
                                    </div>
                                    <h5 style={styles.featureTitle}>{feature.title}</h5>
                                    <p style={styles.featureDescription}>{feature.description}</p>
                                    <div style={styles.featureFooter}>
                                        {feature.available ? (
                                            <Link to={feature.link} style={styles.featureLink}>
                                                {feature.linkText} <span>→</span>
                                            </Link>
                                        ) : (
                                            <span style={styles.comingSoonBadge}>Coming Soon</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonial Section - Redesigned without ratings */}
            <div style={styles.testimonialSection}>
                <div className="container">
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionLabel}>Testimonials</div>
                        <h2 style={styles.sectionTitle}>What Our Users Say</h2>
                        <p style={styles.sectionDescription}>
                            Trusted by students, faculty, and staff across campus
                        </p>
                    </div>
                    <div className="row g-4">
                        {testimonials.map((testimonial, index) => (
                            <div className="col-md-4" key={index}>
                                <div style={styles.testimonialCard}>
                                    {/* Quote Icon */}
                                    <div style={styles.quoteIcon}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 11H6C6 9.5 6.5 8.5 7.5 8H9V6H6C4 6 4 8 4 8V13H10V11Z" fill="#111827"/>
                                            <path d="M20 11H16C16 9.5 16.5 8.5 17.5 8H19V6H16C14 6 14 8 14 8V13H20V11Z" fill="#111827"/>
                                        </svg>
                                    </div>
                                    
                                    {/* Testimonial Text */}
                                    <p style={styles.testimonialText}>"{testimonial.text}"</p>
                                    
                                    {/* Divider */}
                                    <div style={styles.testimonialDivider}></div>
                                    
                                    {/* Author Info */}
                                    <div style={styles.testimonialAuthor}>
                                        <div style={styles.authorInitial}>
                                            {testimonial.initial}
                                        </div>
                                        <div style={styles.authorInfo}>
                                            <div style={styles.testimonialName}>{testimonial.name}</div>
                                            <div style={styles.testimonialRole}>{testimonial.role}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Decorative Line */}
                                    <div style={styles.decorativeLine}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            {!isLoggedIn && (
                <div style={styles.ctaSection}>
                    <div className="container">
                        <div style={styles.ctaContent}>
                            <h2 style={styles.ctaTitle}>Ready to Transform Your Campus Experience?</h2>
                            <p style={styles.ctaDescription}>
                                Join thousands of users already using Zentrix Campus
                            </p>
                            <Link to="/login" style={styles.ctaButton}>
                                Get Started Now <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes colorGradientFade {
                    0% {
                        background-position: 0% 50%;
                    }
                    25% {
                        background-position: 50% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    75% {
                        background-position: 50% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .feature-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15);
                }
                
                .testimonial-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}

const styles = {
    page: {
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },

    loadingContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        gap: '16px'
    },

    loadingSpinner: {
        width: '48px',
        height: '48px',
        border: '3px solid #e5e7eb',
        borderTopColor: '#111827',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },

    loadingText: {
        color: '#6b7280',
        fontSize: '0.875rem'
    },

    heroWrapper: {
        padding: '100px 20px',
    },

    heroContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
    },

    heroInner: {
        padding: '50px',
        maxWidth: '1200px',
        margin: '0 auto'
    },

    welcomeBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#f3f4f6',
        padding: '6px 16px',
        borderRadius: '100px',
        fontSize: '0.875rem',
        color: '#111827',
        marginBottom: '24px',
        fontWeight: '500'
    },

    heroTitle: {
        fontSize: '3.5rem',
        lineHeight: '1.1',
        fontWeight: '800',
        marginBottom: '20px',
        letterSpacing: '-0.02em'
    },

    heroDescription: {
        color: '#6b7280',
        fontSize: '1rem',
        lineHeight: '1.7',
        maxWidth: '560px',
        marginBottom: '28px'
    },

    buttonGroup: {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap'
    },

    primaryButton: {
        backgroundColor: '#111827',
        color: '#ffffff',
        padding: '14px 28px',
        fontWeight: '600',
        fontSize: '0.9rem',
        textDecoration: 'none',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        display: 'inline-block'
    },

    secondaryButton: {
        backgroundColor: '#f3f4f6',
        color: '#111827',
        padding: '14px 28px',
        fontWeight: '600',
        fontSize: '0.9rem',
        textDecoration: 'none',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        display: 'inline-block'
    },

    carouselWrapper: {
        position: 'relative',
        minHeight: '480px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.2)'
    },

    carouselSlide: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'opacity 0.8s ease-in-out',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '30px'
    },

    slideContent: {
        backgroundColor: 'transparent',
        padding: '28px',
        borderRadius: '20px'
    },

    slideIcon: {
        fontSize: '2.5rem',
        marginBottom: '12px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },

    slideTitle: {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '8px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },

    slideSubtitle: {
        color: '#f3f4f6',
        fontSize: '1rem',
        fontWeight:'500',
        marginBottom: '16px',
        lineHeight: '1.6',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },

    slideFeatures: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginTop: '12px'
    },

    slideFeature: {
        fontSize: '0.75rem',
        color: '#84cc16',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '4px 10px',
        borderRadius: '20px',
        fontWeight: '600',
        backdropFilter: 'blur(5px)'
    },

    carouselIndicators: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 10
    },

    indicator: {
        height: '8px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },

    prevArrow: {
        position: 'absolute',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'all 0.3s ease',
        zIndex: 10
    },

    nextArrow: {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'all 0.3s ease',
        zIndex: 10
    },

    featuresSection: {
        padding: '0px 0 80px',
        backgroundColor: '#f8f9fa'
    },

    sectionHeader: {
        textAlign: 'center',
        marginBottom: '48px'
    },

    sectionLabel: {
        fontSize: '1rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#111827',
        marginBottom: '12px'
    },

    sectionTitle: {
        fontSize: '2.2rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '12px',
        letterSpacing: '-0.02em'
    },

    sectionDescription: {
        color: '#6b7280',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.7'
    },

    featureCard: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '28px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        transition: 'all 0.3s ease'
    },

    featureIconWrapper: {
        marginBottom: '20px'
    },

    featureIcon: {
        fontSize: '2.5rem'
    },

    featureTitle: {
        fontWeight: '700',
        color: '#111827',
        marginBottom: '12px',
        fontSize: '1.1rem'
    },

    featureDescription: {
        color: '#6b7280',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        flexGrow: 1,
        marginBottom: '20px'
    },

    featureFooter: {
        marginTop: 'auto'
    },

    featureLink: {
        backgroundColor: '#f3f4f6',
        color: '#111827',
        padding: '8px 16px',
        fontSize: '0.8rem',
        fontWeight: '600',
        textDecoration: 'none',
        borderRadius: '10px',
        display: 'inline-block',
        transition: 'all 0.2s ease'
    },

    comingSoonBadge: {
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        padding: '8px 16px',
        fontSize: '0.8rem',
        fontWeight: '600',
        borderRadius: '10px',
        display: 'inline-block'
    },

    testimonialSection: {
        padding: '60px 20px 80px',
        borderRadius: '40px',
        margin:'auto'
    },

    testimonialCard: {
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        height: '100%',
        border: '1px solid #e5e7eb',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        marginBottom:'40px'
    },

    quoteIcon: {
        marginBottom: '20px',
        opacity: 0.8
    },

    testimonialText: {
        color: '#4b5563',
        fontSize: '0.95rem',
        lineHeight: '1.7',
        marginBottom: '24px',
        fontStyle: 'italic'
    },

    testimonialDivider: {
        width: '60px',
        height: '2px',
        backgroundColor: '#111827',
        marginBottom: '20px'
    },

    testimonialAuthor: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
    },

    authorInitial: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #111827, #1e293b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: '700',
        fontSize: '1rem',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },

    authorInfo: {
        flex: 1
    },

    testimonialName: {
        fontWeight: '700',
        color: '#111827',
        fontSize: '1rem',
        marginBottom: '4px'
    },

    testimonialRole: {
        fontSize: '0.75rem',
        color: '#6b7280'
    },

    decorativeLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #84cc16, #3b82f6, #84cc16)',
        transform: 'scaleX(0)',
        transition: 'transform 0.3s ease'
    },

    ctaSection: {
        backgroundColor: '#111827',
        padding: '80px 0',
        margin: '60px auto'
    },

    ctaContent: {
        textAlign: 'center',
        maxWidth: '800px',
        margin: '60px auto'
    },

    ctaTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '16px'
    },

    ctaDescription: {
        fontSize: '1rem',
        color: '#9ca3af',
        marginBottom: '32px'
    },

    ctaButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#84cc16',
        color: '#ffffff',
        padding: '14px 32px',
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 0.2s ease'
    }
};

// Add hover effect for decorative line
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .testimonial-card:hover .decorative-line {
        transform: scaleX(1);
    }
`;
document.head.appendChild(styleSheet);

export default HomePage;