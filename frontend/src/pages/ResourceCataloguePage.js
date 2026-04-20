import React, { useEffect, useState } from "react";
import { getAllResources, searchResources } from "../services/resourceService";

const ResourceCataloguePage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minCapacity: "",
    status: ""
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await getAllResources();
      setResources(res.data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const cleanedFilters = {
        ...(filters.type && { type: filters.type }),
        ...(filters.location && { location: filters.location }),
        ...(filters.minCapacity && { minCapacity: filters.minCapacity }),
        ...(filters.status && { status: filters.status })
      };

      const res = await searchResources(cleanedFilters);
      setResources(res.data || []);
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setFilters({
      type: "",
      location: "",
      minCapacity: "",
      status: ""
    });
    fetchResources();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "AVAILABLE":
        return {
          backgroundColor: "#dcfce7",
          color: "#166534",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "600",
          fontSize: "12px"
        };
      case "UNAVAILABLE":
        return {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "600",
          fontSize: "12px"
        };
      case "MAINTENANCE":
        return {
          backgroundColor: "#fef3c7",
          color: "#92400e",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "600",
          fontSize: "12px"
        };
      default:
        return {
          backgroundColor: "#e5e7eb",
          color: "#374151",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "600",
          fontSize: "12px"
        };
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f8fafc, #eef2ff)",
        padding: "30px 20px"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "25px 30px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            marginBottom: "25px"
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              fontWeight: "800",
              color: "#1e293b"
            }}
          >
            📚 Resource Catalogue
          </h1>
          <p
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "16px"
            }}
          >
            Browse and search all available campus resources quickly and easily
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            marginBottom: "25px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <h3 style={{ margin: 0, color: "#1e293b" }}>🔎 Search & Filters</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                backgroundColor: "#e2e8f0",
                border: "none",
                padding: "10px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "15px",
                  marginBottom: "18px"
                }}
              >
                <input
                  name="type"
                  placeholder="Search by type"
                  value={filters.type}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <input
                  name="location"
                  placeholder="Search by location"
                  value={filters.location}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <input
                  name="minCapacity"
                  placeholder="Minimum capacity"
                  type="number"
                  value={filters.minCapacity}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">All Status</option>
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="UNAVAILABLE">UNAVAILABLE</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button onClick={handleSearch} style={searchButtonStyle}>
                  🔍 Search
                </button>

                <button onClick={handleReset} style={resetButtonStyle}>
                  🔄 Reset
                </button>
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
            flexWrap: "wrap",
            gap: "10px"
          }}
        >
          <div style={{ color: "#334155", fontWeight: "600" }}>
            Found {resources.length} resource{resources.length !== 1 ? "s" : ""}
          </div>

          {loading && (
            <div style={{ color: "#2563eb", fontWeight: "600" }}>
              Loading resources...
            </div>
          )}
        </div>

        {/* Table Section */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            overflowX: "auto"
          }}
        >
          {resources.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "850px"
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Resource Name</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Capacity</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource, index) => (
                  <tr
                    key={resource.resourceId}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc"
                    }}
                  >
                    <td style={tdStyle}>{resource.resourceId}</td>
                    <td style={tdStyle}>{resource.resourceName}</td>
                    <td style={tdStyle}>{resource.resourceType}</td>
                    <td style={tdStyle}>{resource.location}</td>
                    <td style={tdStyle}>{resource.capacity}</td>
                    <td style={tdStyle}>
                      <span style={getStatusStyle(resource.status)}>
                        {resource.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                  color: "#64748b"
                }}
              >
                <div style={{ fontSize: "50px", marginBottom: "10px" }}>📭</div>
                <h3 style={{ marginBottom: "10px", color: "#334155" }}>
                  No resources found
                </h3>
                <p>Try changing your filters or add sample data from backend.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box"
};

const searchButtonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer"
};

const resetButtonStyle = {
  backgroundColor: "#e2e8f0",
  color: "#1e293b",
  border: "none",
  padding: "12px 20px",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer"
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
  borderBottom: "2px solid #e2e8f0",
  color: "#1e293b",
  fontSize: "15px"
};

const tdStyle = {
  padding: "16px",
  borderBottom: "1px solid #e2e8f0",
  color: "#334155",
  fontSize: "14px"
};

export default ResourceCataloguePage;