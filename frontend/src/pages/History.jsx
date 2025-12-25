import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import "../App.css";

export default function History() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://127.0.0.1:8000/history/${user.email}`)
      .then((res) => {
        setItems(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load history", err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="container history-page fade-in">
      <div className="glass-card">

        {/* HEADER */}
        <div className="history-header">
          <div>
            <h1 className="title">
              History <span className="highlight">Log</span>
            </h1>
            <p className="subtitle">
              Your previous AI + ML fact-check results
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && <p className="small-muted">Loading history...</p>}

        {/* EMPTY */}
        {!loading && items.length === 0 && (
          <p className="small-muted">
            No history yet. Analyze news from the Home page.
          </p>
        )}

        {/* LIST */}
        {items.length > 0 && (
          <ul className="history-list">
            {items.map((item, index) => (
              <li key={index} className="history-item glass-card-inner">
                <div className="history-top">
                  <span
                    className={
                      item.result === "FAKE"
                        ? "badge badge-fake"
                        : item.result === "REAL"
                        ? "badge badge-real"
                        : "badge badge-uncertain"
                    }
                  >
                    {item.result}
                  </span>

                  <span className="small-muted">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString()
                      : ""}
                  </span>
                </div>

                <p className="snippet">{item.text}</p>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}
