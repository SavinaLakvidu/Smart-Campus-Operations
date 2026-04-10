import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MOCK_USER = {
    name: 'John Student',
    role: 'STUDENT'
};

function Navbar() {
    const location = useLocation();
    const isLoggedIn = true;

    const navLinkStyle = (path) => ({
        color: location.pathname === path ? '#ffffff' : '#aaaaaa',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: location.pathname === path ? '600' : '400',
        padding: '6px 12px',
        borderRadius: '3px',
        transition: 'color 0.2s'
    });

    return (
        <nav style={{
            backgroundColor: '#111111',
            padding: '0 0',
            borderBottom: '1px solid #222222',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container d-flex align-items-center justify-content-between" style={{ height: '60px' }}>

                {/* Brand */}
                <Link to="/" style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px'
                }}>
                    Smart Campus
                </Link>

                {/* Nav Links */}
                <div className="d-none d-lg-flex align-items-center gap-1">
                    <Link to="/" style={navLinkStyle('/')}>Home</Link>
                    <Link to="/bookings" style={navLinkStyle('/bookings')}>My Bookings</Link>
                    <Link to="/bookings/new" style={navLinkStyle('/bookings/new')}>New Booking</Link>

                    {/* Dropdown */}
                    <div className="dropdown">
                        <button
                            className="dropdown-toggle"
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#aaaaaa',
                                fontSize: '0.9rem',
                                padding: '6px 12px',
                                cursor: 'pointer'
                            }}
                        >
                            More
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li>
                                <Link className="dropdown-item" to="/incidents">
                                    Incidents
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/notifications">
                                    Notifications
                                </Link>
                            </li>
                            {MOCK_USER.role === 'ADMIN' && (
                                <>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/bookings">
                                            Admin Panel
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* User Section */}
                <div className="d-flex align-items-center gap-3">
                    {isLoggedIn ? (
                        <>
                            <span style={{
                                backgroundColor: '#ffffff',
                                color: '#111111',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                letterSpacing: '1px',
                                padding: '3px 10px',
                                borderRadius: '2px'
                            }}>
                                {MOCK_USER.role}
                            </span>
                            <span style={{
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                {MOCK_USER.name}
                            </span>
                            <button style={{
                                backgroundColor: 'transparent',
                                border: '1px solid #444444',
                                color: '#aaaaaa',
                                fontSize: '0.8rem',
                                padding: '5px 14px',
                                borderRadius: '3px',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s, color 0.2s'
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = '#ffffff';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = '#444444';
                                    e.currentTarget.style.color = '#aaaaaa';
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" style={{
                            backgroundColor: '#ffffff',
                            color: '#111111',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            padding: '6px 16px',
                            borderRadius: '3px',
                            textDecoration: 'none'
                        }}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;