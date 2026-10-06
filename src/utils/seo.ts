import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageMeta(title: string, description?: string) {
  const { pathname } = useLocation();
  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = "Jaten: Profil Desa";
    document.title = title ? `${title}: ${baseTitle}` : baseTitle;
    function updateProperty(property: string, content: string) {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    }
    updateProperty("og:title", document.title);
    if (description) updateProperty("og:description", description);
    const canonicalUrl = new URL(pathname, import.meta.env.VITE_SITE_URL || window.location.origin).href;
    updateProperty("og:url", canonicalUrl);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 2. Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // 3. Move keyboard focus to main H1 for accessibility on route change (F-07, F-11)
    const h1 = document.querySelector("h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.classList.add("route-focus-heading");
      h1.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [title, description, pathname]);
}
