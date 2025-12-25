import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar-main">
      <div className="nav-left" onClick={() => navigate("/")}>
        🛡 NewsGuard
      </div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/live-tv">Live TV</NavLink>
        <NavLink to="/ai-faqs">AI FAQs</NavLink>
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button className="primary" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        ) : (
          <div className="profile-box">
            <img
              src={user.avatar}
              className="profile-avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <img src={user.avatar} />
                  <div>
                    <strong>{user.name}</strong>
                    <p>{user.email}</p>
                  </div>
                </div>

                <button onClick={() => navigate("/profile")}>
                  ✏ Edit Profile
                </button>
                <button onClick={() => navigate("/history")}>
                  📜 History
                </button>
                <button className="logout-btn" onClick={logout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
