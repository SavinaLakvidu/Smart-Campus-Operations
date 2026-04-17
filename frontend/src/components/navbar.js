import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Navbar() {
    const location = useLocation();
    const { user, logout, loading } = useAuth();
    const isLoggedIn = !!user;

    const [unreadCount, setUnreadCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

    const fetchUnreadCount = useCallback(async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/api/v1/notifications/unread-count',
                { withCredentials: true }
            );
            setUnreadCount(response.data);
        } catch (error) {
            console.error('Failed to load unread count', error);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUnreadCount();
            const interval = setInterval(fetchUnreadCount, 30000);
            return () => clearInterval(interval);
        }
    }, [isLoggedIn, fetchUnreadCount]);

    useEffect(() => {
        if (!document.getElementById('zentrix-navbar-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'zentrix-navbar-styles';
            styleSheet.textContent = `
                @keyframes pulseBadge {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                }

                @keyframes fadeInMenu {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .zentrix-dropdown-item {
                    transition: all 0.2s ease !important;
                }

                .zentrix-dropdown-item:hover {
                    background-color: #f3f4f6 !important;
                    color: #000000 !important;
                }

                @media (max-width: 991.98px) {
                    .zentrix-mobile-menu {
                        display: flex !important;
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }, []);

    if (loading) return null;

    const isAdmin = user?.role === 'ADMIN';
    const isTechnician = user?.role === 'TECHNICIAN';
    const isStaff = user?.role === 'STAFF';
    const isStudent = user?.role === 'STUDENT';

    const isActive = (path) => location.pathname === path;

    const navLinkStyle = (path) => ({
        color: isActive(path) ? '#ffffff' : '#9ca3af',
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: isActive(path) ? '600' : '500',
        padding: '10px 16px',
        borderRadius: '999px',
        transition: 'all 0.2s ease',
        backgroundColor: isActive(path) ? '#000000' : 'transparent',
        whiteSpace: 'nowrap'
    });

    const menuLinkStyle = {
        display: 'block',
        padding: '10px 16px',
        color: '#9ca3af',
        textDecoration: 'none',
        fontSize: '0.9rem',
        borderRadius: '10px',
        margin: '4px 8px',
        transition: 'all 0.2s ease'
    };

    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: '#f9f9f9',
                padding: '16px 20px 0'
            }}
        >
            <nav
                style={{
                    maxWidth: '1480px',
                    margin: '0 auto',
                    background: 'linear-gradient(135deg, #000000, #434141)',
                    borderRadius: '999px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    overflow: 'visible'
                }}
            >
                <div
                    className="container d-flex align-items-center justify-content-between"
                    style={{
                        maxWidth: '1280px',
                        margin: '0 auto',
                        padding: '0 28px',
                        minHeight: '72px'
                    }}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        style={{
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontWeight: '800',
                            fontSize: '1.35rem',
                            letterSpacing: '-0.5px',
                            whiteSpace: 'nowrap',
                            background: 'linear-gradient(135deg, #ffffff, #9ca3af)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Zentrix Campus
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="d-none d-lg-flex align-items-center gap-1">
                        <Link to="/" style={navLinkStyle('/')}>Home</Link>
                        <Link to="/about" style={navLinkStyle('/about')}>About Us</Link>
                        <Link to="/contact" style={navLinkStyle('/contact')}>Contact Us</Link>

                        {isLoggedIn && (
                            <>
                                <Link to="/bookings" style={navLinkStyle('/bookings')}>My Bookings</Link>

                                {(isStudent || isStaff || isAdmin) && (
                                    <Link to="/bookings/new" style={navLinkStyle('/bookings/new')}>
                                        New Booking
                                    </Link>
                                )}

                                {!isAdmin && (
                                    <>
                                        {(isStudent || isStaff) && (
                                            <>
                                                <Link to="/incidents" style={navLinkStyle('/incidents')}>
                                                    My Tickets
                                                </Link>
                                                <Link to="/incidents/new" style={navLinkStyle('/incidents/new')}>
                                                    Report Incident
                                                </Link>
                                            </>
                                        )}

                                        {isTechnician && (
                                            <Link
                                                to="/technician/tickets"
                                                style={navLinkStyle('/technician/tickets')}
                                            >
                                                Ticket Updates
                                            </Link>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {/* Admin Dropdown */}
                        {isLoggedIn && isAdmin && (
                            <div
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setAdminDropdownOpen(true)}
                                onMouseLeave={() => setAdminDropdownOpen(false)}
                            >
                                <button
                                    style={{
                                        backgroundColor: adminDropdownOpen ? '#1a1a1a' : 'transparent',
                                        border: 'none',
                                        color: adminDropdownOpen ? '#ffffff' : '#9ca3af',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        padding: '10px 16px',
                                        cursor: 'pointer',
                                        borderRadius: '999px',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    Admin
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path
                                            d="M3 4.5L6 7.5L9 4.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>

                                {adminDropdownOpen && (
                                    <ul
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: 0,
                                            backgroundColor: '#1a1a1a',
                                            border: '1px solid #374151',
                                            borderRadius: '18px',
                                            padding: '8px 0',
                                            minWidth: '220px',
                                            marginTop: '10px',
                                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                                            listStyle: 'none',
                                            animation: 'fadeInMenu 0.2s ease'
                                        }}
                                    >
                                        <li>
                                            <Link className="zentrix-dropdown-item" to="/admin/tickets" style={menuLinkStyle}>
                                                Ticket Management
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="zentrix-dropdown-item" to="/admin/users" style={menuLinkStyle}>
                                                User Management
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="zentrix-dropdown-item" to="/admin/bookings" style={menuLinkStyle}>
                                                Booking Approvals
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Additional Links for Staff and Technician */}
                        {isLoggedIn && !isAdmin && (
                            <>
                                {isTechnician && (
                                    <Link to="/technician/tickets" style={navLinkStyle('/technician/tickets')}>
                                        Technician Panel
                                    </Link>
                                )}

                                {isStaff && (
                                    <Link to="/staff/dashboard" style={navLinkStyle('/staff/dashboard')}>
                                        Staff Area
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="d-flex align-items-center gap-3">
                        {isLoggedIn ? (
                            <>
                                {/* Bell Icon */}
                                <Link
                                    to="/notifications"
                                    style={{ position: 'relative', textDecoration: 'none' }}
                                >
                                    <div
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '50%',
                                            border: '1px solid #374151',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#1a1a1a',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#2d2d2d';
                                            e.currentTarget.style.borderColor = '#4a4a4a';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                                            e.currentTarget.style.borderColor = '#374151';
                                        }}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                                                stroke="#9ca3af"
                                                strokeWidth="1.7"
                                                fill="none"
                                            />
                                            <path
                                                d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                                                stroke="#9ca3af"
                                                strokeWidth="1.7"
                                                fill="none"
                                            />
                                        </svg>

                                        {unreadCount > 0 && (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '-2px',
                                                    right: '-2px',
                                                    backgroundColor: '#ef4444',
                                                    color: '#ffffff',
                                                    fontSize: '10px',
                                                    fontWeight: '700',
                                                    padding: '2px 6px',
                                                    borderRadius: '999px',
                                                    minWidth: '18px',
                                                    textAlign: 'center',
                                                    lineHeight: '1.2',
                                                    border: '2px solid #000000',
                                                    animation: 'pulseBadge 2s infinite'
                                                }}
                                            >
                                                {unreadCount > 99 ? '99+' : unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </Link>

                                {/* Role Badge */}
                                <span
                                    style={{
                                        backgroundColor: '#1a1a1a',
                                        color: '#9ca3af',
                                        fontSize: '0.72rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.7px',
                                        padding: '6px 12px',
                                        borderRadius: '999px',
                                        border: '1px solid #374151'
                                    }}
                                >
                                    {user?.role}
                                </span>

                                {/* User Name */}
                                <span
                                    style={{
                                        color: '#ffffff',
                                        fontSize: '0.92rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {user?.username}
                                </span>

                                {/* Logout Button */}
                                <button
                                    onClick={logout}
                                    style={{
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid #374151',
                                        color: '#9ca3af',
                                        fontSize: '0.85rem',
                                        padding: '10px 18px',
                                        borderRadius: '999px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        fontWeight: '600'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ef4444';
                                        e.currentTarget.style.borderColor = '#ef4444';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                        e.currentTarget.style.borderColor = '#374151';
                                        e.currentTarget.style.color = '#9ca3af';
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                style={{
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    padding: '11px 22px',
                                    borderRadius: '999px',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                display: 'none',
                                backgroundColor: '#1a1a1a',
                                border: '1px solid #374151',
                                borderRadius: '10px',
                                color: '#ffffff',
                                cursor: 'pointer',
                                padding: '8px 12px'
                            }}
                            className="d-lg-none"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                {mobileMenuOpen ? (
                                    <path
                                        d="M6 18L18 6M6 6L18 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                ) : (
                                    <path
                                        d="M4 6H20M4 12H20M4 18H20"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="zentrix-mobile-menu"
                        style={{
                            display: 'none',
                            backgroundColor: '#000000',
                            borderTop: '1px solid #1f2937',
                            padding: '16px 20px 20px',
                            flexDirection: 'column',
                            gap: '8px'
                        }}
                    >
                        <Link to="/" style={{...navLinkStyle('/'), display: 'block'}}>Home</Link>
                        <Link to="/about" style={{...navLinkStyle('/about'), display: 'block'}}>About Us</Link>
                        <Link to="/contact" style={{...navLinkStyle('/contact'), display: 'block'}}>Contact Us</Link>

                        {isLoggedIn && (
                            <>
                                <Link to="/bookings" style={{...navLinkStyle('/bookings'), display: 'block'}}>My Bookings</Link>

                                {(isStudent || isStaff || isAdmin) && (
                                    <Link to="/bookings/new" style={{...navLinkStyle('/bookings/new'), display: 'block'}}>New Booking</Link>
                                )}

                                {(isStudent || isStaff) && (
                                    <>
                                        <Link to="/incidents" style={{...navLinkStyle('/incidents'), display: 'block'}}>My Tickets</Link>
                                        <Link to="/incidents/new" style={{...navLinkStyle('/incidents/new'), display: 'block'}}>Report Incident</Link>
                                    </>
                                )}

                                {isAdmin && (
                                    <>
                                        <Link to="/admin/tickets" style={{...navLinkStyle('/admin/tickets'), display: 'block'}}>Ticket Management</Link>
                                        <Link to="/admin/users" style={{...navLinkStyle('/admin/users'), display: 'block'}}>User Management</Link>
                                        <Link to="/admin/bookings" style={{...navLinkStyle('/admin/bookings'), display: 'block'}}>Booking Approvals</Link>
                                    </>
                                )}

                                {isTechnician && (
                                    <Link to="/technician/tickets" style={{...navLinkStyle('/technician/tickets'), display: 'block'}}>
                                        Technician Panel
                                    </Link>
                                )}

                                {isStaff && (
                                    <Link to="/staff/dashboard" style={{...navLinkStyle('/staff/dashboard'), display: 'block'}}>
                                        Staff Area
                                    </Link>
                                )}

                                <Link to="/notifications" style={{...navLinkStyle('/notifications'), display: 'block'}}>
                                    Notifications
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;