import axios from 'axios';

const API_BASE = 'http://localhost:8080';
const DEFAULT_USERNAME = 'admin@campus.com';
const DEFAULT_PASSWORD = 'password123';
const USERNAME_KEY = 'incident.auth.username';
const PASSWORD_KEY = 'incident.auth.password';

function readCredentials() {
    const username = localStorage.getItem(USERNAME_KEY) || DEFAULT_USERNAME;
    const password = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    return { username, password };
}

function authHeader() {
    const { username, password } = readCredentials();
    return {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
    };
}

function handleError(error) {
    if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error('Request failed. Please try again.');
}

export function saveTicketApiCredentials(username, password) {
    localStorage.setItem(USERNAME_KEY, username?.trim() || DEFAULT_USERNAME);
    localStorage.setItem(PASSWORD_KEY, password || DEFAULT_PASSWORD);
}

export function getTicketApiCredentials() {
    return readCredentials();
}

export async function getResources() {
    try {
        const response = await axios.get(`${API_BASE}/api/resources`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function createTicket(payload) {
    try {
        const response = await axios.post(`${API_BASE}/api/v1/tickets`, payload, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getMyTickets(params = {}) {
    try {
        const response = await axios.get(`${API_BASE}/api/v1/tickets/my`, {
            headers: authHeader(),
            params
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getTicketById(ticketId) {
    try {
        const response = await axios.get(`${API_BASE}/api/v1/tickets/${ticketId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function addTicketComment(ticketId, message) {
    try {
        const response = await axios.post(
            `${API_BASE}/api/v1/tickets/${ticketId}/comments`,
            { message },
            { headers: authHeader() }
        );
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteTicketComment(ticketId, commentId) {
    try {
        await axios.delete(`${API_BASE}/api/v1/tickets/${ticketId}/comments/${commentId}`, {
            headers: authHeader()
        });
    } catch (error) {
        handleError(error);
    }
}

export async function uploadTicketAttachments(ticketId, files) {
    try {
        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append('files', file));

        const response = await axios.post(
            `${API_BASE}/api/v1/tickets/${ticketId}/attachments`,
            formData,
            {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteTicketAttachment(ticketId, attachmentId) {
    try {
        await axios.delete(`${API_BASE}/api/v1/tickets/${ticketId}/attachments/${attachmentId}`, {
            headers: authHeader()
        });
    } catch (error) {
        handleError(error);
    }
}

export async function downloadTicketAttachment(ticketId, attachmentId) {
    try {
        const response = await axios.get(
            `${API_BASE}/api/v1/tickets/${ticketId}/attachments/${attachmentId}`,
            {
                headers: authHeader(),
                responseType: 'blob'
            }
        );
        return response.data;
    } catch (error) {
        handleError(error);
    }
}
