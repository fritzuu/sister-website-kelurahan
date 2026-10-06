import { Component, useState } from "react";
import type { ReactNode } from "react";
import "../styles/loading.css";

export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`skeleton ${className}`} aria-hidden="true" />;
}

export function PageSkeleton() {
  return (
    <div className="container page-skeleton" role="status" aria-busy="true" aria-label="Memuat halaman">
      <span className="sr-only">Memuat halaman…</span>
      <Skeleton className="skeleton-breadcrumb" />
      <div className="skeleton-hero"><Skeleton className="skeleton-heading" /><Skeleton /><Skeleton className="skeleton-short" /></div>
      <div className="skeleton-card-grid">
        {[0, 1, 2].map((item) => <div key={item} className="skeleton-card"><Skeleton className="skeleton-photo" /><Skeleton /><Skeleton className="skeleton-short" /></div>)}
      </div>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="map-skeleton" aria-hidden="true">
      <Skeleton className="map-skeleton-area" />
      <div className="map-skeleton-caption"><span className="loading-spinner" />Memuat peta…</div>
    </div>
  );
}

export function LoadingImage({ src, className = "", loading = "lazy", alt = "" }: {
  src: string; className?: string; loading?: "eager" | "lazy"; alt?: string;
}) {
  const [source, setSource] = useState(src);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const fallback = "/images/village-placeholder.svg";
  return (
    <div className={`loading-image ${className} ${status === "ready" ? "is-ready" : ""}`} aria-busy={status === "loading"}>
      {status === "loading" && <Skeleton className="image-skeleton" />}
      {status === "error" ? <span className="image-unavailable">Gambar tidak tersedia</span> : (
        <img src={source} alt={alt} loading={loading} decoding="async" width={1600} height={900}
          onLoad={() => setStatus("ready")} onError={() => {
            if (source !== fallback) setSource(fallback);
            else setStatus("error");
          }} />
      )}
    </div>
  );
}

export class PageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return (
      <div className="container page-load-error" role="alert">
        <h1>Halaman belum dapat dimuat</h1>
        <p>Periksa koneksi Anda, lalu muat ulang halaman.</p>
        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>Muat Ulang</button>
      </div>
    );
    return this.props.children;
  }
}
