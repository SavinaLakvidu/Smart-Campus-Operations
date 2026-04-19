import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from './pages/HomePage';
import BookingListPage from './pages/BookingListPage';
import CreateBookingPage from './pages/CreateBookingPage';
import AdminBookingsPage from './pages/AdminBookingPage';
import AdminUsersPage from './pages/AdminUsersPage';
import NotificationsPage from './pages/NotificationsPage';
import LoginPage from './pages/LoginPage';
import CreateIncidentPage from './pages/CreateIncidentPage';
import EditIncidentPage from './pages/EditIncidentPage';
import IncidentMyTicketsPage from './pages/IncidentMyTicketsPage';
import IncidentTicketDetailsPage from './pages/IncidentTicketDetailsPage';
import AdminTicketManagementPage from './pages/AdminTicketManagementPage';
import TechnicianTicketUpdatesPage from './pages/TechnicianTicketUpdatesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ResourceCataloguePage from './pages/ResourceCataloguePage'; // ✅ IMPORTANT

// Components
import Navbar from './components/navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Context
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <div className="container pt-4">
          <Routes>

            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* ✅ Resource Catalogue (your part) */}
            <Route path="/resources" element={<ResourceCataloguePage />} />

            {/* Booking */}
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

            {/* Admin */}
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

            {/* Notifications */}
            <Route
              path="/notifications"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF", "TECHNICIAN", "ADMIN"]}>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />

            {/* Incidents */}
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
              path="/incidents/:ticketId"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "STAFF", "TECHNICIAN", "ADMIN"]}>
                  <IncidentTicketDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Technician */}
            <Route
              path="/technician/tickets"
              element={
                <ProtectedRoute allowedRoles={["TECHNICIAN"]}>
                  <TechnicianTicketUpdatesPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Tickets */}
            <Route
              path="/admin/tickets"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminTicketManagementPage />
                </ProtectedRoute>
              }
            />

            {/* Public Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

          </Routes>
        </div>
      </div>

      {/* Footer */}
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
                <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                  🏫 Smart Campus Operations Hub
                </div>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>
                  IT3030 – Programming Applications and Frameworks | SLIIT 2026
                </div>
              </div>
              <div className="col-md-6 text-md-end">
                <div style={{ color: '#888', fontSize: '0.85rem' }}>
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