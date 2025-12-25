import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactUs.css";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_ljnw3cb",
        "template_b3ajqw9",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "s0KWAWTkvRJkbLUuI"
      );

      setStatus("✅ Message sent successfully! We’ll contact you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("❌ Failed to send message. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-container fade-in">

      {/* HEADER */}
      <div className="contact-header glass-card">
        <h1 className="contact-title">📩 Contact Us</h1>
        <p className="contact-subtitle">
          Questions, feedback, partnerships — let’s talk.
        </p>
      </div>

      {/* GRID */}
      <div className="contact-grid">

        {/* FORM */}
        <div className="glass-card contact-box slide-in">
          <h3 className="contact-section-title">Send a Message</h3>

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="contact-input"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="contact-input"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              className="contact-textarea"
              value={form.message}
              onChange={handleChange}
            />

            {error && <div className="form-error">{error}</div>}
            {status && <div className="form-success">{status}</div>}

            <button className="contact-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* INFO */}
        <div className="glass-card contact-info slide-in">
          <h3 className="contact-section-title">📍 Reach Us</h3>

          <p><b>Email:</b> support@newsguard.ai</p>
          <p><b>Phone:</b> +91 98765 43210</p>
          <p><b>Location:</b> Ahmedabad, Gujarat, India</p>

          <div className="contact-socials">
            <span>🌐 Website</span>
            <span>🔗 LinkedIn</span>
            <span>🐦 Twitter</span>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="glass-card map-box fade-in">
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Ahmedabad,Gujarat&output=embed"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "14px" }}
          loading="lazy"
        />
      </div>

      {/* FOOTER */}
      <footer className="contact-footer">
        🚀 We usually respond within 24 hours
      </footer>
    </div>
  );
}
