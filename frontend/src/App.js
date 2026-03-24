import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BookingListPage from './pages/BookingListPage.js';
import CreateBookingPage from './pages/CreateBookingPage.js';
import AdminBookingsPage from './pages/AdminBookingPage.js';
import Navbar from './components/navbar.js';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/bookings" />} />
          <Route path="/bookings" element={<BookingListPage />} />
          <Route path="/bookings/new" element={<CreateBookingPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;