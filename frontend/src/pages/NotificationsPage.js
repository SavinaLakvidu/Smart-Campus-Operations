import React, { useEffect, useState } from "react";
import axios from "axios";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/notifications", {
        withCredentials: true,
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/notifications/unread-count", {
        withCredentials: true,
      });
      setUnreadCount(response.data);
    } catch (error) {
      console.error("Failed to load unread count", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/notifications/${id}/read`,
        {},
        { withCredentials: true }
      );

      fetchNotifications();
      fetchUnreadCount();
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        "http://localhost:8080/api/v1/notifications/read-all",
        {},
        { withCredentials: true }
      );

      fetchNotifications();
      fetchUnreadCount();
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchNotifications();
      await fetchUnreadCount();
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Notifications</h1>

          <button 
            style={styles.markAllButton} 
            onClick={markAllAsRead}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#111827";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1f2937";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Mark All as Read
          </button>
        </div>

        {/* Unread count below heading */}
        <div style={styles.unreadContainer}>
          <div style={styles.unreadInfo}>
            <span style={styles.unreadNumber}>{unreadCount}</span>
            <span style={styles.unreadText}>unread notification{unreadCount !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Notifications List */}
        <div style={styles.notificationsContainer}>
          {notifications.length === 0 ? (
            <div style={styles.emptyState}>
              <svg style={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <p style={styles.emptyText}>No notifications available</p>
              <p style={styles.emptySubtext}>When you receive notifications, they'll appear here</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  ...styles.notificationCard,
                  ...(notification.readFlag ? styles.readCard : styles.unreadCard)
                }}
              >
                <div style={styles.cardContent}>
                  <div style={styles.notificationIcon}>
                    {!notification.readFlag && <span style={styles.unreadDot}></span>}
                    <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 6L12 13L2 6M22 6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6l10 7l10-7z" />
                    </svg>
                  </div>
                  
                  <div style={styles.notificationDetails}>
                    <div style={styles.notificationHeader}>
                      <h3 style={styles.notificationTitle}>{notification.title}</h3>
                      <span style={styles.notificationType}>{notification.type}</span>
                    </div>
                    <p style={styles.notificationMessage}>{notification.message}</p>
                    <div style={styles.notificationMeta}>
                      <span style={styles.metaText}>
                        {new Date(notification.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {!notification.readFlag && (
                    <button
                      style={styles.markReadButton}
                      onClick={() => markAsRead(notification.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#059669";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#10b981";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <svg style={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f9fafb",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "48px 24px",
  },

  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb",
    gap: "16px",
  },

  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #e5e7eb",
    borderTop: "3px solid #374151",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    color: "#6b7280",
    fontSize: "14px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },

  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.02em",
  },

  markAllButton: {
    background: "#1f2937",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },

  unreadContainer: {
    marginBottom: "32px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e5e7eb",
  },

  unreadInfo: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  },

  unreadNumber: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#111827",
  },

  unreadText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    fontWeight: "400",
  },

  notificationsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  notificationCard: {
    borderRadius: "16px",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },

  readCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
  },

  unreadCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    borderLeft: "4px solid #10b981",
  },

  cardContent: {
    padding: "20px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
  },

  notificationIcon: {
    position: "relative",
    flexShrink: 0,
  },

  unreadDot: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    width: "10px",
    height: "10px",
    background: "#10b981",
    borderRadius: "50%",
    border: "2px solid #ffffff",
  },

  icon: {
    width: "24px",
    height: "24px",
    color: "#9ca3af",
  },

  notificationDetails: {
    flex: 1,
  },

  notificationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    flexWrap: "wrap",
    gap: "8px",
  },

  notificationTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#111827",
    margin: 0,
  },

  notificationType: {
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "4px 8px",
    borderRadius: "6px",
    background: "#f3f4f6",
    color: "#4b5563",
  },

  notificationMessage: {
    fontSize: "0.875rem",
    color: "#4b5563",
    marginBottom: "8px",
    lineHeight: "1.5",
  },

  notificationMeta: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  metaText: {
    fontSize: "12px",
    color: "#9ca3af",
  },

  markReadButton: {
    padding: "8px 16px",
    borderRadius: "10px",
    border: "none",
    background: "#10b981",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  buttonIcon: {
    width: "16px",
    height: "16px",
  },

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
  },

  emptyIcon: {
    width: "64px",
    height: "64px",
    margin: "0 auto 16px",
    color: "#d1d5db",
  },

  emptyText: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
  },

  emptySubtext: {
    fontSize: "0.875rem",
    color: "#9ca3af",
    margin: 0,
  },
};

// Add global styles for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
  }
`;
document.head.appendChild(styleSheet);

export default NotificationsPage;