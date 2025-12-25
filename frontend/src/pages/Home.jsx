import React, { useState } from "react";
import { analyzeNews, factCheck, analyzeVideo } from "../api";
import "../App.css";
import LiveNewsStrip from "../components/LiveNewsStrip";
import ChatBot from "../components/ChatBot";
import axios from "axios";

/* ================================
   🔍 ENTITY DETECTION
================================ */
const detectEntity = (text) => {
  const t = text.toLowerCase();
  if (t.includes("prime minister") || t.includes(" pm ")) return "PRIME_MINISTER";
  if (t.includes("president")) return "PRESIDENT";
  if (t.includes("chief minister") || t.includes(" cm ")) return "CHIEF_MINISTER";
  return null;
};

/* ================================
   🌐 WIKIPEDIA CHECK
================================ */
const wikiCheck = async (person) => {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        person
      )}`
    );
    const data = await res.json();
    return data.extract || "";
  } catch {
    return "";
  }
};

/* ================================
   💾 SAVE HISTORY (BACKEND)
================================ */
const saveHistory = async (text, resultLabel) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    await axios.post("http://127.0.0.1:8000/history", {
      user_id: user.email,
      text,
      result: resultLabel,
    });
  } catch (err) {
    console.error("History save failed:", err);
  }
};

export default function Home() {
  const [text, setText] = useState("");
  const [textLoading, setTextLoading] = useState(false);
  const [textError, setTextError] = useState("");
  const [result, setResult] = useState(null);
  const [aiResult, setAiResult] = useState("");
  const [finalVerdict, setFinalVerdict] = useState("");

  const [videoUrl, setVideoUrl] = useState("");
  const [videoClaim, setVideoClaim] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState("");
  const [videoAnalysis, setVideoAnalysis] = useState("");

  const aiToProbabilities = (aiText) => {
    const t = aiText.toLowerCase();
    if (t.includes("false")) return { fake: 0.85, real: 0.15 };
    if (t.includes("true")) return { fake: 0.15, real: 0.85 };
    if (t.includes("misleading")) return { fake: 0.6, real: 0.4 };
    return { fake: 0.5, real: 0.5 };
  };

  /* ================================
     📰 TEXT ANALYSIS
  ================================ */
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setTextError("");
    setResult(null);
    setAiResult("");
    setFinalVerdict("");

    const trimmed = text.trim();
    if (!trimmed) {
      setTextError("Please enter text");
      return;
    }

    setTextLoading(true);
    let finalResult = null;

    try {
      const wordCount = trimmed.split(" ").length;
      const entity = detectEntity(trimmed);

      /* ===== FACTUAL CLAIM CHECK ===== */
      if (wordCount <= 8 && entity) {
        const person = trimmed.split(" ").slice(0, 2).join(" ");
        const wikiText = await wikiCheck(person);

        let label = "UNCERTAIN";
        let reason = "Unable to verify this factual claim.";

        if (wikiText) {
          if (wikiText.toLowerCase().includes("prime minister")) {
            label = "REAL";
            reason = `${person} is mentioned as Prime Minister on Wikipedia.`;
          } else {
            label = "FAKE";
            reason = `${person} is not Prime Minister according to Wikipedia.`;
          }
        }

        finalResult = {
          label,
          confidence: label === "REAL" ? 0.9 : 0.6,
          source: "WIKIPEDIA",
        };

        setAiResult(reason);
      } else {
        /* ===== ML + AI PIPELINE ===== */
        const ml = await analyzeNews(trimmed);

        if (!ml || ml.label === "UNKNOWN") {
          const ai = await factCheck(trimmed);
          const probs = aiToProbabilities(ai.analysis || "");
          const label =
            probs.real > 0.7 ? "REAL" : probs.fake > 0.7 ? "FAKE" : "UNCERTAIN";

          finalResult = {
            label,
            confidence: Math.max(probs.real, probs.fake),
            source: "AI",
          };

          setAiResult(ai.analysis || "");
        } else {
          finalResult = { ...ml, source: "ML" };
          const ai = await factCheck(trimmed);
          setAiResult(ai.analysis || "");
        }
      }

      // ✅ FINAL STATE UPDATE
      setResult(finalResult);

      setFinalVerdict(
        finalResult.label === "REAL"
          ? "LIKELY TRUE – No major red flags."
          : finalResult.label === "FAKE"
          ? "LIKELY FALSE – Misinformation detected."
          : "UNCERTAIN – Conflicting evidence."
      );

      // ✅ SAVE HISTORY AFTER RESULT
      await saveHistory(trimmed, finalResult.label);
    } catch (err) {
      console.error(err);
      setTextError("Backend error");
    } finally {
      setTextLoading(false);
    }
  };

  /* ================================
     🎥 VIDEO ANALYSIS
  ================================ */
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return setVideoError("Paste video link");

    setVideoLoading(true);
    try {
      const res = await analyzeVideo(videoUrl, videoClaim || null);
      setVideoAnalysis(res.analysis || "");
    } catch {
      setVideoError("Video analysis failed");
    } finally {
      setVideoLoading(false);
    }
  };

  return (
    <div className="home-root container">
      <LiveNewsStrip
        category="world"
        onHeadlineClick={(h) => {
          setText(h);
          window.scrollTo({ top: 300, behavior: "smooth" });
        }}
      />

      {/* TEXT ANALYZER */}
      <div className="glass-card analyzer-card">
        <h2>📰 Analyze News Text</h2>

        <form onSubmit={handleTextSubmit}>
          <textarea
            className="input-box"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste news or factual claim..."
          />
          <button className="analyze-btn" disabled={textLoading}>
            {textLoading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {result && (
          <p className={`badge badge-${result.label.toLowerCase()}`}>
            {result.label} • Source: {result.source}
          </p>
        )}

        {finalVerdict && <div className="tips-box">{finalVerdict}</div>}
        {aiResult && <p className="fact-box">{aiResult}</p>}
      </div>

      {/* VIDEO ANALYZER */}
      <div className="glass-card analyzer-card">
        <h2>🎥 Video Analyzer</h2>
        <form onSubmit={handleVideoSubmit}>
          <input
            className="video-input"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste video link..."
          />
          <textarea
            className="video-textarea"
            rows={3}
            value={videoClaim}
            onChange={(e) => setVideoClaim(e.target.value)}
            placeholder="Optional video claim..."
          />
          <button className="analyze-btn" disabled={videoLoading}>
            {videoLoading ? "Analyzing..." : "Analyze Video"}
          </button>
        </form>
        {videoAnalysis && <p className="fact-box">{videoAnalysis}</p>}
      </div>

      {/* 🤖 CHATBOT */}
      <ChatBot />

      <footer className="footer">
        ❤️ Created by <b>Team NewsGuard</b> • © 2025
      </footer>
    </div>
  );
}
