import React, { useEffect, useRef, useState } from "react";
import { fetchLiveNews } from "../services/newsService";
import "./LiveTicker.css";

const cache = {}; // 🔥 simple in-memory cache

export default function LiveNewsTicker({ category = "general" }) {
  const [headlines, setHeadlines] = useState([]);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (cache[category]) {
      setHeadlines(cache[category]);
      return;
    }

    if (loadingRef.current) return;
    loadingRef.current = true;

    const loadNews = async () => {
      try {
        const data = await fetchLiveNews(category);

        if (!data || data.length === 0) {
          console.warn("No news for category:", category);
          return;
        }

        const titles = data.map(n => n.title);
        cache[category] = titles; // ✅ cache save
        setHeadlines(titles);
      } catch (e) {
        console.error("Ticker error:", e);
      }
    };

    loadNews();
  }, [category]);

  if (!headlines.length) {
    return (
      <div className="ticker-container">
        <span className="ticker-label">LIVE</span>
        <span style={{ color: "#9ca3af" }}>Fetching latest headlines...</span>
      </div>
    );
  }

  return (
    <div className="ticker-container">
      <span className="ticker-label">
        LIVE {category.toUpperCase()}
      </span>
      <div className="ticker">
        <div className="ticker-move">
          {headlines.map((h, i) => (
            <span key={i} className="ticker-item">
              {h} •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
