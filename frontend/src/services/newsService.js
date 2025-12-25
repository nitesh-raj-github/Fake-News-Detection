import axios from "axios";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4/top-headlines";

export const fetchLiveNews = async (topic = "world") => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY, // ✅ correct
        lang: "en",
        country: "in",
        max: 10,
        topic, // ✅ valid topic
      },
    });

    return res.data.articles || [];
  } catch (err) {
    console.error("LiveNews error:", err);
    return [];
  }
};
