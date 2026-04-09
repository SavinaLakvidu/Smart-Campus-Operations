import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BookingListPage from './pages/BookingListPage.js';
import CreateBookingPage from './pages/CreateBookingPage.js';
import AdminBookingsPage from './pages/AdminBookingPage.js';
import HomePage from './pages/HomePage';
import Navbar from './components/navbar.js';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <div className="container pt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bookings" element={<BookingListPage />} />
            <Route path="/bookings/new" element={<CreateBookingPage />} />
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          </Routes>
        </div>
      </div>
      <footer style={{
          backgroundColor: '#111111',
          color: '#ffffff',
          padding: '40px 24px',
          marginTop: '20px',
      }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="row align-items-center">
                  <div className="col-md-6">
                      <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>
                          🏫 Smart Campus Operations Hub
                      </div>
                      <div style={{ color: '#888888', fontSize: '0.85rem' }}>
                          IT3030 – Programming Applications and Frameworks | SLIIT 2026
                      </div>
                  </div>
                  <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <div style={{ color: '#888888', fontSize: '0.85rem' }}>
                          Built with Spring Boot & React
                      </div>
                  </div>
              </div>
          </div>
      </footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;