import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // ✅ CREATE USER OBJECT
    const user = {
      id: Date.now().toString(),
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
    };

    // ✅ AUTO LOGIN
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ REDIRECT TO HOME
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account 🚀</h1>

        <form onSubmit={handleSignup} className="auth-form">
          <input
            className="auth-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="error-text">{error}</div>}

          <button className="auth-btn">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
