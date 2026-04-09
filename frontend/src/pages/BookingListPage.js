import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import bookingService from '../services/bookingService';

function BookingListPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await bookingService.getMyBookings();
            setBookings(data);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        try {
            await bookingService.cancelBooking(id);
            toast.success('Booking cancelled successfully');
            fetchBookings();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            PENDING: 'warning',
            APPROVED: 'success',
            REJECTED: 'danger',
            CANCELLED: 'secondary'
        };
        return <span className={`badge bg-${colors[status] || 'primary'}`}>{status}</span>;
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Bookings</h2>
                <a href="/bookings/new" className="btn text-white" style={{ backgroundColor: "#111111" }}>
                    New Booking
                </a>
            </div>

            {bookings.length === 0 ? (
                <div className="alert alert-info">You have no bookings yet.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Resource</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Purpose</th>
                                <th>Attendees</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.bookingId}>
                                    <td>{booking.bookingId}</td>
                                    <td>{booking.resourceName}</td>
                                    <td>{booking.resourceLocation}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.startTime} - {booking.endTime}</td>
                                    <td>{booking.purpose}</td>
                                    <td>{booking.expectedAttendees || '-'}</td>
                                    <td>{getStatusBadge(booking.status)}</td>
                                    <td>
                                        {(booking.status === 'PENDING' || booking.status === 'APPROVED') && (
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleCancel(booking.bookingId)}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        {booking.status === 'REJECTED' && booking.decisionReason && (
                                            <small className="text-muted">Reason: {booking.decisionReason}</small>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default BookingListPage;