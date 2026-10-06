import React from "react";
import { Link } from "react-router-dom";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Tentang */}
            <div className="footer-col">
              <h4 className="footer-col-title">Tentang Proyek</h4>
              <p className="footer-description">
                <strong>Jaten — Profil Tiga Desa</strong> adalah proyek kurasi informasi akademik yang menyajikan profil wilayah, demografi penduduk 2024, kelembagaan desa, serta katalog dokumen sumber untuk Desa Dagen, Desa Ngringo, dan Desa Sroyo.
              </p>
              <div className="footer-disclaimer">
                <strong>Pemberitahuan:</strong> Website ini merupakan proyek tugas kuliah Sistem Terdistribusi dan <em>bukan kanal resmi</em> pemerintah desa maupun kabupaten. Tidak menyelenggarakan layanan administrasi perizinan warga daring.
              </div>
            </div>

            {/* Column 2: Navigasi Tiga Desa */}
            <div className="footer-col">
              <h4 className="footer-col-title">Profil Desa</h4>
              <ul>
                <li>
                  <Link to="/desa/dagen">Desa Dagen</Link>
                </li>
                <li>
                  <Link to="/desa/ngringo">Desa Ngringo</Link>
                </li>
                <li>
                  <Link to="/desa/sroyo">Desa Sroyo</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Informasi & Data */}
            <div className="footer-col">
              <h4 className="footer-col-title">Informasi & Rujukan</h4>
              <ul>
                <li>
                  <Link to="/sumber">Katalog Sumber Data</Link>
                </li>
                <li>
                  <Link to="/#statistik">Statistik Komparatif</Link>
                </li>
                <li>
                  <Link to="/#pembaruan">Catatan Pembaruan</Link>
                </li>
                <li>
                  <a
                    href="https://karanganyarkab.bps.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BPS Kab. Karanganyar ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://opendata.karanganyarkab.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Data Karanganyar ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Rujukan Induk */}
            <div className="footer-col">
              <h4 className="footer-col-title">Induk Wilayah</h4>
              <p style={{ fontSize: "0.85rem", color: "#9CB3A8", marginBottom: "0.5rem" }}>
                Kecamatan Jaten, Kabupaten Karanganyar, Jawa Tengah
              </p>
              <div style={{ fontSize: "0.8rem", color: "#C4D2CC", lineHeight: 1.6 }}>
                <div>Jl. Raya Jaten No. 85</div>
                <div>Telp: (0271) 821319</div>
                <div>Web: jaten.karanganyarkab.go.id</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div>
            Pembaruan Terakhir: 4 Oktober 2026 • Sumber Data: BPS Kabupaten Karanganyar 2024 (Rilis 2025)
          </div>
          <div>Proyek Akademik — Sistem Terdistribusi • Kecamatan Jaten</div>
        </div>
      </div>
    </footer>
  );
};
