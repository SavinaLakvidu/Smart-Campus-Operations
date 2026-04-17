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

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.left}>
          <h1 style={styles.title}>Zentrix Campus</h1>
          <p style={styles.subtitle}>
            Manage campus resources, bookings, and notifications easily.
          </p>
        </div>

        <div style={styles.right}>
          <h2 style={styles.loginTitle}>Welcome Back</h2>
          <p style={styles.welcomeText}>Please enter your credentials</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="campus@example.com"
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
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.loginBtn} disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>OR</span>
            <span style={styles.dividerLine}></span>
          </div>

          <button type="button" style={styles.googleBtn} onClick={handleGoogleLogin}>
            <svg style={styles.googleIcon} viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000000",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  card: {
    display: "flex",
    width: "900px",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    background: "#ffffff",
  },

  left: {
    flex: 1,
    background: "#1a1a1a",
    color: "white",
    padding: "60px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  title: {
    fontSize: "2.8rem",
    marginBottom: "16px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  subtitle: {
    fontSize: "1rem",
    opacity: 0.7,
    lineHeight: "1.6",
    color: "#e0e0e0",
  },

  right: {
    flex: 1,
    background: "#ffffff",
    padding: "60px 48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  loginTitle: {
    marginBottom: "8px",
    color: "#000000",
    fontSize: "2rem",
    fontWeight: "700",
    letterSpacing: "-0.01em",
  },

  welcomeText: {
    marginBottom: "32px",
    color: "#6b7280",
    fontSize: "0.9rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e5e7eb",
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
    backgroundColor: "#f9fafb",
  },

  loginBtn: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#000000",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "8px",
    fontFamily: "inherit",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "24px 0",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e5e7eb",
  },

  dividerText: {
    color: "#9ca3af",
    fontSize: "12px",
    fontWeight: "500",
  },

  googleBtn: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e5e7eb",
    background: "white",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontFamily: "inherit",
    color: "#374151",
  },

  googleIcon: {
    width: "18px",
    height: "18px",
  },

  error: {
    color: "#dc2626",
    fontSize: "13px",
    marginTop: "-8px",
    marginBottom: "0px",
  },
};