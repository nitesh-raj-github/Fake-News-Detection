import React, { useState } from "react";
import axios from "axios";
import "./ChatBot.css";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m NewsGuard AI. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((m) => [...m, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: userMsg,
      });

      setMessages((m) => [
        ...m,
        { from: "bot", text: res.data.reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "⚠️ Unable to connect to AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING LOGO */}
      <div className="chatbot-icon" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {/* CHAT WINDOW */}
      {open && (
        <div className="chatbot-window">
          <div className="chat-header">
            NewsGuard AI
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-msg bot">Typing...</div>}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
