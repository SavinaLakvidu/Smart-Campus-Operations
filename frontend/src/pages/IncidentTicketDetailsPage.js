import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    addTicketComment,
    deleteTicketAttachment,
    deleteTicketComment,
    downloadTicketAttachment,
    getTicketById
} from '../services/incidentService';
import './incident.css';

function formatDate(value) {
    if (!value) {
        return '-';
    }
    return new Date(value).toLocaleString();
}

function detailText(value) {
    if (!value) {
        return '-';
    }
    return value;
}

function IncidentTicketDetailsPage() {
    const { ticketId } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [busyAction, setBusyAction] = useState('');

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getTicketById(ticketId);
                if (mounted) {
                    setTicket(data);
                }
                if (location.state?.justCreated) {
                    toast.success('You can now track this ticket from your dashboard.');
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, [ticketId, location.state]);

    async function refreshTicket() {
        const data = await getTicketById(ticketId);
        setTicket(data);
    }

    async function handleAddComment(event) {
        event.preventDefault();
        if (!commentText.trim()) {
            toast.error('Comment message is required');
            return;
        }

        setBusyAction('comment');
        try {
            await addTicketComment(ticketId, commentText.trim());
            setCommentText('');
            await refreshTicket();
            toast.success('Comment added successfully');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusyAction('');
        }
    }

    async function handleDeleteComment(commentId) {
        setBusyAction(`delete-comment-${commentId}`);
        try {
            await deleteTicketComment(ticketId, commentId);
            await refreshTicket();
            toast.success('Comment deleted');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusyAction('');
        }
    }

    async function handleDeleteAttachment(attachmentId) {
        setBusyAction(`delete-attachment-${attachmentId}`);
        try {
            await deleteTicketAttachment(ticketId, attachmentId);
            await refreshTicket();
            toast.success('Attachment deleted');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusyAction('');
        }
    }

    async function handleDownloadAttachment(attachment) {
        try {
            const blob = await downloadTicketAttachment(ticketId, attachment.id);
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = attachment.originalFileName;
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="incident-shell">
            <div className="incident-page">
                <h1 className="incident-headline">Incident Ticket Details</h1>

                <div className="incident-actions" style={{ marginBottom: '14px' }}>
                    <Link className="incident-btn-ghost" to="/incidents">Back To My Tickets</Link>
                    <Link className="incident-btn-secondary" to="/incidents/new">Create Another</Link>
                </div>

                <div className="incident-card">
                    {loading ? <div>Loading ticket details...</div> : null}
                    {!loading && !ticket ? <div>Ticket not found.</div> : null}

                    {!loading && ticket ? (
                        <>
                            <div className="incident-item-top" style={{ marginBottom: '12px' }}>
                                <h2 style={{ margin: 0 }}>{ticket.ticketCode}</h2>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <span className={`incident-chip status-${ticket.status}`}>{ticket.status}</span>
                                    <span className={`incident-chip priority-${ticket.priority}`}>{ticket.priority}</span>
                                </div>
                            </div>

                            <div className="incident-detail-grid">
                                <div className="incident-kv">
                                    <strong>CATEGORY</strong>
                                    <div>{detailText(ticket.category)}</div>
                                </div>
                                <div className="incident-kv">
                                    <strong>LOCATION</strong>
                                    <div>{detailText(ticket.locationText || ticket.resource?.location)}</div>
                                </div>
                                <div className="incident-kv">
                                    <strong>RESOURCE</strong>
                                    <div>{detailText(ticket.resource?.name)}</div>
                                </div>
                                <div className="incident-kv">
                                    <strong>CREATED AT</strong>
                                    <div>{formatDate(ticket.createdAt)}</div>
                                </div>
                                <div className="incident-kv">
                                    <strong>PREFERRED CONTACT</strong>
                                    <div>{detailText(ticket.preferredContactName)}</div>
                                    <div className="incident-meta">{detailText(ticket.preferredContactEmail)}</div>
                                    <div className="incident-meta">{detailText(ticket.preferredContactPhone)}</div>
                                </div>
                                <div className="incident-kv">
                                    <strong>ASSIGNED TECHNICIAN</strong>
                                    <div>{detailText(ticket.assignedTechnician?.fullName)}</div>
                                    <div className="incident-meta">{detailText(ticket.assignedTechnician?.email)}</div>
                                </div>
                            </div>

                            <div className="incident-kv" style={{ marginTop: '12px' }}>
                                <strong>DESCRIPTION</strong>
                                <div style={{ whiteSpace: 'pre-wrap' }}>{detailText(ticket.description)}</div>
                            </div>

                            <div className="incident-card" style={{ marginTop: '12px', padding: '16px' }}>
                                <h3 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>Attachments</h3>
                                <div style={{ marginTop: '14px' }}>
                                    {(ticket.attachments || []).length === 0 ? (
                                        <div className="incident-meta">No attachments uploaded yet.</div>
                                    ) : (
                                        <div className="incident-list">
                                            {ticket.attachments.map((attachment) => (
                                                <div key={attachment.id} className="incident-item">
                                                    <div className="incident-item-top">
                                                        <strong>{attachment.originalFileName}</strong>
                                                        <span className="incident-meta">{attachment.contentType}</span>
                                                    </div>
                                                    <div className="incident-meta" style={{ marginTop: '4px' }}>
                                                        Uploaded by {attachment.uploadedBy?.fullName || '-'} on {formatDate(attachment.uploadedAt)}
                                                    </div>
                                                    <div className="incident-actions" style={{ marginTop: '10px' }}>
                                                        <button
                                                            type="button"
                                                            className="incident-btn-ghost"
                                                            onClick={() => handleDownloadAttachment(attachment)}
                                                        >
                                                            Download
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="incident-btn-ghost"
                                                            onClick={() => handleDeleteAttachment(attachment.id)}
                                                            disabled={busyAction === `delete-attachment-${attachment.id}`}
                                                        >
                                                            {busyAction === `delete-attachment-${attachment.id}` ? 'Deleting...' : 'Delete'}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="incident-card" style={{ marginTop: '12px', padding: '16px' }}>
                                <h3 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>Comments</h3>
                                <form onSubmit={handleAddComment}>
                                    <div className="incident-grid">
                                        <div className="incident-grid-full">
                                            <label className="incident-label">Add comment</label>
                                            <textarea
                                                className="incident-textarea"
                                                value={commentText}
                                                onChange={(event) => setCommentText(event.target.value)}
                                                maxLength={1000}
                                                placeholder="Add an update, note, or question about this ticket..."
                                            />
                                        </div>
                                    </div>
                                    <div className="incident-actions">
                                        <button className="incident-btn-primary" type="submit" disabled={busyAction === 'comment'}>
                                            {busyAction === 'comment' ? 'Posting...' : 'Post Comment'}
                                        </button>
                                    </div>
                                </form>

                                <div style={{ marginTop: '14px' }}>
                                    {(ticket.comments || []).length === 0 ? (
                                        <div className="incident-meta">No comments yet.</div>
                                    ) : (
                                        <div className="incident-list">
                                            {ticket.comments.map((comment) => (
                                                <div key={comment.id} className="incident-item">
                                                    <div className="incident-item-top">
                                                        <strong>{comment.author?.fullName || '-'}</strong>
                                                        <span className="incident-meta">{formatDate(comment.updatedAt)}</span>
                                                    </div>
                                                    <div style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>{detailText(comment.message)}</div>
                                                    <div className="incident-meta" style={{ marginTop: '6px' }}>
                                                        {comment.edited ? 'Edited' : 'Original'} • {comment.deleted ? 'Deleted' : 'Visible'}
                                                    </div>
                                                    <div className="incident-actions" style={{ marginTop: '10px' }}>
                                                        <button
                                                            type="button"
                                                            className="incident-btn-ghost"
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                            disabled={busyAction === `delete-comment-${comment.id}`}
                                                        >
                                                            {busyAction === `delete-comment-${comment.id}` ? 'Deleting...' : 'Delete Comment'}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {ticket.rejectionReason ? (
                                <div className="incident-kv" style={{ marginTop: '12px' }}>
                                    <strong>REJECTION REASON</strong>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{ticket.rejectionReason}</div>
                                </div>
                            ) : null}

                            {ticket.resolutionNotes ? (
                                <div className="incident-kv" style={{ marginTop: '12px' }}>
                                    <strong>RESOLUTION NOTES</strong>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{ticket.resolutionNotes}</div>
                                </div>
                            ) : null}

                            <h3 style={{ fontSize: '1.05rem', marginTop: '20px' }}>Status Timeline</h3>
                            <div className="incident-timeline">
                                {(ticket.statusHistory || []).map((item) => (
                                    <div key={item.id} className="incident-timeline-item">
                                        <div style={{ fontWeight: 700 }}>
                                            {item.oldStatus || 'N/A'} → {item.newStatus}
                                        </div>
                                        <div className="incident-meta">By {item.changedBy?.fullName || '-'} on {formatDate(item.changedAt)}</div>
                                        <div style={{ marginTop: '4px' }}>{detailText(item.note)}</div>
                                    </div>
                                ))}
                                {(!ticket.statusHistory || ticket.statusHistory.length === 0) ? (
                                    <div className="incident-meta">No status history available yet.</div>
                                ) : null}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default IncidentTicketDetailsPage;
