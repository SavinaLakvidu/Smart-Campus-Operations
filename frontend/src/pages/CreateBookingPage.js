import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import bookingService from '../services/bookingService';

function CreateBookingPage() {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        resourceId: '',
        bookingDate: '',
        startTime: '',
        endTime: '',
        purpose: '',
        expectedAttendees: ''
    });

    useEffect(() => {
        // Fetch available resources
        axios.get('http://localhost:8080/api/resources')
            .then(res => setResources(res.data))
            .catch(() => toast.error('Failed to load resources'));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.startTime >= form.endTime) {
            toast.error('End time must be after start time');
            return;
        }
        setLoading(true);
        try {
            await bookingService.createBooking({
                ...form,
                resourceId: parseInt(form.resourceId),
                expectedAttendees: form.expectedAttendees ? parseInt(form.expectedAttendees) : null
            });
            toast.success('Booking created successfully!');
            navigate('/bookings');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create booking');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center"style={{padding:'100px'}}>
            <div className="col-md-6">
                <div className="card shadow">
                    <div className="card-header text-white" style={{ backgroundColor: "#111111" }}>
                        <h4 className="mb-0">Create New Booking</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Resource</label>
                                <select
                                    className="form-select"
                                    name="resourceId"
                                    value={form.resourceId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a resource...</option>
                                    {resources.map(r => (
                                        <option key={r.resourceId} value={r.resourceId}>
                                            {r.resourceName} — {r.location} (Capacity: {r.capacity || 'N/A'})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="bookingDate"
                                    value={form.bookingDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label">Start Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="startTime"
                                        value={form.startTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col mb-3">
                                    <label className="form-label">End Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="endTime"
                                        value={form.endTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Purpose</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="purpose"
                                    value={form.purpose}
                                    onChange={handleChange}
                                    placeholder="e.g. Lecture session, Team meeting"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Expected Attendees</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="expectedAttendees"
                                    value={form.expectedAttendees}
                                    onChange={handleChange}
                                    placeholder="Optional"
                                    min="1"
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn text-white"
                                    disabled={loading}
                                    style={{ backgroundColor: "#111111" }}
                                >
                                    {loading ? 'Creating...' : 'Create Booking'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate('/bookings')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBookingPage;