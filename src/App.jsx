import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import LocalBusinessSchema from "./components/LocalBusinessSchema";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import LowVoltageConsultancy from "./pages/LowVoltageConsultancy";
import EldecSolarMiniGrids from "./pages/EldecSolarMiniGrids";
import BESSPage from "./pages/BESSPage";

/* Scrolls to top on every page navigation */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Structured data — present on every route, only needs to be rendered once */}
      <LocalBusinessSchema />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

        {/* ── New, SEO-friendly URLs ── */}
        <Route
          path="/services/low-voltage-consultancy"
          element={<LowVoltageConsultancy />}
        />
        <Route
          path="/services/solar-mini-grids"
          element={<EldecSolarMiniGrids />}
        />
        <Route
          path="/services/battery-energy-storage"
          element={<BESSPage />}
        />

        <Route path="/contact" element={<Contact />} />

        {/* ── 301-style redirects from the old URLs ──
            These keep old links/bookmarks/search-indexed pages working
            and forward users (and eventually search engines) to the new
            path instead of hitting a 404. Remove these ~6-12 months after
            the new URLs are indexed and old ones have dropped out of Google. */}
        <Route path="/lowvoltageconsultancy" element={<Navigate to="/services/low-voltage-consultancy" replace />} />
        <Route path="/eldecsolarminigrids" element={<Navigate to="/services/solar-mini-grids" replace />} />
        <Route path="/BESSPage" element={<Navigate to="/services/battery-energy-storage" replace />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

/* Simple 404 page */
function NotFound() {
  return (
    <main className="min-h-screen bg-[#0D2137] flex items-center justify-center px-6">
      <SEO
        title="Page Not Found | ELDEC Limited"
        description="The page you're looking for doesn't exist."
        path="/404"
        noindex
      />
      <div className="text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#F59E0B] mb-4">
          404 — Page Not Found
        </p>
        <h1 className="font-heading text-7xl lg:text-9xl font-bold text-white/10 mb-6">
          404
        </h1>
        <p className="font-body text-white/50 text-lg mb-10">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="font-sans text-sm tracking-widest uppercase bg-[#8B1A1A] text-white px-10 py-4 hover:bg-[#6e1515] transition-all duration-300"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
