import { useEffect } from "react";

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = "Jaten: Profil Desa";
    document.title = title ? `${title} — ${baseTitle}` : baseTitle;

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
      h1.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [title, description]);
}
