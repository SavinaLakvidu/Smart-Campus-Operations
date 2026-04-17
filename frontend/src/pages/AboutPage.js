import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
    const [activeTab, setActiveTab] = useState('mission');
    const [counters, setCounters] = useState({
        users: 0,
        bookings: 0,
        tickets: 0,
        uptime: 0
    });

    const stats = [
        { id: 'users', label: 'Active Users', value: 1250, icon: '👥', suffix: '+' },
        { id: 'bookings', label: 'Bookings Completed', value: 8450, icon: '📅', suffix: '+' },
        { id: 'tickets', label: 'Issues Resolved', value: 2340, icon: '✅', suffix: '+' },
        { id: 'uptime', label: 'System Uptime', value: 99.9, icon: '⚡', suffix: '%' }
    ];

    useEffect(() => {
        const animateNumbers = () => {
            stats.forEach(stat => {
                let start = 0;
                const end = stat.value;
                const duration = 2000;
                const increment = end / (duration / 16);
                
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCounters(prev => ({ ...prev, [stat.id]: end }));
                        clearInterval(timer);
                    } else {
                        setCounters(prev => ({ ...prev, [stat.id]: Math.floor(start) }));
                    }
                }, 16);
            });
        };
        
        animateNumbers();
    }, [stats]);

    const team = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Campus Director',
            bio: 'Leading digital transformation at Zentrix Campus',
            icon: '👩‍💼',
            email: 'sarah.johnson@zentrix.edu'
        },
        {
            name: 'Michael Chen',
            role: 'Lead Developer',
            bio: 'Full-stack architecture specialist for Zentrix platform',
            icon: '👨‍💻',
            email: 'michael.chen@zentrix.edu'
        },
        {
            name: 'Emma Williams',
            role: 'UX Designer',
            bio: 'Creating intuitive experiences for Zentrix community',
            icon: '🎨',
            email: 'emma.williams@zentrix.edu'
        },
        {
            name: 'David Kumar',
            role: 'System Analyst',
            bio: 'Optimizing campus workflows at Zentrix',
            icon: '📊',
            email: 'david.kumar@zentrix.edu'
        }
    ];

    const milestones = [
        { year: '2024', title: 'Zentrix Campus Launch', description: 'Initial release of Smart Campus platform' },
        { year: '2024', title: 'Mobile App Release', description: 'Access Zentrix operations on-the-go' },
        { year: '2025', title: 'AI Integration', description: 'Smart scheduling and predictions for Zentrix' },
        { year: '2025', title: 'Full Campus Coverage', description: 'All Zentrix departments onboarded' }
    ];

    const technologies = [
        { name: 'React 18', category: 'Frontend', icon: '⚛️' },
        { name: 'Spring Boot', category: 'Backend', icon: '🍃' },
        { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
        { name: 'Redis', category: 'Cache', icon: '⚡' },
        { name: 'Docker', category: 'DevOps', icon: '🐳' },
        { name: 'JWT', category: 'Security', icon: '🔐' }
    ];

    const contactInfo = {
        email: 'support@zentrix.edu',
        phone: '+1 (555) 123-4567',
        address: '123 Innovation Drive, Tech Valley, CA 94025'
    };

    return (
        <div style={styles.page}>
            {/* Hero Section */}
            <div style={styles.heroSection}>
                <div style={styles.heroPattern}></div>
                <div style={styles.container}>
                    <div style={styles.heroContent}>
                        <div style={styles.badge}>
                            <span style={styles.badgeIcon}>✨</span>
                            About Zentrix Campus
                        </div>
                        <h1 style={styles.heroTitle}>
                            Transforming Zentrix
                            <span style={styles.heroAccent}> Campus Operations</span>
                        </h1>
                        <p style={styles.heroDescription}>
                            Zentrix Campus is a modern digital platform designed to simplify and enhance 
                            campus operations through innovative technology solutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div style={styles.statsSection}>
                <div style={styles.container}>
                    <div style={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <div key={index} style={styles.statCard}>
                                <div style={styles.statIcon}>{stat.icon}</div>
                                <div style={styles.statValue}>
                                    {counters[stat.id]}{stat.suffix}
                                </div>
                                <div style={styles.statLabel}>{stat.label}</div>
                                <div style={styles.statBar}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission & Vision Tabs */}
            <div style={styles.missionSection}>
                <div style={styles.container}>
                    <div style={styles.tabsContainer}>
                        <button
                            style={{
                                ...styles.tabButton,
                                backgroundColor: activeTab === 'mission' ? '#000000' : '#ffffff',
                                color: activeTab === 'mission' ? '#ffffff' : '#000000',
                                border: activeTab === 'mission' ? 'none' : '1px solid #e5e7eb'
                            }}
                            onClick={() => setActiveTab('mission')}
                        >
                            Our Mission
                        </button>
                        <button
                            style={{
                                ...styles.tabButton,
                                backgroundColor: activeTab === 'vision' ? '#000000' : '#ffffff',
                                color: activeTab === 'vision' ? '#ffffff' : '#000000',
                                border: activeTab === 'vision' ? 'none' : '1px solid #e5e7eb'
                            }}
                            onClick={() => setActiveTab('vision')}
                        >
                            Our Vision
                        </button>
                        <button
                            style={{
                                ...styles.tabButton,
                                backgroundColor: activeTab === 'values' ? '#000000' : '#ffffff',
                                color: activeTab === 'values' ? '#ffffff' : '#000000',
                                border: activeTab === 'values' ? 'none' : '1px solid #e5e7eb'
                            }}
                            onClick={() => setActiveTab('values')}
                        >
                            Core Values
                        </button>
                    </div>

                    <div style={styles.tabContent}>
                        {activeTab === 'mission' && (
                            <div style={styles.contentCard}>
                                <div style={styles.contentIcon}>🎯</div>
                                <h2 style={styles.contentTitle}>Our Mission at Zentrix</h2>
                                <p style={styles.contentText}>
                                    To revolutionize Zentrix Campus operations by providing an integrated digital platform 
                                    that streamlines resource management, enhances communication, and improves 
                                    efficiency for students, faculty, and staff across the campus.
                                </p>
                                <div style={styles.missionPoints}>
                                    <div style={styles.missionPoint}>
                                        <span>✓</span>
                                        <span>Simplify administrative processes at Zentrix</span>
                                    </div>
                                    <div style={styles.missionPoint}>
                                        <span>✓</span>
                                        <span>Enhance user experience for Zentrix community</span>
                                    </div>
                                    <div style={styles.missionPoint}>
                                        <span>✓</span>
                                        <span>Drive digital transformation at Zentrix Campus</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'vision' && (
                            <div style={styles.contentCard}>
                                <div style={styles.contentIcon}>👁️</div>
                                <h2 style={styles.contentTitle}>Our Vision for Zentrix</h2>
                                <p style={styles.contentText}>
                                    To position Zentrix Campus as a model for smart campus solutions globally, 
                                    setting new standards for educational institution management through innovation, 
                                    sustainability, and user-centric design.
                                </p>
                                <div style={styles.visionFuture}>
                                    <div style={styles.futureCard}>
                                        <span>2026</span>
                                        <span>Zentrix Excellence</span>
                                    </div>
                                    <div style={styles.futureCard}>
                                        <span>50+</span>
                                        <span>Partner Institutions</span>
                                    </div>
                                    <div style={styles.futureCard}>
                                        <span>5K+</span>
                                        <span>Active Users at Zentrix</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'values' && (
                            <div style={styles.contentCard}>
                                <div style={styles.contentIcon}>💎</div>
                                <h2 style={styles.contentTitle}>Zentrix Core Values</h2>
                                <div style={styles.valuesGrid}>
                                    <div style={styles.valueItem}>
                                        <span>🔹</span>
                                        <div>
                                            <strong>Innovation First</strong>
                                            <p>Continuously evolving Zentrix with technology</p>
                                        </div>
                                    </div>
                                    <div style={styles.valueItem}>
                                        <span>🔹</span>
                                        <div>
                                            <strong>Campus Integrity</strong>
                                            <p>Transparent and ethical practices at Zentrix</p>
                                        </div>
                                    </div>
                                    <div style={styles.valueItem}>
                                        <span>🔹</span>
                                        <div>
                                            <strong>Educational Excellence</strong>
                                            <p>Delivering high-quality solutions for Zentrix</p>
                                        </div>
                                    </div>
                                    <div style={styles.valueItem}>
                                        <span>🔹</span>
                                        <div>
                                            <strong>Community Collaboration</strong>
                                            <p>Working together for Zentrix success</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div style={styles.featuresSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionLabel}>Zentrix Features</div>
                        <h2 style={styles.sectionTitle}>What Makes Zentrix Different</h2>
                        <p style={styles.sectionDescription}>
                            Comprehensive tools designed for modern Zentrix Campus management
                        </p>
                    </div>

                    <div style={styles.featuresGrid}>
                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>📅</div>
                            <h3 style={styles.featureTitle}>Resource Booking</h3>
                            <p style={styles.featureDescription}>
                                Easy scheduling of Zentrix facilities, equipment, and spaces with real-time availability
                            </p>
                        </div>
                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>⚠️</div>
                            <h3 style={styles.featureTitle}>Incident Reporting</h3>
                            <p style={styles.featureDescription}>
                                Quick issue reporting at Zentrix with priority levels and tracking system
                            </p>
                        </div>
                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>🔔</div>
                            <h3 style={styles.featureTitle}>Smart Notifications</h3>
                            <p style={styles.featureDescription}>
                                Real-time alerts for Zentrix approvals, updates, and announcements
                            </p>
                        </div>
                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>👥</div>
                            <h3 style={styles.featureTitle}>Role-Based Access</h3>
                            <p style={styles.featureDescription}>
                                Secure access for Zentrix students, staff, and administrators
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div style={styles.contactSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionLabel}>Get in Touch</div>
                        <h2 style={styles.sectionTitle}>Contact Zentrix Support</h2>
                        <p style={styles.sectionDescription}>
                            Reach out to our dedicated team for assistance
                        </p>
                    </div>

                    <div style={styles.contactGrid}>
                        <div style={styles.contactCard}>
                            <div style={styles.contactIcon}>📧</div>
                            <h3 style={styles.contactTitle}>Email Us</h3>
                            <p style={styles.contactDetail}>{contactInfo.email}</p>
                            <p style={styles.contactNote}>Response within 24 hours</p>
                        </div>
                        <div style={styles.contactCard}>
                            <div style={styles.contactIcon}>📞</div>
                            <h3 style={styles.contactTitle}>Call Us</h3>
                            <p style={styles.contactDetail}>{contactInfo.phone}</p>
                            <p style={styles.contactNote}>Mon-Fri, 9am-5pm</p>
                        </div>
                        <div style={styles.contactCard}>
                            <div style={styles.contactIcon}>📍</div>
                            <h3 style={styles.contactTitle}>Visit Us</h3>
                            <p style={styles.contactDetail}>{contactInfo.address}</p>
                            <p style={styles.contactNote}>Zentrix Campus HQ</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technology Stack */}
            <div style={styles.techSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionLabel}>Zentrix Tech Stack</div>
                        <h2 style={styles.sectionTitle}>Built with Modern Technology</h2>
                        <p style={styles.sectionDescription}>
                            Cutting-edge technologies powering Zentrix Campus platform
                        </p>
                    </div>

                    <div style={styles.techGrid}>
                        {technologies.map((tech, index) => (
                            <div key={index} style={styles.techCard}>
                                <div style={styles.techIcon}>{tech.icon}</div>
                                <div style={styles.techName}>{tech.name}</div>
                                <div style={styles.techCategory}>{tech.category}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div style={styles.timelineSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionLabel}>Zentrix Journey</div>
                        <h2 style={styles.sectionTitle}>Milestones Achieved</h2>
                        <p style={styles.sectionDescription}>
                            Key moments in Zentrix Campus development
                        </p>
                    </div>

                    <div style={styles.timeline}>
                        {milestones.map((milestone, index) => (
                            <div key={index} style={styles.timelineItem}>
                                <div style={styles.timelineYear}>{milestone.year}</div>
                                <div style={styles.timelineContent}>
                                    <h3 style={styles.timelineTitle}>{milestone.title}</h3>
                                    <p style={styles.timelineDescription}>{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div style={styles.teamSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionLabel}>Zentrix Team</div>
                        <h2 style={styles.sectionTitle}>Meet the Experts Behind Zentrix</h2>
                        <p style={styles.sectionDescription}>
                            Dedicated professionals powering Zentrix Campus
                        </p>
                    </div>

                    <div style={styles.teamGrid}>
                        {team.map((member, index) => (
                            <div key={index} style={styles.teamCard}>
                                <div style={styles.teamIcon}>{member.icon}</div>
                                <h3 style={styles.teamName}>{member.name}</h3>
                                <div style={styles.teamRole}>{member.role}</div>
                                <p style={styles.teamBio}>{member.bio}</p>
                                <div style={styles.teamEmail}>{member.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={styles.ctaSection}>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <h2 style={styles.ctaTitle}>Ready to Transform Zentrix Campus?</h2>
                        <p style={styles.ctaDescription}>
                            Join the growing community at Zentrix Campus using Smart Campus platform
                        </p>
                        <div style={styles.ctaButtons}>
                            <Link to="/login" style={styles.ctaButtonPrimary}>
                                Get Started at Zentrix
                                <span style={styles.ctaArrow}>→</span>
                            </Link>
                            <a href="mailto:support@zentrix.edu" style={styles.ctaButtonSecondary}>
                                Email Zentrix Support
                            </a>
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

    heroPattern: {
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
        padding: '100px 0',
        zIndex: 1
    },

    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '8px 20px',
        borderRadius: '100px',
        fontSize: '0.875rem',
        color: '#e5e7eb',
        marginBottom: '24px'
    },

    badgeIcon: {
        fontSize: '1rem'
    },

    heroTitle: {
        fontSize: '3.5rem',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '20px',
        letterSpacing: '-0.02em',
        lineHeight: '1.2'
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

    statsSection: {
        padding: '60px 0',
        backgroundColor: '#f8f9fa'
    },

    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
    },

    statCard: {
        textAlign: 'center',
        padding: '32px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        transition: 'transform 0.3s ease',
        border: '1px solid #e5e7eb'
    },

    statIcon: {
        fontSize: '2rem',
        marginBottom: '12px'
    },

    statValue: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '8px'
    },

    statLabel: {
        fontSize: '0.875rem',
        color: '#6b7280'
    },

    statBar: {
        width: '40px',
        height: '2px',
        backgroundColor: '#000000',
        margin: '12px auto 0',
        transition: 'width 0.3s ease'
    },

    missionSection: {
        padding: '80px 0',
        backgroundColor: '#ffffff'
    },

    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px'
    },

    tabButton: {
        padding: '12px 32px',
        borderRadius: '10px',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff'
    },

    tabContent: {
        maxWidth: '800px',
        margin: '0 auto'
    },

    contentCard: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#f8f9fa',
        borderRadius: '20px',
        border: '1px solid #e5e7eb'
    },

    contentIcon: {
        fontSize: '3rem',
        marginBottom: '20px'
    },

    contentTitle: {
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '16px'
    },

    contentText: {
        fontSize: '1rem',
        color: '#6b7280',
        lineHeight: '1.6',
        marginBottom: '24px'
    },

    missionPoints: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center'
    },

    missionPoint: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.875rem',
        color: '#000000'
    },

    visionFuture: {
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '24px',
        flexWrap: 'wrap'
    },

    futureCard: {
        textAlign: 'center',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        minWidth: '120px'
    },

    valuesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        textAlign: 'left'
    },

    valueItem: {
        display: 'flex',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb'
    },

    featuresSection: {
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

    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
    },

    featureCard: {
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        transition: 'transform 0.3s ease'
    },

    featureIcon: {
        fontSize: '2.5rem',
        marginBottom: '16px'
    },

    featureTitle: {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '12px'
    },

    featureDescription: {
        fontSize: '0.875rem',
        color: '#6b7280',
        lineHeight: '1.6'
    },

    contactSection: {
        padding: '80px 0',
        backgroundColor: '#ffffff'
    },

    contactGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginTop: '48px'
    },

    contactCard: {
        textAlign: 'center',
        padding: '32px',
        backgroundColor: '#f8f9fa',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        transition: 'transform 0.3s ease'
    },

    contactIcon: {
        fontSize: '2rem',
        marginBottom: '16px'
    },

    contactTitle: {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '12px'
    },

    contactDetail: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '8px'
    },

    contactNote: {
        fontSize: '0.75rem',
        color: '#9ca3af'
    },

    techSection: {
        padding: '80px 0',
        backgroundColor: '#f8f9fa'
    },

    techGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '20px'
    },

    techCard: {
        textAlign: 'center',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        transition: 'transform 0.3s ease'
    },

    techIcon: {
        fontSize: '2rem',
        marginBottom: '12px'
    },

    techName: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '4px'
    },

    techCategory: {
        fontSize: '0.75rem',
        color: '#6b7280'
    },

    timelineSection: {
        padding: '80px 0',
        backgroundColor: '#ffffff'
    },

    timeline: {
        maxWidth: '700px',
        margin: '0 auto',
        position: 'relative'
    },

    timelineItem: {
        display: 'flex',
        gap: '24px',
        marginBottom: '32px',
        position: 'relative'
    },

    timelineYear: {
        minWidth: '80px',
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#000000'
    },

    timelineContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e5e7eb'
    },

    timelineTitle: {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '8px'
    },

    timelineDescription: {
        fontSize: '0.875rem',
        color: '#6b7280'
    },

    teamSection: {
        padding: '80px 0',
        backgroundColor: '#f8f9fa'
    },

    teamGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
    },

    teamCard: {
        textAlign: 'center',
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        transition: 'transform 0.3s ease'
    },

    teamIcon: {
        fontSize: '3rem',
        marginBottom: '16px'
    },

    teamName: {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '4px'
    },

    teamRole: {
        fontSize: '0.75rem',
        color: '#000000',
        fontWeight: '500',
        marginBottom: '12px'
    },

    teamBio: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '12px'
    },

    teamEmail: {
        fontSize: '0.75rem',
        color: '#3b82f6',
        wordBreak: 'break-all'
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
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
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
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'transparent',
        color: '#ffffff',
        padding: '12px 28px',
        borderRadius: '10px',
        fontSize: '0.875rem',
        fontWeight: '600',
        textDecoration: 'none',
        border: '1px solid #ffffff',
        transition: 'all 0.3s ease'
    },

    ctaArrow: {
        transition: 'transform 0.2s ease'
    }
};

// Add hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .stat-card:hover .stat-bar {
        width: 60px;
    }
    
    .feature-card:hover,
    .tech-card:hover,
    .team-card:hover,
    .contact-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .tab-button:hover {
        transform: translateY(-2px);
    }
    
    .cta-button-primary:hover,
    .cta-button-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    
    .cta-button-primary:hover .cta-arrow,
    .cta-button-secondary:hover .cta-arrow {
        transform: translateX(4px);
    }
    
    .cta-button-secondary:hover {
        background-color: #ffffff;
        color: #000000;
    }
`;
document.head.appendChild(styleSheet);

export default AboutPage;
