import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "./LiveTV.css";

const CHANNELS = [
  {
    name: "DD News",
    logo: "/channels/dd-news.png",
    hls: "https://nicls1-lh.akamaihd.net/i/news/ddnews_1@409133/master.m3u8",
    youtube: "https://www.youtube.com/embed/0Y6k6hVYkIo",
    category: "Hindi"
  },
  {
    name: "Aaj Tak",
    logo: "/channels/aaj-tak.png",
    hls: "", // ❌ no public HLS
    youtube: "https://www.youtube.com/embed/Nq2wYlWFucg",
    category: "Hindi"
  },
  {
    name: "ABP News",
    logo: "/channels/abp-news.png",
    hls: "https://www.abplive.com/live-tv",
    youtube: "https://www.youtube.com/embed/nyd-xznCpJc",
    category: "Hindi"
  },
  {
    name: "India TV",
    logo: "/channels/india-tv.png",
    hls: "https://indiatv-lh.akamaihd.net/i/INDIATVHD_1@409030/master.m3u8",
    youtube: "https://www.youtube.com/embed/Xmm3Kr5P1Uw",
    category: "Hindi"
  },
  {
    name: "NDTV 24x7",
    logo: "/channels/ndtv.png",
    hls: "https://ndtv24x7elemarchana.akamaized.net/hls/live/2016380/ndtv24x7/ndtv24x7/master.m3u8",
    youtube: "https://www.youtube.com/embed/WB-y7_ymPJ4",
    category: "English"
  },
  {
    name: "CNN News18",
    logo: "/channels/cnn18.png",
    hls: "https://cnnnews18live.akamaized.net/hls/live/2100593/cnnnews18/cnnnews18/master.m3u8",
    youtube: "https://www.youtube.com/embed/6fZ9l2sHkO8",
    category: "English"
  },
  {
    name: "India Today",
    logo: "/channels/indiatoday.png",
    hls: "https://indiatodaylive.akamaized.net/hls/live/2014320/indiatoday/indiatoday/master.m3u8",
    youtube: "https://www.youtube.com/embed/x2k6Z1K9u9I",
    category: "English"
  },
  {
    name: "CNBC TV18",
    logo: "/channels/cnbc.png",
    hls: "https://cnbc18live.akamaized.net/hls/live/2006639/cnbc18/cnbc18/master.m3u8",
    youtube: "https://www.youtube.com/embed/9NyxcX3rhQs",
    category: "Business"
  },
  {
    name: "Zee Business",
    logo: "/channels/zeebusiness.png",
    hls: "https://zeebizlive.akamaized.net/hls/live/2006831/zeebusiness/zeebusiness/master.m3u8",
    youtube: "https://www.youtube.com/embed/pZ4XoVxGJkE",
    category: "Business"
  },
  {
    name: "DW News",
    logo: "/channels/dw.png",
    hls: "https://dwstream3-lh.akamaihd.net/i/dwstream3_live@124307/master.m3u8",
    youtube: "https://www.youtube.com/embed/N9XjQzN7Y3Y",
    category: "International"
  }
];

export default function LiveTV() {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const [active, setActive] = useState(CHANNELS[0]);
  const [useYoutube, setUseYoutube] = useState(false);

  useEffect(() => {
    setUseYoutube(false);

    // destroy previous hls
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // if no HLS, go directly to YouTube
    if (!active.hls) {
      setUseYoutube(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        liveDurationInfinity: true,
        enableWorker: true
      });

      hlsRef.current = hls;
      hls.loadSource(active.hls);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setUseYoutube(true);
          hls.destroy();
        }
      });
    } else {
      video.src = active.hls;
      video.play().catch(() => setUseYoutube(true));
    }

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [active]);

  return (
    <div className="livetv-container">
      {/* CHANNEL LIST */}
      <div className="channel-list">
        {CHANNELS.map((c) => (
          <div
            key={c.name}
            className={`channel-item ${active.name === c.name ? "active" : ""}`}
            onClick={() => setActive(c)}
          >
            <img src={c.logo} alt={c.name} />
            <p>{c.name}</p>
          </div>
        ))}
      </div>

      {/* PLAYER */}
      <div className="video-wrapper">
        {useYoutube ? (
          <iframe
            src={active.youtube}
            title={active.name}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="video-player"
          />
        ) : (
          <video
            ref={videoRef}
            className="video-player"
            controls
            autoPlay
            muted
            playsInline
          />
        )}
      </div>
    </div>
  );
}
