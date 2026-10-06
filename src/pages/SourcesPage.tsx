import React, { useState } from "react";
import { getAllSources } from "../content/sources";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PublicNotice } from "../components/PublicNotice";
import { ExternalLinkIcon, FileTextIcon, ChartBarIcon, UsersIcon, ShieldCheckIcon } from "../components/Icons";
import { usePageMeta } from "../utils/seo";

export const SourcesPage: React.FC = () => {
  usePageMeta(
    "Katalog Sumber Data & Metodologi — Kecamatan Jaten",
    "Daftar lengkap rujukan dokumen resmi, penerbit, metodologi penghitungan, dan batasan data website profil tiga desa Kecamatan Jaten."
  );

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const sources = getAllSources();

  // Categorize sources based on PRD Section 12
  const categorizedSources = sources.map((src) => {
    let category = "lainnya";
    if (src.id.includes("bps") || src.id.includes("dapodik") || src.id.includes("kemendikdasmen")) {
      category = "statistik";
    } else if (src.id.includes("perangkat") || src.id.includes("struktur") || src.id.includes("tusi") || src.id.includes("pj-ngringo") || src.id.includes("pleret")) {
      category = "pemerintahan";
    } else if (src.id.includes("adminduk") || src.id.includes("standar-pelayanan") || src.id.includes("dip")) {
      category = "layanan";
    } else {
      category = "wilayah";
    }
    return { ...src, category };
  });

  const filteredSources = activeCategory === "all"
    ? categorizedSources
    : categorizedSources.filter((s) => s.category === activeCategory);

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Sumber Data & Metodologi" }]} />

      <header
        style={{
          background: "linear-gradient(135deg, var(--color-surface) 0%, var(--color-primary-light) 100%)",
          border: "1px solid var(--color-border)",
          borderLeft: "6px solid var(--color-primary)",
          borderRadius: "var(--radius-lg)",
          padding: "1.75rem 2rem",
          marginBottom: "2rem",
          boxShadow: "var(--shadow-xs)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <span className="academic-badge">Transparansi Rujukan</span>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-subtle)" }}>
            Dokumen Resmi • Open Data • BPS
          </span>
        </div>
        <h1 style={{ marginBottom: "0.5rem", fontSize: "clamp(1.75rem, 3.5vw, 2.35rem)" }}>
          Katalog Sumber Data & Metodologi
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", margin: 0 }}>
          Daftar seluruh berkas dokumen rujukan, instansi penerbit, batasan periode data, dan metode kompilasi informasi pada website ini.
        </p>
      </header>

      <PublicNotice type="academic" />

      {/* Filter Tabs — inspired by reference portal classification tabs */}
      <section aria-labelledby="sources-table-heading" style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 id="sources-table-heading" style={{ margin: 0 }}>
            Daftar Dokumen & Basis Data ({filteredSources.length} Rujukan)
          </h2>

          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button
              type="button"
              className={`btn btn-sm ${activeCategory === "all" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveCategory("all")}
            >
              Semua Sumber
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeCategory === "statistik" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveCategory("statistik")}
            >
              Data Statistik
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeCategory === "pemerintahan" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveCategory("pemerintahan")}
            >
              Data Pemerintahan
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeCategory === "layanan" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveCategory("layanan")}
            >
              Layanan Publik
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeCategory === "wilayah" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveCategory("wilayah")}
            >
              Wilayah & Lainnya
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table" aria-label="Tabel Katalog Sumber Data">
            <thead>
              <tr>
                <th scope="col">Nama Dokumen / Rujukan</th>
                <th scope="col">Penerbit Resmi</th>
                <th scope="col">Tahun / Tanggal</th>
                <th scope="col">Cakupan Data</th>
                <th scope="col">Tautan</th>
              </tr>
            </thead>
            <tbody>
              {filteredSources.map((src) => (
                <tr key={src.id} id={src.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FileTextIcon size={16} color="var(--color-primary)" />
                      <strong>{src.title}</strong>
                    </div>
                    {src.note && (
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", marginTop: "0.3rem", paddingLeft: "1.5rem" }}>
                        <em>Keterbatasan:</em> {src.note}
                      </div>
                    )}
                  </td>
                  <td>{src.publisher}</td>
                  <td>
                    {src.dataYear
                      ? `Tahun ${src.dataYear}`
                      : src.publishedAt
                      ? src.publishedAt
                      : "—"}
                  </td>
                  <td style={{ fontSize: "0.88rem" }}>{src.scope}</td>
                  <td>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ whiteSpace: "nowrap" }}
                      aria-label={`Buka dokumen rujukan ${src.title}`}
                    >
                      Buka Rujukan
                      <ExternalLinkIcon size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology Section */}
      <section
        aria-labelledby="methodology-heading"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          marginBottom: "3rem",
          boxShadow: "var(--shadow-xs)"
        }}
      >
        <h2 id="methodology-heading" style={{ fontSize: "1.35rem", marginBottom: "0.5rem" }}>
          Metodologi & Batasan Penggunaan Data
        </h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.75rem", fontSize: "0.95rem" }}>
          Untuk menjamin akurasi dan mencegah misleading informasi, tim kurasi menerapkan prinsip integritas data berikut:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          <div style={{ background: "var(--color-surface-alt)", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <ChartBarIcon size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: "1rem", margin: 0 }}>1. Data Statistik Wilayah</h3>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
              Data demografi, luas wilayah, jumlah dusun, RW, dan RT bersumber dari publikasi resmi <em>Kecamatan Jaten Dalam Angka 2025</em> terbitan BPS Kabupaten Karanganyar dengan basis data tahun 2024. Nilai statistik ini tidak dimodifikasi dan tidak diklaim sebagai sensus tahun 2026.
            </p>
          </div>

          <div style={{ background: "var(--color-surface-alt)", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <UsersIcon size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: "1rem", margin: 0 }}>2. Akumulasi Tiga Desa</h3>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
              Angka komparatif "Akumulasi Tiga Desa" merupakan murni hasil penjumlahan matematis dari baris Desa Dagen, Ngringo, dan Sroyo. Angka ini bukan representasi keseluruhan Kecamatan Jaten yang terdiri dari total 8 desa.
            </p>
          </div>

          <div style={{ background: "var(--color-surface-alt)", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <ShieldCheckIcon size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: "1rem", margin: 0 }}>3. Data Perangkat & Kelembagaan</h3>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
              Nama dan susunan aparatur pemerintah desa dicantumkan dengan penanda tahun dokumen sumber (misalnya dokumen perangkat 2023 atau berita pelantikan 2026). Informasi ini disajikan sebagai arsip rujukan dan bukan penetapan resmi kepengurusan aktif saat ini.
            </p>
          </div>

          <div style={{ background: "var(--color-surface-alt)", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <FileTextIcon size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: "1rem", margin: 0 }}>4. Hak Cipta & Aset Visual</h3>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
              Situs ini tidak menyalin lambang resmi daerah atau foto berhak cipta tanpa izin tertulis. Semua tautan eksternal dibuka pada tab baru demi keamanan dan integritas sumber asli.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
