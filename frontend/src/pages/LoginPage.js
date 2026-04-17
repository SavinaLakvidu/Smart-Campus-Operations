import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { fetchCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/auth/login",
        formData,
        { withCredentials: true }
      );

      await fetchCurrentUser();
      window.location.href = "/";
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Login failed");
        }
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left Side - Brand Section */}
        <div style={styles.brandSection}>
          <div style={styles.brandContent}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>🎓</div>
              <span style={styles.logoText}>Zentrix Uni</span>
            </div>
            <h1 style={styles.brandTitle}>
              Welcome to
              <span style={styles.brandAccent}> Zentrix Campus</span>
            </h1>
            <p style={styles.brandDescription}>
              Your all-in-one platform for managing campus resources, 
              bookings, and notifications efficiently.
            </p>
            <div style={styles.brandFeatures}>
              <div style={styles.brandFeature}>
                <span>✓</span> Smart Resource Management
              </div>
              <div style={styles.brandFeature}>
                <span>✓</span> Real-time Bookings
              </div>
              <div style={styles.brandFeature}>
                <span>✓</span> Instant Notifications
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={styles.formSection}>
          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Sign In</h2>
              <p style={styles.formSubtitle}>
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              {error && <div style={styles.errorMessage}>{error}</div>}

              <button 
                type="submit" 
                style={styles.loginButton} 
                disabled={loading}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {loading ? (
                  <span style={styles.loadingSpinner}></span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "20px",
  },

  container: {
    display: "flex",
    maxWidth: "1200px",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "32px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },

  // Left Side Styles - Matching AdminUserPage color scheme
  brandSection: {
    flex: 1,
    background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  brandContent: {
    position: "relative",
    zIndex: 2,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "48px",
  },

  logoIcon: {
    fontSize: "60px",
  },

  logoText: {
    fontSize: "4rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ffffff, #9ca3af)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  brandTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "20px",
    lineHeight: "1.3",
    letterSpacing: "-0.02em",
  },

  brandAccent: {
    display: "block",
    color: "#ffffff",
  },

  brandDescription: {
    fontSize: "1rem",
    color: "#9ca3af",
    lineHeight: "1.6",
    marginBottom: "32px",
  },

  brandFeatures: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  brandFeature: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#d1d5db",
    fontSize: "0.9rem",
    "& span": {
      color: "#10b981",
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
  },

  // Right Side Styles - Unchanged
  formSection: {
    flex: 1,
    padding: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  formContainer: {
    width: "100%",
    maxWidth: "400px",
  },

  formHeader: {
    marginBottom: "32px",
    textAlign: "center",
  },

  formTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "8px",
    letterSpacing: "-0.02em",
  },

  formSubtitle: {
    fontSize: "0.875rem",
    color: "#6b7280",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    letterSpacing: "0.3px",
  },

  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e5e7eb",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    outline: "none",
    fontFamily: "inherit",
    backgroundColor: "#f9fafb",
  },

  loginButton: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "0.875rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  errorMessage: {
    padding: "12px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "12px",
    color: "#dc2626",
    fontSize: "0.875rem",
    textAlign: "center",
  },

  loadingSpinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

// Add global animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background-color: #ffffff;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .brand-section {
    animation: fadeInUp 0.6s ease;
  }
  
  .form-section {
    animation: fadeInUp 0.6s ease 0.1s both;
  }
`;
document.head.appendChild(styleSheet);

export default LoginPage;