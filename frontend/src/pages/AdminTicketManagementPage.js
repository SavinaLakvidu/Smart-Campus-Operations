import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    assignTicket,
    getAllTickets,
    getAssignableUsers,
    getTicketById,
    updateTicketStatus
} from '../services/incidentService';
import './incident.css';

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REJECTED'];
const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const CATEGORY_OPTIONS = ['ELECTRICAL', 'NETWORK', 'PROJECTOR', 'COMPUTER', 'FACILITY_DAMAGE', 'PLUMBING', 'AIR_CONDITIONING', 'SAFETY', 'OTHER'];

function formatDate(value) {
    if (!value) {
        return '-';
    }
    return new Date(value).toLocaleString();
}

function getNextStatuses(status) {
    if (status === 'OPEN') {
        return ['IN_PROGRESS', 'REJECTED'];
    }
    if (status === 'IN_PROGRESS') {
        return ['RESOLVED', 'REJECTED'];
    }
    if (status === 'RESOLVED') {
        return ['CLOSED'];
    }
    return [];
}

function normalizeFilterValue(value) {
    return value === 'ALL' ? '' : value;
}

function AdminTicketManagementPage() {
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [loadingTicketDetails, setLoadingTicketDetails] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const [loadingAssignees, setLoadingAssignees] = useState(true);
    const [assignees, setAssignees] = useState([]);

    const [filters, setFilters] = useState({
        status: 'ALL',
        priority: 'ALL',
        category: 'ALL'
    });

    const [assigning, setAssigning] = useState(false);
    const [selectedAssigneeId, setSelectedAssigneeId] = useState('');

    const [statusForm, setStatusForm] = useState({
        status: '',
        resolutionNotes: '',
        rejectionReason: ''
    });
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const transitionOptions = useMemo(() => getNextStatuses(selectedTicket?.status), [selectedTicket]);

    const loadTickets = async () => {
        setLoadingTickets(true);
        try {
            const data = await getAllTickets({
                page: 0,
                size: 50,
                sort: 'createdAt,desc',
                status: normalizeFilterValue(filters.status) || undefined,
                priority: normalizeFilterValue(filters.priority) || undefined,
                category: normalizeFilterValue(filters.category) || undefined
            });
            const list = data?.content || [];
            setTickets(list);

            if (selectedTicket?.id) {
                const stillVisible = list.some((ticket) => ticket.id === selectedTicket.id);
                if (!stillVisible) {
                    setSelectedTicket(null);
                    setStatusForm({ status: '', resolutionNotes: '', rejectionReason: '' });
                    setSelectedAssigneeId('');
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingTickets(false);
        }
    };

    const loadAssignees = async () => {
        setLoadingAssignees(true);
        try {
            const data = await getAssignableUsers();
            setAssignees(data || []);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingAssignees(false);
        }
    };

    const selectTicket = async (ticketId) => {
        setLoadingTicketDetails(true);
        try {
            const details = await getTicketById(ticketId);
            setSelectedTicket(details);
            setSelectedAssigneeId(details?.assignedTechnician?.id ? String(details.assignedTechnician.id) : '');
            setStatusForm({ status: '', resolutionNotes: '', rejectionReason: '' });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingTicketDetails(false);
        }
    };

    const refreshSelectedTicket = async (ticketId) => {
        const details = await getTicketById(ticketId);
        setSelectedTicket(details);
        setSelectedAssigneeId(details?.assignedTechnician?.id ? String(details.assignedTechnician.id) : '');
    };

    const handleAssign = async (event) => {
        event.preventDefault();
        if (!selectedTicket) {
            return;
        }
        if (!selectedAssigneeId) {
            toast.error('Please choose a technician or staff member.');
            return;
        }

        setAssigning(true);
        try {
            await assignTicket(selectedTicket.id, Number(selectedAssigneeId));
            await Promise.all([refreshSelectedTicket(selectedTicket.id), loadTickets()]);
            toast.success('Ticket assignment updated.');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setAssigning(false);
        }
    };

    const handleStatusUpdate = async (event) => {
        event.preventDefault();
        if (!selectedTicket) {
            return;
        }
        if (!statusForm.status) {
            toast.error('Please select a status transition.');
            return;
        }

        setUpdatingStatus(true);
        try {
            await updateTicketStatus(selectedTicket.id, {
                status: statusForm.status,
                resolutionNotes: statusForm.status === 'RESOLVED' ? statusForm.resolutionNotes : '',
                rejectionReason: statusForm.status === 'REJECTED' ? statusForm.rejectionReason : ''
            });
            await Promise.all([refreshSelectedTicket(selectedTicket.id), loadTickets()]);
            setStatusForm({ status: '', resolutionNotes: '', rejectionReason: '' });
            toast.success('Ticket status updated.');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUpdatingStatus(false);
        }
    };

    useEffect(() => {
        loadAssignees();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.status, filters.priority, filters.category]);

    return (
        <div className="incident-shell">
            <div className="incident-page">
                <h1 className="incident-headline">Ticket Management</h1>
                <p className="incident-subtext">Admin console for assigning tickets and enforcing workflow transitions.</p>

                <div className="incident-card" style={{ marginBottom: '14px' }}>
                    <div className="incident-grid">
                        <div>
                            <label className="incident-label">Status</label>
                            <select
                                className="incident-select"
                                value={filters.status}
                                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                            >
                                <option value="ALL">All statuses</option>
                                {STATUS_OPTIONS.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="incident-label">Priority</label>
                            <select
                                className="incident-select"
                                value={filters.priority}
                                onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
                            >
                                <option value="ALL">All priorities</option>
                                {PRIORITY_OPTIONS.map((priority) => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="incident-label">Category</label>
                            <select
                                className="incident-select"
                                value={filters.category}
                                onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                            >
                                <option value="ALL">All categories</option>
                                {CATEGORY_OPTIONS.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="incident-admin-grid">
                    <div className="incident-card">
                        <h2 className="incident-section-title">Tickets</h2>
                        {loadingTickets ? (
                            <div className="incident-loading">
                                <div className="incident-loading-spinner" />
                                <div className="incident-loading-text">Loading tickets...</div>
                            </div>
                        ) : null}

                        {!loadingTickets && tickets.length === 0 ? (
                            <div>No tickets found for the selected filters.</div>
                        ) : null}

                        {!loadingTickets && tickets.length > 0 ? (
                            <ul className="incident-list">
                                {tickets.map((ticket) => (
                                    <li
                                        key={ticket.id}
                                        className={`incident-item ${selectedTicket?.id === ticket.id ? 'incident-item-active' : ''}`}
                                    >
                                        <div className="incident-item-top">
                                            <strong>{ticket.ticketCode}</strong>
                                            <span className={`incident-chip status-${ticket.status}`}>{ticket.status}</span>
                                        </div>

                                        <div className="incident-meta" style={{ marginTop: '6px' }}>
                                            {ticket.category} • {ticket.locationText || ticket.resource?.location || 'No location'}
                                        </div>
                                        <div className="incident-meta" style={{ marginTop: '3px' }}>
                                            Priority: <span className={`incident-chip priority-${ticket.priority}`}>{ticket.priority}</span>
                                        </div>
                                        <div className="incident-meta" style={{ marginTop: '3px' }}>
                                            Assigned: {ticket.assignedTechnician?.fullName || 'Unassigned'}
                                        </div>

                                        <div className="incident-actions" style={{ marginTop: '10px' }}>
                                            <button
                                                type="button"
                                                className="incident-btn-secondary"
                                                onClick={() => selectTicket(ticket.id)}
                                            >
                                                Manage
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>

                    <div className="incident-card">
                        <h2 className="incident-section-title">Selected Ticket</h2>

                        {loadingTicketDetails ? (
                            <div className="incident-loading">
                                <div className="incident-loading-spinner" />
                                <div className="incident-loading-text">Loading ticket details...</div>
                            </div>
                        ) : null}

                        {!loadingTicketDetails && !selectedTicket ? (
                            <div>Select a ticket to assign a user or update status.</div>
                        ) : null}

                        {!loadingTicketDetails && selectedTicket ? (
                            <>
                                <div className="incident-detail-grid" style={{ marginBottom: '14px' }}>
                                    <div className="incident-kv">
                                        <strong>Ticket</strong>
                                        <div>{selectedTicket.ticketCode}</div>
                                    </div>
                                    <div className="incident-kv">
                                        <strong>Status</strong>
                                        <div><span className={`incident-chip status-${selectedTicket.status}`}>{selectedTicket.status}</span></div>
                                    </div>
                                    <div className="incident-kv">
                                        <strong>Created By</strong>
                                        <div>{selectedTicket.createdBy?.fullName || '-'}</div>
                                    </div>
                                    <div className="incident-kv">
                                        <strong>Current Assignee</strong>
                                        <div>{selectedTicket.assignedTechnician?.fullName || 'Unassigned'}</div>
                                    </div>
                                    <div className="incident-kv incident-grid-full">
                                        <strong>Description</strong>
                                        <div>{selectedTicket.description}</div>
                                    </div>
                                    <div className="incident-kv">
                                        <strong>Created At</strong>
                                        <div>{formatDate(selectedTicket.createdAt)}</div>
                                    </div>
                                    <div className="incident-kv">
                                        <strong>Updated At</strong>
                                        <div>{formatDate(selectedTicket.updatedAt)}</div>
                                    </div>
                                </div>

                                <div className="incident-actions" style={{ marginTop: 0, marginBottom: '16px' }}>
                                    <Link className="incident-btn-ghost" to={`/incidents/${selectedTicket.id}`}>
                                        Open Full Details
                                    </Link>
                                </div>

                                <form onSubmit={handleAssign} className="incident-helper-box" style={{ marginBottom: '16px' }}>
                                    <div className="incident-helper-title">Assign Technician/Staff</div>
                                    <label className="incident-label">Assignee</label>
                                    <select
                                        className="incident-select"
                                        value={selectedAssigneeId}
                                        onChange={(e) => setSelectedAssigneeId(e.target.value)}
                                        disabled={loadingAssignees || assigning}
                                    >
                                        <option value="">Select assignee</option>
                                        {assignees.map((person) => (
                                            <option key={person.id} value={person.id}>
                                                {person.fullName} ({person.role})
                                            </option>
                                        ))}
                                    </select>

                                    <div className="incident-actions">
                                        <button
                                            type="submit"
                                            className="incident-btn-primary"
                                            disabled={loadingAssignees || assigning}
                                        >
                                            {assigning ? 'Assigning...' : 'Update Assignment'}
                                        </button>
                                    </div>
                                </form>

                                <form onSubmit={handleStatusUpdate} className="incident-helper-box">
                                    <div className="incident-helper-title">Update Workflow Status</div>
                                    <label className="incident-label">Next status</label>
                                    <select
                                        className="incident-select"
                                        value={statusForm.status}
                                        onChange={(e) => setStatusForm((prev) => ({ ...prev, status: e.target.value }))}
                                        disabled={updatingStatus || transitionOptions.length === 0}
                                    >
                                        <option value="">Select next status</option>
                                        {transitionOptions.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>

                                    {statusForm.status === 'RESOLVED' ? (
                                        <>
                                            <label className="incident-label" style={{ marginTop: '10px' }}>Resolution Notes</label>
                                            <textarea
                                                className="incident-textarea"
                                                value={statusForm.resolutionNotes}
                                                onChange={(e) => setStatusForm((prev) => ({ ...prev, resolutionNotes: e.target.value }))}
                                                placeholder="Describe how the issue was fixed"
                                                maxLength={2000}
                                            />
                                        </>
                                    ) : null}

                                    {statusForm.status === 'REJECTED' ? (
                                        <>
                                            <label className="incident-label" style={{ marginTop: '10px' }}>Rejection Reason</label>
                                            <textarea
                                                className="incident-textarea"
                                                value={statusForm.rejectionReason}
                                                onChange={(e) => setStatusForm((prev) => ({ ...prev, rejectionReason: e.target.value }))}
                                                placeholder="Explain why this ticket is being rejected"
                                                maxLength={1000}
                                            />
                                        </>
                                    ) : null}

                                    {transitionOptions.length === 0 ? (
                                        <div className="incident-meta" style={{ marginTop: '10px' }}>
                                            No further transitions available for this ticket.
                                        </div>
                                    ) : null}

                                    <div className="incident-actions">
                                        <button
                                            type="submit"
                                            className="incident-btn-primary"
                                            disabled={updatingStatus || transitionOptions.length === 0}
                                        >
                                            {updatingStatus ? 'Updating...' : 'Update Status'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminTicketManagementPage;
