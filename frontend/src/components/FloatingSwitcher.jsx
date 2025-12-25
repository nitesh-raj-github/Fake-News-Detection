import React, { useState } from "react";
import "./FloatingSwitcher.css";

export default function FloatingSwitcher({ channels, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="float-container">
      {/* Floating Button */}
      <button
        className="float-btn"
        onClick={() => setOpen(!open)}
      >
        📺
      </button>

      {/* Floating Panel */}
      {open && (
        <div className="float-panel glass-card">
          <p className="panel-title">Live Channels</p>

          <div className="panel-channels">
            {channels.map((c, i) => (
              <div
                key={i}
                className="channel-icon"
                onClick={() => onSelect(c)}
              >
                <img src={c.logo} alt="" />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
