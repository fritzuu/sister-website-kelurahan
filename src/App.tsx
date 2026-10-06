import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { PageBoundary, PageSkeleton } from "./components/Loading";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const SourcesPage = lazy(() => import("./pages/SourcesPage").then((module) => ({ default: module.SourcesPage })));
const VillagePage = lazy(() => import("./pages/VillagePage").then((module) => ({ default: module.VillagePage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

// Scroll after the destination route has rendered, including repeated hash links.
const RouteScroll: React.FC = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    let observer: MutationObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo(0, 0);
        return;
      }

      let targetId = hash.slice(1);
      try {
        targetId = decodeURIComponent(targetId);
      } catch {
        // A malformed hash can still match a literal element ID.
      }
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo(0, 0);
        // Lazy routes may still be showing their skeleton at this point.
        observer = new MutationObserver(() => {
          const destination = document.getElementById(targetId);
          if (destination) {
            destination.scrollIntoView({ block: "start" });
            observer?.disconnect();
          }
        });
        const main = document.getElementById("main-content");
        if (main) observer.observe(main, { childList: true, subtree: true });
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname, hash, key]);

  return null;
};

const PageRoutes: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <PageBoundary key={pathname}>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sumber" element={<SourcesPage />} />
          <Route path="/desa/:slug" element={<VillagePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </PageBoundary>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RouteScroll />
      {/* Skip link for keyboard accessibility (WCAG AA) */}
      <a href="#main-content" className="skip-link">
        Lewati ke Konten Utama
      </a>

      <SiteHeader />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <PageRoutes />
      </main>

      <SiteFooter />
    </BrowserRouter>
  );
};

export default App;
