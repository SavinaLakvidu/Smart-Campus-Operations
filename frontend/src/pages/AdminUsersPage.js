import React, { useEffect, useState } from "react";
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

  // 🔥 Fetch users
  const fetchUsers = async () => {
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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  // 🔥 Handle form input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 Create user
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

  return (
    <div className="container py-4">
      <h2 className="mb-4">User Management</h2>

      {/* 🔥 ADD USER FORM */}
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

        {message && <p className="mt-3">{message}</p>}
      </div>

      {/* 🔥 SEARCH + FILTER */}
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

      {/* 🔥 USERS TABLE */}
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
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