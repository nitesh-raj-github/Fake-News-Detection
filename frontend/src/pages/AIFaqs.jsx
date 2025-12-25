import React, { useState } from "react";
import { detectImage } from "../api";
import "../App.css";

export default function AIFaqs() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleAnalyze(type) {
    setLoading(true);
    setResult("");

    try {
      let res;

      if (type === "upload" && file) {
        res = await detectImage(file, "");
      } else if (type === "url" && imageUrl.trim()) {
        res = await detectImage(null, imageUrl);
      }

      setResult(res?.analysis || res?.error || "Unable to analyze.");
    } catch {
      setResult("Server error. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="container ai-faqs-page fade-in">

      <div className="glass-card ai-header">
        <h1 className="title">AI Image Detection Tools</h1>
        <p className="subtitle">Check if an image is real, AI-generated, edited, or misleading.</p>
      </div>

      <div className="ai-grid">

        {/* IMAGE UPLOAD */}
        <div className="glass-card ai-tool-card">
          <h2 className="ai-tool-title">🖼 Upload Image</h2>

          <input
            type="file"
            accept="image/*"
            className="ai-upload-input"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {preview && <img src={preview} className="ai-image-preview" />}

          <button className="analyze-btn" onClick={() => handleAnalyze("upload")}>
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        </div>

        {/* IMAGE URL */}
        <div className="glass-card ai-tool-card">
          <h2 className="ai-tool-title">🔗 Analyze Image URL</h2>

          <input
            type="text"
            className="input-box"
            placeholder="Paste image link..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button className="analyze-btn" onClick={() => handleAnalyze("url")}>
            {loading ? "Analyzing..." : "Analyze URL"}
          </button>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <div className="glass-card result-card fade-in">
          <h3 className="highlight">AI Report</h3>
          <p className="small-muted">{result}</p>
        </div>
      )}
    </div>
  );
}
