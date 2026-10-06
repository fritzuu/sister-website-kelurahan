import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../utils/seo";

interface NotFoundPageProps {
  attemptedSlug?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ attemptedSlug }) => {
  usePageMeta(
    "Halaman Tidak Ditemukan",
    "Halaman profil atau tautan yang Anda cari tidak tersedia dalam direktori desa Kecamatan Jaten."
  );

  return (
    <div className="container" style={{ padding: "3rem 1rem" }}>
      <div className="not-found-card" role="alert">
        <span
          style={{
            fontSize: "2.75rem",
            display: "inline-block",
            marginBottom: "0.5rem"
          }}
        >
          🔍
        </span>
        <h1>Halaman Tidak Ditemukan</h1>
        <p style={{ color: "var(--color-text-muted)" }}>
          {attemptedSlug
            ? `Profil desa dengan pengenal "${attemptedSlug}" tidak ditemukan dalam direktori desa.`
            : "Halaman yang Anda tuju tidak tersedia atau tautan telah berpindah."}
        </p>

        <p style={{ fontSize: "0.95rem", marginTop: "1.25rem", fontWeight: 600 }}>
          Silakan akses salah satu profil desa yang tersedia:
        </p>

        <div className="not-found-links">
          <Link to="/desa/dagen" className="btn btn-secondary">
            Desa Dagen
          </Link>
          <Link to="/desa/ngringo" className="btn btn-secondary">
            Desa Ngringo
          </Link>
          <Link to="/desa/sroyo" className="btn btn-secondary">
            Desa Sroyo
          </Link>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Link to="/" className="btn btn-primary">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};
