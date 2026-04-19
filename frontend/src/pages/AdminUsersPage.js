import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
    provider: "LOCAL",
  });

  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
    provider: "LOCAL",
  });

  const editSectionRef = useRef(null);

  const fetchUsers = useCallback(async () => {
    try {
      const params = {};
      if (keyword) params.keyword = keyword;
      if (role) params.role = role;

      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/users",
        { params, withCredentials: true }
      );

      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [keyword, role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("success");

    try {
      await axios.post(
        "http://localhost:8080/api/v1/admin/users",
        formData,
        { withCredentials: true }
      );

      setMessage("User created successfully");
      setMessageType("success");

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "STUDENT",
        provider: "LOCAL",
      });

      fetchUsers();
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data || "Error creating user");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const startEdit = (user) => {
    setEditUserId(user.userId);
    setEditData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      provider: user.provider,
    });
    setMessage("");
    
    setTimeout(() => {
      if (editSectionRef.current) {
        editSectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        editSectionRef.current.style.transition = 'all 0.3s ease';
        editSectionRef.current.style.boxShadow = '0 0 0 3px #3b82f6';
        setTimeout(() => {
          if (editSectionRef.current) {
            editSectionRef.current.style.boxShadow = '';
          }
        }, 1500);
      }
    }, 100);
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("success");

    try {
      await axios.put(
        `http://localhost:8080/api/v1/admin/users/${editUserId}`,
        editData,
        { withCredentials: true }
      );

      setMessage("User updated successfully");
      setMessageType("success");
      setEditUserId(null);
      fetchUsers();
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data || "Error updating user");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/admin/users/${id}`,
        { withCredentials: true }
      );

      setMessage("User deleted successfully");
      setMessageType("success");
      fetchUsers();
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data || "Error deleting user");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'ADMIN': return '#dc2626';
      case 'STAFF': return '#3b82f6';
      case 'TECHNICIAN': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header with Circular User Count */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>User Management</h1>
            <p style={styles.subtitle}>Manage and control all user accounts</p>
          </div>
          
          {/* Circular User Count */}
          <div style={styles.circleCount}>
            <span style={styles.circleNumber}>{users.length}</span>
            <span style={styles.circleLabel}>USERS</span>
          </div>
        </div>

        {/* Add User Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Add New User</h2>
          <p style={styles.cardSubtitle}>Create a new user account</p>

          <form onSubmit={handleCreateUser}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username</label>
                <input
                  name="username"
                  placeholder="Enter username"
                  style={styles.input}
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                  style={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  style={styles.input}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Role</label>
                <select
                  name="role"
                  style={styles.select}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="STUDENT">Student</option>
                  <option value="STAFF">Staff</option>
                  <option value="TECHNICIAN">Technician</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Provider</label>
                <select
                  name="provider"
                  style={styles.select}
                  value={formData.provider}
                  onChange={handleChange}
                >
                  <option value="LOCAL">Local</option>
                  <option value="GOOGLE">Google</option>
                </select>
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.submitButton}>
                Add User
              </button>
            </div>
          </form>
        </div>

        {/* Edit User Card */}
        {editUserId && (
          <div ref={editSectionRef} style={{...styles.card, ...styles.editCard}}>
            <h2 style={styles.cardTitle}>Edit User</h2>
            <p style={styles.cardSubtitle}>Update user information</p>

            <form onSubmit={handleUpdateUser}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Username</label>
                  <input
                    name="username"
                    placeholder="Username"
                    style={styles.input}
                    value={editData.username}
                    onChange={handleEditChange}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    style={styles.input}
                    value={editData.email}
                    onChange={handleEditChange}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>New Password (optional)</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Leave blank to keep current"
                    style={styles.input}
                    value={editData.password}
                    onChange={handleEditChange}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Role</label>
                  <select
                    name="role"
                    style={styles.select}
                    value={editData.role}
                    onChange={handleEditChange}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="STAFF">Staff</option>
                    <option value="TECHNICIAN">Technician</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Provider</label>
                  <select
                    name="provider"
                    style={styles.select}
                    value={editData.provider}
                    onChange={handleEditChange}
                  >
                    <option value="LOCAL">Local</option>
                    <option value="GOOGLE">Google</option>
                  </select>
                </div>
              </div>

              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.submitButton}>
                  Update User
                </button>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setEditUserId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Search & Filter</h2>
          <p style={styles.cardSubtitle}>Find specific users quickly</p>

          <form onSubmit={handleSearch}>
            <div style={styles.filterGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Search by name or email</label>
                <input
                  placeholder="Type to search..."
                  style={styles.input}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Filter by role</label>
                <select
                  style={styles.select}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">All Roles</option>
                  <option value="STUDENT">Student</option>
                  <option value="STAFF">Staff</option>
                  <option value="TECHNICIAN">Technician</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div style={styles.filterActions}>
                <button type="submit" style={styles.searchButton}>
                  Search
                </button>
                {(keyword || role) && (
                  <button
                    type="button"
                    style={styles.clearButton}
                    onClick={() => {
                      setKeyword("");
                      setRole("");
                      fetchUsers();
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Message Toast */}
        {message && (
          <div style={{
            ...styles.toast,
            backgroundColor: messageType === 'success' ? '#10b981' : '#ef4444'
          }}>
            <span>{messageType === 'success' ? '✓' : '✗'}</span> {message}
          </div>
        )}

        {/* Users Table */}
        <div style={styles.tableCard}>
          <h2 style={styles.cardTitle}>User List</h2>
          <p style={styles.cardSubtitle}>Manage existing users</p>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Username</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Provider</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.userId} style={styles.tableRow}>
                      <td style={styles.td}>
                        <span style={styles.idBadge}>#{u.userId}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.username}>{u.username}</span>
                      </td>
                      <td style={styles.td}>{u.email}</td>
                      <td style={styles.td}>
                        <span style={{...styles.roleText, color: getRoleColor(u.role)}}>
                          {u.role}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.providerBadge}>{u.provider}</span>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.editButton}
                          onClick={() => startEdit(u)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDeleteUser(u.userId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={styles.emptyState}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        button:hover {
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .filter-grid {
            grid-template-columns: 1fr !important;
          }
          
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          
          .header {
            flex-direction: column !important;
            text-align: center !important;
          }
          
          .button-container {
            flex-direction: column !important;
          }
          
          .filter-actions {
            flex-direction: column !important;
          }
          
          .filter-actions button {
            width: 100% !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: '40px 20px'
  },

  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px'
  },

  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
    letterSpacing: '-0.02em'
  },

  subtitle: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },

  circleCount: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #111827, #374151)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },

  circleNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '1'
  },

  circleLabel: {
    fontSize: '0.65rem',
    color: '#9ca3af',
    marginTop: '4px'
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '24px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  },

  editCard: {
    border: '2px solid #3b82f6',
    boxShadow: '0 8px 25px -5px rgba(59, 130, 246, 0.15)'
  },

  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
  },

  cardSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '24px'
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  },

  filterGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto',
    gap: '20px',
    alignItems: 'end'
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#6b7280'
  },

  input: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #e5e7eb',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    backgroundColor: '#f9fafb',
    fontFamily: 'inherit',
    width: '100%'
  },

  select: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #e5e7eb',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    backgroundColor: '#f9fafb',
    fontFamily: 'inherit',
    cursor: 'pointer',
    width: '100%'
  },

  buttonContainer: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },

  submitButton: {
    padding: '10px 24px',
    borderRadius: '10px',
    border: 'none',
    background: '#111827',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  cancelButton: {
    padding: '10px 24px',
    borderRadius: '10px',
    border: '1.5px solid #e5e7eb',
    background: '#ffffff',
    color: '#374151',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  filterActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end'
  },

  searchButton: {
    padding: '10px 24px',
    borderRadius: '10px',
    border: 'none',
    background: '#111827',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  clearButton: {
    padding: '10px 24px',
    borderRadius: '10px',
    border: '1.5px solid #e5e7eb',
    background: '#f3f4f6',
    color: '#374151',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  toast: {
    position: 'fixed',
    top: '80px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: '500',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  },

  tableContainer: {
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '600px'
  },

  tableHeader: {
    borderBottom: '2px solid #f3f4f6'
  },

  th: {
    textAlign: 'left',
    padding: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#6b7280'
  },

  tableRow: {
    borderBottom: '1px solid #f3f4f6',
    transition: 'background-color 0.2s ease'
  },

  td: {
    padding: '12px',
    fontSize: '0.875rem',
    color: '#374151'
  },

  idBadge: {
    fontWeight: '600',
    color: '#6b7280',
    fontSize: '0.8rem'
  },

  username: {
    fontWeight: '500',
    color: '#111827'
  },

  roleText: {
    fontWeight: '600'
  },

  providerBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: '500',
    backgroundColor: '#f3f4f6',
    color: '#374151'
  },

  editButton: {
    padding: '6px 14px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    background: '#eff6ff',
    color: '#3b82f6',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginRight: '8px'
  },

  deleteButton: {
    padding: '6px 14px',
    borderRadius: '8px',
    border: 'none',
    background: '#fef2f2',
    color: '#dc2626',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  emptyState: {
    textAlign: 'center',
    padding: '48px',
    color: '#9ca3af',
    fontSize: '0.875rem'
  }
};

export default AdminUsersPage;