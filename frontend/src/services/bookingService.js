import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

// Temporary hardcoded user IDs for testing (will be replaced with auth later)
const CURRENT_USER_ID = 1;
const CURRENT_ADMIN_ID = 3;

const bookingService = {

    // Create a new booking
    createBooking: async (bookingData) => {
        const response = await axios.post(
            `${API_BASE}/bookings?userId=${CURRENT_USER_ID}`,
            bookingData
        );
        return response.data;
    },

    // Get current user's bookings
    getMyBookings: async () => {
        const response = await axios.get(
            `${API_BASE}/bookings/my?userId=${CURRENT_USER_ID}`
        );
        return response.data;
    },

    // Get all bookings (admin)
    getAllBookings: async () => {
        const response = await axios.get(`${API_BASE}/bookings`);
        return response.data;
    },

    // Get booking by ID
    getBookingById: async (id) => {
        const response = await axios.get(`${API_BASE}/bookings/${id}`);
        return response.data;
    },

    // Approve or reject booking (admin)
    decideBooking: async (id, decision, reason) => {
        const params = new URLSearchParams({
            decision,
            adminId: CURRENT_ADMIN_ID,
            ...(reason && { reason })
        });
        const response = await axios.patch(
            `${API_BASE}/bookings/${id}/decision?${params}`
        );
        return response.data;
    },

    // Cancel booking
    cancelBooking: async (id) => {
        const response = await axios.patch(
            `${API_BASE}/bookings/${id}/cancel?userId=${CURRENT_USER_ID}`
        );
        return response.data;
    }
};

export default bookingService;