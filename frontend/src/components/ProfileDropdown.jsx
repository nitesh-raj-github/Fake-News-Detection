import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="profile-box">
      <img
        src={user.avatar || "/default-avatar.png"}
        className="avatar"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="dropdown">
          <a href="/profile">Edit Profile</a>
          <a href="/history">View History</a>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
