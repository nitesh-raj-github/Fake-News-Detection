// src/pages/News.jsx
import React from "react";
import LiveNewsStrip from "../components/LiveNewsStrip";
import "../App.css";

const CATEGORIES = [
  {
    id: "general",
    title: "Top Stories",
    description: "Latest national and international headlines"
  },
  {
    id: "india",
    title: "India",
    description: "Top news and developments from India"
  },
  {
    id: "world",
    title: "World",
    description: "Important global news and international affairs"
  },
  {
    id: "business",
    title: "Business & Markets",
    description: "Stock market, economy and corporate updates"
  },
  {
    id: "technology",
    title: "Tech & Science",
    description: "Technology, AI, innovation and science discoveries"
  },
  {
    id: "sports",
    title: "Sports",
    description: "Latest sports updates and match highlights"
  },
  {
    id: "science",
    title: "Science",
    description: "Research, space and scientific breakthroughs"
  }
];

export default function News() {
  return (
    <div className="container news-page fade-in">

      {/* PAGE HEADER */}
      <div className="glass-card">
        <h1 className="title">
          News <span className="highlight">Categories</span>
        </h1>
        <p className="subtitle">
          Live headlines by category. Copy any headline and analyze it on the
          <b> Home</b> page.
        </p>
      </div>

      {/* CATEGORY SECTIONS */}
      <div className="news-grid">
        {CATEGORIES.map((cat) => (
          <section
            key={cat.title}
            className="glass-card news-category-card"
          >
            <h2 className="news-category-title">{cat.title}</h2>

            <p className="small-muted mb-2">
              {cat.description}
            </p>

            {/* 🔴 LIVE NEWS STRIP WITH IMAGE + HEADLINE */}
            <LiveNewsStrip
              category={
                cat.id === "india" || cat.id === "world"
                  ? "general"
                  : cat.id
              }
            />

            <p className="small-muted mt-2">
              Tip: Click and copy any headline and analyze it on the Home page.
            </p>
          </section>
        ))}
      </div>

    </div>
  );
}
