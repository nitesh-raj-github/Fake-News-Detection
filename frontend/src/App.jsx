import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LiveNewsTicker from "./components/LiveNewsTicker";
import Home from "./pages/Home";
import News from "./pages/News";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LiveTV from "./pages/LiveTv";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AIFaqs from "./pages/AIFaqs";
import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import "./App.css";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-root">
          <Navbar />
          <LiveNewsTicker />

          <main className="route-wrapper">
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* PROTECTED ROUTES */}
              <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/news" element={<RequireAuth><News /></RequireAuth>} />
              <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
              <Route path="/live-tv" element={<RequireAuth><LiveTV /></RequireAuth>} />
              <Route path="/blog" element={<RequireAuth><Blog /></RequireAuth>} />
              <Route path="/contact" element={<RequireAuth><ContactUs /></RequireAuth>} />
              <Route path="/about" element={<RequireAuth><AboutUs /></RequireAuth>} />
              <Route path="/ai-faqs" element={<RequireAuth><AIFaqs /></RequireAuth>} />
            </Routes>
          </main>

          <footer className="footer small-muted">
            Built by Nitesh Raj • NewsGuard AI
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}
