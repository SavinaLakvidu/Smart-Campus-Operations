import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
    const { user, loading } = useAuth();
    const isLoggedIn = !!user;

const features = [
    {
        icon: '🏛️',
        title: 'Facilities & Assets Catalogue',
        description: 'Browse all bookable resources including lecture halls, computer labs, meeting rooms, and equipment. Filter by type, capacity, and location to find exactly what you need.',
        link: '/resources',
        linkText: 'Browse Resources',
        available: false
    },
    {
        icon: '📅',
        title: 'Booking Management',
        description: 'Request bookings for any available resource by specifying your date, time, purpose, and expected attendees. Track the status of your bookings from pending to approved.',
        link: '/bookings',
        linkText: 'My Bookings',
        available: true
    },
    {
        icon: '➕',
        title: 'Create a Booking',
        description: 'Submit a new booking request quickly and easily. The system automatically checks for scheduling conflicts to ensure your time slot is available.',
        link: '/bookings/new',
        linkText: 'Book Now',
        available: true
    },
    {
        icon: '🔧',
        title: 'Maintenance & Incident Ticketing',
        description: 'Report faults, damaged equipment, or any incidents on campus. Attach photos as evidence, set priority levels, and track the resolution progress in real time.',
        link: '/incidents/new',
        linkText: 'Report Incident',
        available: true
    },
    {
        icon: '🔔',
        title: 'Notifications',
        description: 'Stay informed with real-time notifications for booking approvals, rejections, ticket status updates, and new comments. Never miss an important update.',
        link: '/notifications',
        linkText: 'View Notifications',
        available: false
    },
    {
        icon: '⚙️',
        title: 'Admin Panel',
        description: 'Administrators can review and approve or reject booking requests, manage resources, assign technicians to incidents, and oversee all campus operations from one place.',
        link: '/admin/bookings',
        linkText: 'Go to Admin Panel',
        available: user?.role === 'ADMIN',
        adminOnly: true
    }
];

    const stats = [
        { value: '4', label: 'Resources Available' },
        { value: 'Active', label: 'Booking System' },
        { value: '24/7', label: 'System Availability' },
        { value: 'Live', label: 'Incident Reporting' }
    ];

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <div style={{
                backgroundColor: '#111111',
                color: '#ffffff',
                padding: '80px 0 70px',
                borderRadius: '16px',
            }}>
                <div className="container" style={{ padding: '0 48px' }}>
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            {isLoggedIn ? (
                                <>
                                    <p style={{
                                        color: '#aaaaaa',
                                        fontSize: '0.9rem',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        marginBottom: '12px'
                                    }}>
                                        Welcome back
                                    </p>
                                    <h1 style={{
                                        fontSize: '3rem',
                                        fontWeight: '700',
                                        marginBottom: '12px',
                                        lineHeight: '1.2'
                                    }}>
                                        {user?.username}
                                    </h1>
                                    <div style={{ marginBottom: '20px' }}>
                                        <span style={{
                                            backgroundColor: '#ffffff',
                                            color: '#111111',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            letterSpacing: '1.5px',
                                            padding: '4px 12px',
                                            borderRadius: '2px',
                                            textTransform: 'uppercase'
                                        }}>
                                            {user?.role}
                                        </span>
                                    </div>
                                    <p style={{
                                        color: '#bbbbbb',
                                        fontSize: '1.1rem',
                                        marginBottom: '32px',
                                        maxWidth: '520px',
                                        lineHeight: '1.7'
                                    }}>
                                        Manage your bookings, report incidents, and stay on top of campus operations — all in one place.
                                    </p>
                                    <div className="d-flex gap-3 flex-wrap">
                                        <Link to="/bookings/new" style={{
                                            backgroundColor: '#ffffff',
                                            color: '#111111',
                                            padding: '12px 28px',
                                            fontWeight: '600',
                                            fontSize: '0.95rem',
                                            textDecoration: 'none',
                                            borderRadius: '3px',
                                            transition: 'opacity 0.2s'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            Book a Resource
                                        </Link>
                                        <Link to="/bookings" style={{
                                            backgroundColor: 'transparent',
                                            color: '#ffffff',
                                            padding: '12px 28px',
                                            fontWeight: '600',
                                            fontSize: '0.95rem',
                                            textDecoration: 'none',
                                            borderRadius: '3px',
                                            border: '1px solid #555555',
                                            transition: 'border-color 0.2s'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.borderColor = '#ffffff'}
                                            onMouseLeave={e => e.currentTarget.style.borderColor = '#555555'}
                                        >
                                            View My Bookings
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p style={{
                                        color: '#aaaaaa',
                                        fontSize: '0.9rem',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        marginBottom: '12px'
                                    }}>
                                        SLIIT — IT3030
                                    </p>
                                    <h1 style={{
                                        fontSize: '3rem',
                                        fontWeight: '700',
                                        marginBottom: '20px',
                                        lineHeight: '1.2'
                                    }}>
                                        Smart Campus <br />Operations Hub
                                    </h1>
                                    <p style={{
                                        color: '#bbbbbb',
                                        fontSize: '1.1rem',
                                        marginBottom: '32px',
                                        maxWidth: '520px',
                                        lineHeight: '1.7'
                                    }}>
                                        Manage facility bookings, report incidents, and stay connected with campus operations.
                                    </p>
                                    <Link to="/login" style={{
                                        backgroundColor: '#ffffff',
                                        color: '#111111',
                                        padding: '12px 28px',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        borderRadius: '3px'
                                    }}>
                                        Login to Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="col-lg-4 d-none d-lg-block">
                            <div style={{
                                backgroundColor: '#2c2c2c',
                                border: '1px solid #a8a8a8',
                                borderRadius: '10px',
                                padding: '25px',
                            }}>
                                {stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            padding: '16px 0',
                                            borderBottom: i < stats.length - 1 ? '1px solid #a8a8a8' : 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div style={{
                                            color: '#dddddd',
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {stat.label}
                                        </div>
                                        <div style={{
                                            fontSize: '1.2rem',
                                            fontWeight: '700',
                                            color: '#ffffff'
                                        }}>
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '64px 12px' }}>
                <div style={{ marginBottom: '48px' }}>
                    <p style={{
                        fontSize: '0.8rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#888888',
                        marginBottom: '8px'
                    }}>
                        What we offer
                    </p>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#111111',
                        marginBottom: '8px'
                    }}>
                        Platform Features
                    </h2>
                    <div style={{
                        width: '40px',
                        height: '3px',
                        backgroundColor: '#111111'
                    }} />
                </div>

                <div className="row g-4">
                    {features.map((feature, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <div
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '4px',
                                    padding: '32px',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'border-color 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = '#111111';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = '#e5e5e5';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>
                                    {feature.icon}
                                </div>
                                <h5 style={{
                                    fontWeight: '700',
                                    color: '#111111',
                                    marginBottom: '12px',
                                    fontSize: '1rem'
                                }}>
                                    {feature.title}
                                </h5>
                                <p style={{
                                    color: '#666666',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.7',
                                    flexGrow: 1,
                                    marginBottom: '24px'
                                }}>
                                    {feature.description}
                                </p>
                                <div>
                                    {feature.available ? (
                                        <Link
                                            to={feature.link}
                                            style={{
                                                backgroundColor: '#111111',
                                                color: '#ffffff',
                                                padding: '8px 20px',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                textDecoration: 'none',
                                                borderRadius: '3px',
                                                display: 'inline-block',
                                                transition: 'opacity 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            {feature.linkText} →
                                        </Link>
                                    ) : feature.adminOnly ? (
                                        <span style={{
                                            backgroundColor: '#f0f0f0',
                                            color: '#888888',
                                            padding: '6px 14px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            borderRadius: '3px',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Admin Access Only
                                        </span>
                                    ) : (
                                        <span style={{
                                            backgroundColor: '#f0f0f0',
                                            color: '#888888',
                                            padding: '6px 14px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            borderRadius: '3px',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;