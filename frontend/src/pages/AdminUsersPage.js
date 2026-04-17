import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

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

    try {
      await axios.post(
        "http://localhost:8080/api/v1/admin/users",
        formData,
        { withCredentials: true }
      );

      setMessage("✅ User created successfully");

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "STUDENT",
        provider: "LOCAL",
      });

      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data || "❌ Error creating user");
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

    try {
      await axios.put(
        `http://localhost:8080/api/v1/admin/users/${editUserId}`,
        editData,
        { withCredentials: true }
      );

      setMessage("✅ User updated successfully");
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data || "❌ Error updating user");
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

      setMessage("✅ User deleted successfully");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data || "❌ Error deleting user");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">User Management</h2>

      <div className="card p-4 mb-4">
        <h4>Add User</h4>

        <form onSubmit={handleCreateUser}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                name="username"
                placeholder="Username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                name="password"
                placeholder="Password (for LOCAL)"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option>STUDENT</option>
                <option>STAFF</option>
                <option>TECHNICIAN</option>
                <option>ADMIN</option>
              </select>
            </div>

            <div className="col-md-3">
              <select
                name="provider"
                className="form-select"
                value={formData.provider}
                onChange={handleChange}
              >
                <option>LOCAL</option>
                <option>GOOGLE</option>
              </select>
            </div>
          </div>

          <button className="btn btn-dark mt-3">Add User</button>
        </form>
      </div>

      {editUserId && (
        <div className="card p-4 mb-4">
          <h4>Edit User</h4>

          <form onSubmit={handleUpdateUser}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  name="username"
                  placeholder="Username"
                  className="form-control"
                  value={editData.username}
                  onChange={handleEditChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={editData.email}
                  onChange={handleEditChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  name="password"
                  placeholder="New password (optional)"
                  className="form-control"
                  value={editData.password}
                  onChange={handleEditChange}
                />
              </div>

              <div className="col-md-3">
                <select
                  name="role"
                  className="form-select"
                  value={editData.role}
                  onChange={handleEditChange}
                >
                  <option>STUDENT</option>
                  <option>STAFF</option>
                  <option>TECHNICIAN</option>
                  <option>ADMIN</option>
                </select>
              </div>

              <div className="col-md-3">
                <select
                  name="provider"
                  className="form-select"
                  value={editData.provider}
                  onChange={handleEditChange}
                >
                  <option>LOCAL</option>
                  <option>GOOGLE</option>
                </select>
              </div>
            </div>

            <button className="btn btn-primary mt-3 me-2">Update User</button>
            <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={() => setEditUserId(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="card p-4 mb-4">
        <h4>Search / Filter</h4>

        <form onSubmit={handleSearch} className="row g-3">
          <div className="col-md-6">
            <input
              placeholder="Search by name or email"
              className="form-control"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="STUDENT">STUDENT</option>
              <option value="STAFF">STAFF</option>
              <option value="TECHNICIAN">TECHNICIAN</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              Search
            </button>
          </div>
        </form>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card p-4">
        <h4>Users</h4>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Provider</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.userId}>
                  <td>{u.userId}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.provider}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => startEdit(u)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(u.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsersPage;
