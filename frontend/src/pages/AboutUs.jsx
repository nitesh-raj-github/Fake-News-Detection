import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-container fade-in">

      {/* HEADER */}
      <div className="about-header glass-card">
        <h1 className="about-title">
          About <span className="accent">NewsGuard AI</span>
        </h1>
        <p className="about-subtitle">
          Fighting misinformation with ethical AI, Machine Learning & truth-first technology.
        </p>
      </div>

      {/* MISSION */}
      <div className="glass-card about-section">
        <h2 className="section-heading">🌍 Our Mission</h2>
        <p className="section-text">
          NewsGuard AI exists to protect people from fake news, manipulated media,
          deepfakes, and AI-generated misinformation.
          <br /><br />
          By combining <b>Machine Learning, NLP, Computer Vision, Deepfake Detection</b>
          and <b>Groq AI reasoning</b>, we help users verify information before believing or sharing it.
        </p>
      </div>

      {/* FOUNDERS */}
      <div className="founders-section">


         <FounderCard
          name="Manish Vidhayak"
          role="Chief Executive Officer (CEO)"
          img="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?crop=faces&fit=crop&w=500&q=80"
          text="Ethical AI and user trust are at the heart of NewsGuard. Technology must serve truth and society."
        />

        <FounderCard
          name="Pawan Kumar"
          role="Founder & Lead AI Architect"
          img="https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=500&q=80"
          text="The internet is flooded with misinformation. Our mission is to protect people using transparent, responsible AI."
        />

        <FounderCard
          name="Vinay Singh"
          role="Co-Founder & Product Engineer"
          img="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?crop=faces&fit=crop&w=500&q=80"
          text="We aim to build an AI that acts like a digital shield against fake news, scams, and manipulation."
        />

       

      </div>

      {/* VALUES */}
      <div className="glass-card values-section">
        <h2 className="section-heading">💎 Our Core Values</h2>
        <div className="values-grid">
          <Value title="Integrity" text="Truth-first approach with transparent AI decisions." />
          <Value title="Accuracy" text="High-precision models trained on real-world data." />
          <Value title="Trust" text="Explainable results users can rely on." />
          <Value title="Responsibility" text="Ethical AI built for society, not manipulation." />
        </div>
      </div>

      {/* TEAM */}
      <div className="glass-card team-section">
        <h2 className="section-heading">👥 Our Growing Team</h2>
        <p className="section-text">
          NewsGuard AI is built by passionate engineers, researchers, and designers
          working together to fight misinformation at scale.
        </p>
      </div>

      {/* ADVISORS */}
      <div className="glass-card advisors-section">
        <h2 className="section-heading">🎓 Advisors & Mentors</h2>
        <ul className="advisor-list">
          <li>AI Research Advisor – Computer Vision & NLP</li>
          <li>Cybersecurity & Digital Ethics Consultant</li>
          <li>Startup Growth & Product Strategy Mentor</li>
        </ul>
      </div>

      {/* TIMELINE */}
      <div className="glass-card timeline">
        <h2 className="section-heading">🛠 Our Journey</h2>

        {[
          "Idea conceptualized to fight misinformation",
          "ML models trained with high accuracy",
          "Groq AI integrated for explainable results",
          "Image & video deepfake detection launched"
        ].map((item, i) => (
          <div className="timeline-item" key={i}>
            <span className="timeline-dot"></span>
            <p>{item}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="about-footer">
        ❤️ Built with trust & innovation by Team <b>NewsGuard AI</b>
      </footer>
    </div>
  );
}

/* REUSABLE COMPONENTS */

function FounderCard({ name, role, img, text }) {
  return (
    <div className="founder-card glass-card">
      <img src={img} alt={name} className="founder-img" />
      <h3 className="founder-name">{name}</h3>
      <p className="founder-role">{role}</p>
      <p className="founder-speech">“{text}”</p>

      <div className="social-links">
        <span>🔗 LinkedIn</span>
      </div>
    </div>
  );
}

function Value({ title, text }) {
  return (
    <div className="value-card">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}
