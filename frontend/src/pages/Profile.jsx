import React, { useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import "./profile.css";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const fileRef = useRef();

  if (!user) return <p>Please login</p>;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={user.avatar} className="profile-big" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImage}
        />

        <button onClick={() => fileRef.current.click()}>
          Upload Photo
        </button>
      </div>
    </div>
  );
}
