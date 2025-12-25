import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("All fields required");
    if (!email.includes("@")) return setError("Invalid email");
    if (password.length < 6) return setError("Min 6 characters");

    setLoading(true);

    setTimeout(() => {
      login({
        id: Date.now(),
        name: email.split("@")[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=0D8ABC&color=fff`,
      });
      navigate("/");
      setLoading(false);
    }, 700);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>
        <p className="auth-subtitle">Login to your NewsGuard account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && <div className="error-text">{error}</div>}

          <button className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          No account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
