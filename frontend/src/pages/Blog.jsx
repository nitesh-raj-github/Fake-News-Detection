import React from "react";
import "./Blog.css";

export default function Blog() {
  const articles = [
    {
      title: "How AI Detects Fake News",
      desc: "How machine learning identifies misleading or manipulated content.",
      tag: "AI + ML",
      img: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Top 10 Signs a Video Is Deepfake",
      desc: "An expert breakdown on how to spot deepfake manipulation.",
      tag: "Deepfake",
      img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Psychology Behind Fake News",
      desc: "Why humans easily fall for misinformation—explained simply.",
      tag: "Awareness",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">📰 Latest Articles</h1>
      <p className="blog-subtitle">Trusted analysis on misinformation & digital safety.</p>

      <div className="blog-grid">
        {articles.map((a, i) => (
          <div key={i} className="blog-card">
            <img src={a.img} className="blog-img" alt={a.title} />
            <div className="blog-content">
              <span className="blog-tag">{a.tag}</span>
              <h3 className="blog-card-title">{a.title}</h3>
              <p className="blog-desc">{a.desc}</p>
              <button className="blog-readmore">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
