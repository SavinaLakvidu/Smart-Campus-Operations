import React, { useEffect, useState } from "react";
import {
  getAllResources,
  createResource,
  updateResource,
  deleteResource
} from "../services/resourceService";

const AdminResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    resourceName: "",
    resourceType: "",
    location: "",
    capacity: "",
    status: "AVAILABLE"
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await getAllResources();
      setResources(res.data || []);
    } catch (error) {
      console.error("Error loading resources:", error);
      setMessage("Failed to load resources");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setFormData({
      resourceName: "",
      resourceType: "",
      location: "",
      capacity: "",
      status: "AVAILABLE"
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      capacity: Number(formData.capacity)
    };

    try {
      if (editingId) {
        await updateResource(editingId, payload);
        setMessage("Resource updated successfully");
      } else {
        await createResource(payload);
        setMessage("Resource created successfully");
      }

      clearForm();
      fetchResources();
    } catch (error) {
      console.error("Save error:", error);
      setMessage("Failed to save resource");
    }
  };

  const handleEdit = (resource) => {
    setEditingId(resource.resourceId);
    setFormData({
      resourceName: resource.resourceName,
      resourceType: resource.resourceType,
      location: resource.location,
      capacity: resource.capacity,
      status: resource.status
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this resource?");
    if (!confirmed) return;

    try {
      await deleteResource(id);
      setMessage("Resource deleted successfully");
      fetchResources();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Failed to delete resource");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "30px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "20px", color: "#1e293b" }}>
          🛠 Admin Resource Management
        </h1>

        {message && (
          <div
            style={{
              background: "#dbeafe",
              color: "#1e3a8a",
              padding: "12px 16px",
              borderRadius: "10px",
              marginBottom: "20px"
            }}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            marginBottom: "30px"
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>
            {editingId ? "Edit Resource" : "Add New Resource"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "15px",
                marginBottom: "20px"
              }}
            >
              <input
                type="text"
                name="resourceName"
                placeholder="Resource Name"
                value={formData.resourceName}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="text"
                name="resourceType"
                placeholder="Resource Type"
                value={formData.resourceType}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="UNAVAILABLE">UNAVAILABLE</option>
                <option value="MAINTENANCE">MAINTENANCE</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={saveButtonStyle}>
                {editingId ? "Update Resource" : "Add Resource"}
              </button>

              <button type="button" onClick={clearForm} style={resetButtonStyle}>
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            overflowX: "auto"
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>All Resources</h3>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Capacity</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.length > 0 ? (
                resources.map((resource) => (
                  <tr key={resource.resourceId}>
                    <td style={tdStyle}>{resource.resourceId}</td>
                    <td style={tdStyle}>{resource.resourceName}</td>
                    <td style={tdStyle}>{resource.resourceType}</td>
                    <td style={tdStyle}>{resource.location}</td>
                    <td style={tdStyle}>{resource.capacity}</td>
                    <td style={tdStyle}>{resource.status}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleEdit(resource)}
                        style={editButtonStyle}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(resource.resourceId)}
                        style={deleteButtonStyle}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No resources available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "14px"
};

const saveButtonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600"
};

const resetButtonStyle = {
  background: "#e2e8f0",
  color: "#1e293b",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600"
};

const editButtonStyle = {
  background: "#facc15",
  color: "#1e293b",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "8px"
};

const deleteButtonStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer"
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid #cbd5e1"
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0"
};

export default AdminResourcesPage;