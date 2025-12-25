// src/api.js
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
});

// ---------------- ML NEWS PREDICTION ----------------
export async function analyzeNews(text) {
  try {
    const res = await api.post("/predict", { text });
    return res.data;
  } catch (e) {
    console.error("ML ERROR:", e);
    return { error: "ML server not responding" };
  }
}

// ---------------- AI FACT CHECK ----------------
export async function factCheck(text) {
  try {
    const res = await api.post("/factcheck", { text });
    return res.data;
  } catch (e) {
    console.error("AI ERROR:", e);
    return { error: "AI fact-check error" };
  }
}

// ---------------- VIDEO FACT CHECK ----------------
export async function analyzeVideo(url) {
  try {
    const res = await api.post("/video-check", { url });
    return res.data;
  } catch (e) {
    console.error("VIDEO ERROR:", e);
    return { error: "Video analysis error" };
  }
}

export default api;
export async function detectImage(file, url) {
  const formData = new FormData();
  if (file) formData.append("file", file);
  if (url) formData.append("url", url);

  const response = await apiClient.post("/image-detect", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}
