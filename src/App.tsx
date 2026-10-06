import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { HomePage } from "./pages/HomePage";
import { SourcesPage } from "./pages/SourcesPage";
import { VillagePage } from "./pages/VillagePage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Scroll to top automatically when location changes
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Skip link for keyboard accessibility (WCAG AA) */}
      <a href="#main-content" className="skip-link">
        Lewati ke Konten Utama
      </a>

      <SiteHeader />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sumber" element={<SourcesPage />} />
          <Route path="/desa/:slug" element={<VillagePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />
    </BrowserRouter>
  );
};

export default App;
