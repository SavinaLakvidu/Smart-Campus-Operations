import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BookingListPage from './pages/BookingListPage.js';
import CreateBookingPage from './pages/CreateBookingPage.js';
import AdminBookingsPage from './pages/AdminBookingPage.js';
import AdminUsersPage from './pages/AdminUsersPage.js';
import NotificationsPage from './pages/NotificationsPage.js';
import HomePage from './pages/HomePage';
import Navbar from './components/navbar.js';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CreateIncidentPage from './pages/CreateIncidentPage';
import EditIncidentPage from './pages/EditIncidentPage';
import IncidentMyTicketsPage from './pages/IncidentMyTicketsPage';
import IncidentTicketDetailsPage from './pages/IncidentTicketDetailsPage';
import AdminTicketManagementPage from './pages/AdminTicketManagementPage';
import TechnicianTicketUpdatesPage from './pages/TechnicianTicketUpdatesPage';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <div className="container pt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/bookings"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF", "TECHNICIAN", "ADMIN"]}>
                  <BookingListPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings/new"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF", "ADMIN"]}>
                  <CreateBookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminBookingsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF", "TECHNICIAN", "ADMIN"]}>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/incidents"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF"]}>
                  <IncidentMyTicketsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/incidents/new"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF"]}>
                  <CreateIncidentPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/incidents/:ticketId/edit"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF", "ADMIN"]}>
                  <EditIncidentPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/technician/tickets"
              element={
                <ProtectedRoute allowedRoles={["TECHNICIAN"]}>
                  <TechnicianTicketUpdatesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/tickets"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminTicketManagementPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/incidents/:ticketId"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF", "TECHNICIAN", "ADMIN"]}>
                  <IncidentTicketDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>

      {!hideNavbar && (
        <footer
          style={{
            backgroundColor: '#111111',
            color: '#ffffff',
            padding: '40px 24px',
            marginTop: '20px',
          }}
        >
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
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;