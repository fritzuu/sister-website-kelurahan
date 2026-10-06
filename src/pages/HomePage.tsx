import React from "react";
import { Link } from "react-router-dom";
import { getAllVillages, aggregateThreeVillages } from "../content/villages";
import { getAllSources } from "../content/sources";
import { VillageCard } from "../components/VillageCard";
import { VillageMap } from "../components/VillageMap";
import { SourceCard } from "../components/SourceCard";
import { StatCard } from "../components/StatCard";
import {
  BuildingIcon,
  ChartBarIcon,
  UsersIcon,
  MapPinIcon,
  ShieldCheckIcon,
  FileTextIcon,
  LandmarkIcon
} from "../components/Icons";
import { usePageMeta } from "../utils/seo";
import { AcademicNotice } from "../components/AcademicNotice";

export const HomePage: React.FC = () => {
  usePageMeta(
    "Mengenal Dagen, Ngringo, dan Sroyo: Profil Desa Kecamatan Jaten",
    "Pusat informasi profil wilayah, demografi penduduk 2024, bagan kelembagaan, dan rujukan dokumen tiga desa di Kecamatan Jaten, Kabupaten Karanganyar."
  );

  const villages = getAllVillages();
  const allSources = getAllSources();
  // Select 3 featured documents for the downloads/sources showcase section
  const featuredSources = allSources.filter((s) =>
    ["bps-jaten-2025", "setda-krg-surat-adminduk-2025", "opendata-sroyo-struktur"].includes(s.id)
  );

  return (
    <div>
      <AcademicNotice />
      {/* 1. Hero Section (Section 5): Photorealistic Balai Desa banner matching reference */}
      <section className="hero-section" aria-labelledby="hero-title">
        {/* Floating Social Icons (Left): matching reference portal */}
        <div className="hero-floating-socials" aria-label="Media Informasi Publik">
          <a href="https://instagram.com/kecamatanjaten/" target="_blank" rel="noopener noreferrer" className="social-icon-btn social-ig" title="Instagram Resmi Informasi Desa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://facebook.com/kecamatan.jaten" target="_blank" rel="noopener noreferrer" className="social-icon-btn social-fb" title="Facebook Informasi Publik">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="https://youtube.com/@kecamatanjaten4558" target="_blank" rel="noopener noreferrer" className="social-icon-btn social-yt" title="YouTube Dokumentasi Wilayah">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="https://twitter.com/kecjaten" target="_blank" rel="noopener noreferrer" className="social-icon-btn social-x" title="Kanal Komunikasi X">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>



        <div className="container">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <LandmarkIcon size={14} color="#BAE6FD" />
              PROFIL DESA DI KECAMATAN JATEN
            </div>
            <h1 id="hero-title">Mengenal Dagen, Ngringo, dan Sroyo</h1>
            <p className="hero-description">
              Portal informasi terpadu yang menyajikan profil wilayah, data statistik kependudukan, struktur pemerintahan, dan rujukan dokumen resmi untuk tiga desa di Kecamatan Jaten, Kabupaten Karanganyar.
            </p>

            <div className="hero-actions">
              <a href="#jelajahi-desa" className="btn btn-primary btn-lg">
                Jelajahi Desa ↓
              </a>
              <Link to="/sumber" className="btn btn-outline btn-lg">
                Katalog Sumber Data →
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">3</span>
                <span className="hero-stat-label">Desa</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">{aggregateThreeVillages.population.total.toLocaleString("id-ID")}</span>
                <span className="hero-stat-label">Total Jiwa (BPS 2024)</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">{aggregateThreeVillages.areaHa.toLocaleString("id-ID")} ha</span>
                <span className="hero-stat-label">Luas Akumulasi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Jelajahi Desa (Section 6) */}
      <section id="jelajahi-desa" className="page-section" aria-labelledby="section-desa-title">
        <div className="container">
          <div className="section-header">
            <h2 id="section-desa-title">Jelajahi Profil Tiga Desa</h2>
            <p>
              Pilih profil desa di bawah untuk melihat rincian demografi, peta administrasi, susunan aparatur, dan fasilitas publik yang bersumber jelas.
            </p>
          </div>
          <div className="village-grid">
            {villages.map((village) => (
              <VillageCard key={village.slug} village={village} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section Layanan / Jelajahi Informasi (Section 7) */}
      <section id="peta-desa" className="page-section-alt" aria-labelledby="section-peta-title">
        <div className="container">
          <div className="section-header">
            <h2 id="section-peta-title">Temukan Tiga Desa di Peta</h2>
            <p>Kenali lokasi Dagen, Ngringo, dan Sroyo di Kecamatan Jaten. Pilih pin atau nama desa untuk melihat profil dan petunjuk arah.</p>
          </div>
          <VillageMap title="Peta lokasi Desa Dagen, Ngringo, dan Sroyo" />
        </div>
      </section>

      <section className="page-section-alt" aria-labelledby="section-info-title">
        <div className="container">
          <div className="section-header">
            <h2 id="section-info-title">Pusat Informasi & Data Wilayah</h2>
            <p>
              Struktur informasi publik yang disusun secara sistematis berdasarkan kebutuhan informasi warga, mahasiswa, dan pemangku kepentingan.
            </p>
          </div>

          <div className="info-grid">
            <Link to="/desa/dagen#profil" className="info-card">
              <div className="info-card-icon">
                <BuildingIcon size={24} />
              </div>
              <h3 className="info-card-title">Profil & Sejarah</h3>
              <p className="info-card-desc">
                Ringkasan asal-usul penamaan desa, visi, dan misi pembangunan masyarakat.
              </p>
            </Link>

            <a href="#statistik" className="info-card">
              <div className="info-card-icon">
                <ChartBarIcon size={24} />
              </div>
              <h3 className="info-card-title">Statistik Wilayah</h3>
              <p className="info-card-desc">
                Data resmi kependudukan, luas wilayah, dan kepadatan bersumber BPS 2024.
              </p>
            </a>

            <Link to="/desa/ngringo#pemerintahan" className="info-card">
              <div className="info-card-icon">
                <UsersIcon size={24} />
              </div>
              <h3 className="info-card-title">Pemerintahan</h3>
              <p className="info-card-desc">
                Bagan struktural normatif organisasi pemerintah desa dan arsip nama pengurus.
              </p>
            </Link>

            <Link to="/desa/sroyo#wilayah" className="info-card">
              <div className="info-card-icon">
                <MapPinIcon size={24} />
              </div>
              <h3 className="info-card-title">Wilayah & Demografi</h3>
              <p className="info-card-desc">
                Pembagian wilayah dusun, rukun warga (RW), rukun tetangga (RT), dan gender.
              </p>
            </Link>

            <Link to="/desa/dagen#potensi" className="info-card">
              <div className="info-card-icon">
                <ShieldCheckIcon size={24} />
              </div>
              <h3 className="info-card-title">Fasilitas Publik</h3>
              <p className="info-card-desc">
                Daftar sekolah dasar negeri (Dapodik) dan unit layanan kesehatan Puskesmas.
              </p>
            </Link>

            <Link to="/sumber" className="info-card">
              <div className="info-card-icon">
                <FileTextIcon size={24} />
              </div>
              <h3 className="info-card-title">Katalog Sumber Data</h3>
              <p className="info-card-desc">
                Daftar lengkap berkas dokumen rujukan, instansi penerbit, dan metodologi kurasi.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Section Statistik (Section 8) */}
      <section id="statistik" className="page-section" aria-labelledby="section-statistik-title">
        <div className="container">
          <div className="section-header">
            <h2 id="section-statistik-title">Statistik Pokok Wilayah</h2>
            <p>
              Indikator wilayah bersumber dari publikasi resmi BPS Kabupaten Karanganyar, <em>Kecamatan Jaten Dalam Angka 2025</em> (Data 2024).
            </p>
          </div>

          {/* Quick Aggregate Stats Grid */}
          <div className="stat-grid" style={{ marginBottom: "2rem" }}>
            <StatCard
              label="Total Penduduk (3 Desa)"
              value={aggregateThreeVillages.population.total.toLocaleString("id-ID")}
              unit="jiwa"
              asOf="2024"
              sourceIds={["bps-jaten-2025"]}
              status="verified"
            />
            <StatCard
              label="Akumulasi Luas Wilayah"
              value={aggregateThreeVillages.areaHa.toLocaleString("id-ID")}
              unit="ha"
              asOf="2024"
              sourceIds={["bps-jaten-2025"]}
              status="verified"
            />
            <StatCard
              label="Total Dusun"
              value={aggregateThreeVillages.administration.dusun}
              unit="dusun"
              asOf="2024"
              sourceIds={["bps-jaten-2025"]}
              status="verified"
            />
            <StatCard
              label="Total Rukun Warga"
              value={aggregateThreeVillages.administration.rw}
              unit="RW"
              asOf="2024"
              sourceIds={["bps-jaten-2025"]}
              status="verified"
            />
            <StatCard
              label="Total Rukun Tetangga"
              value={aggregateThreeVillages.administration.rt}
              unit="RT"
              asOf="2024"
              sourceIds={["bps-jaten-2025"]}
              status="verified"
            />
          </div>

          {/* Detailed Comparative Table */}
          <div className="table-wrapper">
            <table className="data-table" aria-label="Tabel Perbandingan Statistik Tiga Desa Jaten">
              <thead>
                <tr>
                  <th scope="col">Nama Desa</th>
                  <th scope="col">Luas (ha)</th>
                  <th scope="col">Laki-Laki</th>
                  <th scope="col">Perempuan</th>
                  <th scope="col">Total Penduduk</th>
                  <th scope="col">Dusun</th>
                  <th scope="col">RW</th>
                  <th scope="col">RT</th>
                  <th scope="col">Kepadatan (jiwa/km²)</th>
                </tr>
              </thead>
              <tbody>
                {villages.map((v) => (
                  <tr key={v.slug}>
                    <td>
                      <Link to={`/desa/${v.slug}`}>
                        <strong>Desa {v.name}</strong>
                      </Link>
                    </td>
                    <td>{v.areaHa?.value.toLocaleString("id-ID")}</td>
                    <td>{v.population?.value.male.toLocaleString("id-ID")}</td>
                    <td>{v.population?.value.female.toLocaleString("id-ID")}</td>
                    <td>
                      <strong>{v.population?.value.total.toLocaleString("id-ID")}</strong>
                    </td>
                    <td>{v.administration?.value.dusun}</td>
                    <td>{v.administration?.value.rw}</td>
                    <td>{v.administration?.value.rt}</td>
                    <td>{v.densityPerKm2?.value.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: "var(--color-primary-light)", fontWeight: 700 }}>
                  <td>
                    <span>{aggregateThreeVillages.label}</span>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-primary)", fontWeight: "normal" }}>
                      (Data 2024)
                    </div>
                  </td>
                  <td>{aggregateThreeVillages.areaHa.toLocaleString("id-ID")}</td>
                  <td>{aggregateThreeVillages.population.male.toLocaleString("id-ID")}</td>
                  <td>{aggregateThreeVillages.population.female.toLocaleString("id-ID")}</td>
                  <td>{aggregateThreeVillages.population.total.toLocaleString("id-ID")}</td>
                  <td>{aggregateThreeVillages.administration.dusun}</td>
                  <td>{aggregateThreeVillages.administration.rw}</td>
                  <td>{aggregateThreeVillages.administration.rt}</td>
                  <td>
                    {aggregateThreeVillages.areaHa > 0
                      ? Math.round(
                          aggregateThreeVillages.population.total / (aggregateThreeVillages.areaHa / 100)
                        ).toLocaleString("id-ID")
                      : "Tidak tersedia"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ fontSize: "0.82rem", color: "var(--color-text-subtle)", marginTop: "0.5rem" }}>
            <p>
              * <em>Catatan Metodologi:</em> Baris akumulasi merupakan hasil penjumlahan baris Desa Dagen, Ngringo, dan Sroyo berdasarkan publikasi BPS Kabupaten Karanganyar 2025. Angka ini bukan total Kecamatan Jaten karena kecamatan memiliki total 8 desa.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Section Profil & Konteks Wilayah (Section 9) */}
      <section id="konteks-wilayah" className="page-section-alt" aria-labelledby="section-konteks-title">
        <div className="container">
          <div className="profile-section">
            <div>
              <div className="section-header-left">
                <span className="information-badge" style={{ marginBottom: "0.5rem" }}>
                  Konteks Geografis & Administrasi
                </span>
                <h2 id="section-konteks-title">Wilayah Strategis di Koridor Solo–Karanganyar</h2>
                <p>
                  Kecamatan Jaten merupakan salah satu sentra penyangga utama Kabupaten Karanganyar yang berbatasan langsung dengan Kota Surakarta di sisi barat. Tiga desa yang menjadi cakupan website ini memiliki karakteristik bentang wilayah yang saling melengkapi:
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ background: "var(--color-surface)", padding: "1.15rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                  <h4 style={{ margin: "0 0 0.35rem 0", color: "var(--color-primary)" }}>
                    <Link to="/desa/dagen">Desa Dagen</Link>
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                    Kawasan perlintasan penting yang menghubungkan jalur Solo–Tawangmangu menuju jalur lingkar Sragen dengan perpaduan kawasan pemukiman dan pertanian.
                  </p>
                </div>

                <div style={{ background: "var(--color-surface)", padding: "1.15rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                  <h4 style={{ margin: "0 0 0.35rem 0", color: "var(--color-primary)" }}>
                    <Link to="/desa/ngringo">Desa Ngringo</Link>
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                    Pusat kepadatan penduduk tertinggi di Jaten (5.807 jiwa/km²) dengan 29 RW dan 178 RT, terletak tepat di gerbang timur batas Kota Surakarta.
                  </p>
                </div>

                <div style={{ background: "var(--color-surface)", padding: "1.15rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                  <h4 style={{ margin: "0 0 0.35rem 0", color: "var(--color-primary)" }}>
                    <Link to="/desa/sroyo">Desa Sroyo</Link>
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                    Desa terluas di antara ketiganya (459,78 ha) dengan pusat aktivitas industri manufaktur, perdagangan regional, dan sarana pendidikan.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link to="/desa/dagen" className="btn btn-primary">
                  Lihat Profil Desa Dagen →
                </Link>
                <Link to="/desa/ngringo" className="btn btn-secondary">
                  Desa Ngringo
                </Link>
                <Link to="/desa/sroyo" className="btn btn-secondary">
                  Desa Sroyo
                </Link>
              </div>
            </div>

            {/* Right Highlights Panel */}
            <div className="profile-highlights">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.85rem", color: "var(--color-primary)" }}>
                Ikhtisar Tiga Desa
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.88rem" }}>
                <li style={{ paddingBottom: "0.75rem", borderBottom: "1px solid var(--color-primary-border)" }}>
                  <span style={{ display: "block", color: "var(--color-text-subtle)", fontSize: "0.75rem", textTransform: "uppercase" }}>Induk Administratif</span>
                  <strong>Kecamatan Jaten, Kab. Karanganyar</strong>
                </li>
                <li style={{ paddingBottom: "0.75rem", borderBottom: "1px solid var(--color-primary-border)" }}>
                  <span style={{ display: "block", color: "var(--color-text-subtle)", fontSize: "0.75rem", textTransform: "uppercase" }}>Status Wilayah</span>
                  <strong>Desa (Bukan Kelurahan)</strong>
                </li>
                <li style={{ paddingBottom: "0.75rem", borderBottom: "1px solid var(--color-primary-border)" }}>
                  <span style={{ display: "block", color: "var(--color-text-subtle)", fontSize: "0.75rem", textTransform: "uppercase" }}>Fasilitas Kesehatan Utama</span>
                  <strong>UPT Puskesmas Jaten II (Ngringo)</strong>
                </li>
                <li>
                  <span style={{ display: "block", color: "var(--color-text-subtle)", fontSize: "0.75rem", textTransform: "uppercase" }}>Basis Data Rujukan</span>
                  <strong>BPS Karanganyar (Data 2024 / Terbit 2025)</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section Dokumen / Unduhan Rilis Data (Section 11) */}
      <section className="page-section" aria-labelledby="section-dokumen-title">
        <div className="container">
          <div className="section-header">
            <h2 id="section-dokumen-title">Dokumen & Sumber Data Rujukan</h2>
            <p>
              Diadaptasi dari pola rilis data portal pemerintah, menyajikan dokumen publik resmi yang menjadi dasar data website ini.
            </p>
          </div>

          <div className="source-card-grid" style={{ marginBottom: "2rem" }}>
            {featuredSources.map((source) => (
              <SourceCard key={source.id} source={source} status="verified" />
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/sumber" className="btn btn-secondary btn-lg">
              Lihat Seluruh Katalog Sumber Data (16+ Dokumen) →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Section Catatan Pembaruan Data (Section 10) */}
      <section id="pembaruan" className="page-section-alt" aria-labelledby="section-pembaruan-title">
        <div className="container">
          <div className="section-header">
            <h2 id="section-pembaruan-title">Catatan Pembaruan & Riwayat Kurasi Data</h2>
            <p>
              Transparansi verifikasi dokumen, pembaruan konten, dan riwayat penelusuran fakta wilayah.
            </p>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.25rem 1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <strong style={{ color: "var(--color-primary)" }}>Pembaruan Informasi: Layanan Administrasi Publik</strong>
                <span style={{ fontSize: "0.78rem", background: "var(--color-surface-soft)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-xs)" }}>
                  4 Oktober 2026
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                Penambahan alur pelayanan dokumen kependudukan tingkat kabupaten (Paklay Komplit Disdukcapil Karanganyar) dan integrasi standar pelayanan berjenjang Kecamatan Jaten untuk permohonan SKCK.
              </p>
            </div>

            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.25rem 1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <strong style={{ color: "var(--color-primary)" }}>Audit Statistik Wilayah BPS 2024 & Open Data</strong>
                <span style={{ fontSize: "0.78rem", background: "var(--color-surface-soft)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-xs)" }}>
                  2 Oktober 2026
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                Verifikasi komparatif data luas wilayah, penduduk gender, dusun, RW, dan RT dari publikasi <em>Kecamatan Jaten Dalam Angka 2025</em>. Pemisahan tegas antara arsip perangkat 2023 dengan data aktif.
              </p>
            </div>

            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.25rem 1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <strong style={{ color: "var(--color-primary)" }}>Catatan Penjabat Kepala Desa Ngringo</strong>
                <span style={{ fontSize: "0.78rem", background: "var(--color-surface-soft)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-xs)" }}>
                  16 September 2026
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                Perekaman pemberitaan media mengenai penunjukan Apri Linawati sebagai Pj Kepala Desa Ngringo untuk menghindari klaim sepihak terhadap dokumen perangkat desa 2023.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
