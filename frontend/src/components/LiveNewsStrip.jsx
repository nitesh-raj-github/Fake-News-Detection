import React, { useEffect, useState } from "react";
import { fetchLiveNews } from "../services/newsService";
import "./LiveNewsStrip.css";

// 🔥 simple in-memory cache
const cache = {};

export default function LiveNewsStrip({
  category = "general",
  onHeadlineClick,
}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cache[category]) {
      setArticles(cache[category]);
      setLoading(false);
      return;
    }
    loadNews();
  }, [category]);

  const loadNews = async () => {
    try {
      const data = await fetchLiveNews(category);
      if (Array.isArray(data) && data.length > 0) {
        cache[category] = data;
        setArticles(data);
      }
    } catch (err) {
      console.error("LiveNewsStrip error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="live-strip loading">
        🔄 Fetching live news...
      </div>
    );
  }

  if (!articles.length) return null;

  return (
    <div className="live-strip">
      <div className="live-strip-track">
        {[...articles, ...articles].map((news, i) => (
          <div className="live-card" key={i}>
            <img
              src={news.image || "https://via.placeholder.com/120x80"}
              alt={news.title}
              loading="lazy"
            />

            <div className="live-card-content">
              <p
                className="headline"
                onClick={() => onHeadlineClick?.(news.title)}
                title="Click to analyze this news"
              >
                {news.title}
              </p>

              <span className="source">
                {news.source?.name || "Unknown Source"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
