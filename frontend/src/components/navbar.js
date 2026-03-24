import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    🏫 Smart Campus
                </Link>
                <div className="navbar-nav ms-auto">
                    <Link
                        className={`nav-link ${location.pathname === '/bookings' ? 'active fw-bold' : ''}`}
                        to="/bookings"
                    >
                        My Bookings
                    </Link>
                    <Link
                        className={`nav-link ${location.pathname === '/bookings/new' ? 'active fw-bold' : ''}`}
                        to="/bookings/new"
                    >
                        New Booking
                    </Link>
                    <Link
                        className={`nav-link ${location.pathname === '/admin/bookings' ? 'active fw-bold' : ''}`}
                        to="/admin/bookings"
                    >
                        Admin Panel
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;