import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Navbar() {
    const location = useLocation();
    const { user, logout, loading } = useAuth();
    const isLoggedIn = !!user;
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUnreadCount();
            // Poll for unread count every 30 seconds
            const interval = setInterval(fetchUnreadCount, 30000);
            return () => clearInterval(interval);
        }
    }, [isLoggedIn]);

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/notifications/unread-count", {
                withCredentials: true,
            });
            setUnreadCount(response.data);
        } catch (error) {
            console.error("Failed to load unread count", error);
        }
    };

    if (loading) return null;

    const navLinkStyle = (path) => ({
        color: location.pathname === path ? '#ffffff' : '#aaaaaa',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: location.pathname === path ? '600' : '400',
        padding: '6px 12px',
        borderRadius: '3px',
        transition: 'color 0.2s'
    });

    const isAdmin = user?.role === 'ADMIN';
    const isTechnician = user?.role === 'TECHNICIAN';
    const isStaff = user?.role === 'STAFF';
    const isStudent = user?.role === 'STUDENT';

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

                <Link to="/" style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px'
                }}>
                    Smart Campus
                </Link>

                <div className="d-none d-lg-flex align-items-center gap-1">
                    <Link to="/" style={navLinkStyle('/')}>Home</Link>

                    {isLoggedIn && (
                        <>
                            <Link to="/bookings" style={navLinkStyle('/bookings')}>My Bookings</Link>

                            {(isStudent || isStaff || isAdmin) && (
                                <Link to="/bookings/new" style={navLinkStyle('/bookings/new')}>New Booking</Link>
                            )}

                            {isAdmin ? (
                                <Link to="/admin/tickets" style={navLinkStyle('/admin/tickets')}>Ticket Management</Link>
                            ) : (
                                <>
                                    {(isStudent || isStaff) && (
                                        <>
                                            <Link to="/incidents" style={navLinkStyle('/incidents')}>My Tickets</Link>
                                            <Link to="/incidents/new" style={navLinkStyle('/incidents/new')}>Report Incident</Link>
                                        </>
                                    )}

                                    {isTechnician && (
                                        <Link to="/technician/tickets" style={navLinkStyle('/technician/tickets')}>Ticket Updates</Link>
                                    )}
                                </>
                            )}
                        </>
                    )}

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
                            {(isStudent || isStaff) && (
                                <li>
                                    <Link className="dropdown-item" to="/incidents">
                                        Incidents
                                    </Link>
                                </li>
                            )}

                            {isAdmin && (
                                <li>
                                    <Link className="dropdown-item" to="/admin/tickets">
                                        Ticket Management
                                    </Link>
                                </li>
                            )}

                            <li>
                                <Link className="dropdown-item" to="/notifications">
                                    Notifications
                                </Link>
                            </li>

                            {(isTechnician || isAdmin) && (
                                <>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" to="/technician/tickets">
                                            Technician Panel
                                        </Link>
                                    </li>
                                </>
                            )}

                            {(isStaff || isAdmin) && (
                                <>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" to="/staff/dashboard">
                                            Staff Area
                                        </Link>
                                    </li>
                                </>
                            )}

                            {isAdmin && (
                                <>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/users">
                                            User Management
                                        </Link>
                                    </li>
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

                <div className="d-flex align-items-center gap-3">
                    {isLoggedIn ? (
                        <>
                            <Link to="/notifications" style={{ position: 'relative', textDecoration: 'none' }}>
                                <svg 
                                    width="22" 
                                    height="22" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = '0.8';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                >
                                    <path 
                                        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
                                        stroke="#aaaaaa" 
                                        strokeWidth="1.5" 
                                        fill="none"
                                    />
                                    <path 
                                        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
                                        stroke="#aaaaaa" 
                                        strokeWidth="1.5" 
                                        fill="none"
                                    />
                                </svg>
                                {unreadCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-10px',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        padding: '2px 6px',
                                        borderRadius: '10px',
                                        minWidth: '18px',
                                        textAlign: 'center',
                                        lineHeight: '1.2',
                                        border: '2px solid #111111'
                                    }}>
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </span>
                                )}
                            </Link>

                            <span style={{
                                backgroundColor: '#ffffff',
                                color: '#111111',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                letterSpacing: '1px',
                                padding: '3px 10px',
                                borderRadius: '2px'
                            }}>
                                {user?.role}
                            </span>

                            <span style={{
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                {user?.username}
                            </span>

                            <button
                                onClick={logout}
                                style={{
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