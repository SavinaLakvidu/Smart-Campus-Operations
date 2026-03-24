import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import bookingService from '../services/bookingService';

function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectReason, setRejectReason] = useState('');
    const [rejectingId, setRejectingId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('ALL');

    useEffect(() => {
        fetchAllBookings();
    }, []);

    const fetchAllBookings = async () => {
        try {
            const data = await bookingService.getAllBookings();
            setBookings(data);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await bookingService.decideBooking(id, 'APPROVE');
            toast.success('Booking approved');
            fetchAllBookings();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve booking');
        }
    };

    const handleReject = async (id) => {
        if (!rejectReason.trim()) {
            toast.error('Please provide a rejection reason');
            return;
        }
        try {
            await bookingService.decideBooking(id, 'REJECT', rejectReason);
            toast.success('Booking rejected');
            setRejectingId(null);
            setRejectReason('');
            fetchAllBookings();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reject booking');
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

    const filteredBookings = filterStatus === 'ALL'
        ? bookings
        : bookings.filter(b => b.status === filterStatus);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Admin — All Bookings</h2>
                <select
                    className="form-select w-auto"
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>

            {filteredBookings.length === 0 ? (
                <div className="alert alert-info">No bookings found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Resource</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Purpose</th>
                                <th>Status</th>
                                <th>Decision By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map(booking => (
                                <React.Fragment key={booking.bookingId}>
                                    <tr>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.username}</td>
                                        <td>{booking.resourceName}</td>
                                        <td>{booking.bookingDate}</td>
                                        <td>{booking.startTime} - {booking.endTime}</td>
                                        <td>{booking.purpose}</td>
                                        <td>{getStatusBadge(booking.status)}</td>
                                        <td>{booking.decidedBy || '-'}</td>
                                        <td>
                                            {booking.status === 'PENDING' && (
                                                <div className="d-flex gap-1">
                                                    <button
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => handleApprove(booking.bookingId)}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => setRejectingId(booking.bookingId)}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {booking.decisionReason && (
                                                <small className="text-muted d-block mt-1">
                                                    Reason: {booking.decisionReason}
                                                </small>
                                            )}
                                        </td>
                                    </tr>
                                    {rejectingId === booking.bookingId && (
                                        <tr className="table-warning">
                                            <td colSpan="9">
                                                <div className="d-flex gap-2 align-items-center p-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter rejection reason..."
                                                        value={rejectReason}
                                                        onChange={e => setRejectReason(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleReject(booking.bookingId)}
                                                    >
                                                        Confirm Reject
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            setRejectingId(null);
                                                            setRejectReason('');
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminBookingsPage;