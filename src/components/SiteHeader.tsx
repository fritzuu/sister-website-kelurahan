import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MobileVillageSelect } from "./MobileVillageSelect";
import { PhoneIcon, MailIcon, CalendarIcon, ClockIcon } from "./Icons";

export const SiteHeader: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statsDropdownOpen, setStatsDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const location = useLocation();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const statsDropdownRef = useRef<HTMLLIElement>(null);

  // Live real-time clock in WIB format, matching government portal reference
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format time as HH:mm:ss
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds} WIB`);

      // Format date as DD-MM-YYYY
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      setCurrentDate(`${day}-${month}-${year}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (statsDropdownRef.current && !statsDropdownRef.current.contains(event.target as Node)) {
        setStatsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setStatsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const match = location.pathname.match(/^\/desa\/(.+)/);
  const currentSlug = match ? match[1] : undefined;

  return (
    <>
      {/* Top information bar — Ocean Blue matching kel-sondakan reference */}
      <div className="top-bar" role="banner">
        <div className="container">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <PhoneIcon size={14} color="#BAE6FD" />
              <span>(0271) 825123 (Kecamatan Jaten)</span>
            </span>
            <span className="top-bar-sep" aria-hidden="true" />
            <span className="top-bar-item">
              <MailIcon size={14} color="#BAE6FD" />
              <span>info@jaten-karanganyar.id</span>
            </span>
            <span className="top-bar-sep" aria-hidden="true" />
            <span className="top-bar-badge-academic">
              Proyek Informasi Akademik — Sistem Terdistribusi
            </span>
          </div>

          <div className="top-bar-right">
            <span className="top-bar-item">
              <CalendarIcon size={14} color="#BAE6FD" />
              <span>{currentDate || "05-10-2026"}</span>
            </span>
            <span className="top-bar-sep" aria-hidden="true" />
            <span className="top-bar-item" style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
              <ClockIcon size={14} color="#BAE6FD" />
              <span>{currentTime || "15:26:15 WIB"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main header with navigation and municipal emblem badges */}
      <header className="site-header">
        <div className="container">
          <div className="site-brand-group">
            <Link to="/" className="site-logo" aria-label="Beranda — Jaten: Profil Tiga Desa">
              <div className="site-brand-text">
                <span className="brand-sup">KECAMATAN JATEN</span>
                <span className="site-logo-title">Profil Tiga Desa</span>
                <span className="site-logo-subtitle">Kabupaten Karanganyar • Jawa Tengah</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Navigasi Utama">
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  Home
                </NavLink>
              </li>

              {/* Village Dropdown */}
              <li className="village-menu" ref={dropdownRef}>
                <button
                  type="button"
                  className={`village-dropdown-trigger ${currentSlug ? "active" : ""}`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Profil Desa ▾
                </button>
                {dropdownOpen && (
                  <ul className="village-dropdown-menu" role="menu">
                    <li role="none">
                      <Link
                        to="/desa/dagen"
                        role="menuitem"
                        className={`village-dropdown-item ${currentSlug === "dagen" ? "active" : ""}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="menu-bullet" style={{ backgroundColor: "#F59E0B" }} />
                        Desa Dagen
                      </Link>
                    </li>
                    <li role="none">
                      <Link
                        to="/desa/ngringo"
                        role="menuitem"
                        className={`village-dropdown-item ${currentSlug === "ngringo" ? "active" : ""}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="menu-bullet" style={{ backgroundColor: "#0284C7" }} />
                        Desa Ngringo
                      </Link>
                    </li>
                    <li role="none">
                      <Link
                        to="/desa/sroyo"
                        role="menuitem"
                        className={`village-dropdown-item ${currentSlug === "sroyo" ? "active" : ""}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="menu-bullet" style={{ backgroundColor: "#0D9488" }} />
                        Desa Sroyo
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Data & Statistik Menu */}
              <li className="village-menu" ref={statsDropdownRef}>
                <button
                  type="button"
                  className="village-dropdown-trigger"
                  aria-expanded={statsDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setStatsDropdownOpen(!statsDropdownOpen)}
                >
                  Statistik & Wilayah ▾
                </button>
                {statsDropdownOpen && (
                  <ul className="village-dropdown-menu" role="menu">
                    <li role="none">
                      <a
                        href="/#statistik"
                        role="menuitem"
                        className="village-dropdown-item"
                        onClick={() => setStatsDropdownOpen(false)}
                      >
                        Statistik Komparatif
                      </a>
                    </li>
                    <li role="none">
                      <a
                        href="/#konteks-wilayah"
                        role="menuitem"
                        className="village-dropdown-item"
                        onClick={() => setStatsDropdownOpen(false)}
                      >
                        Konteks Geografis
                      </a>
                    </li>
                    <li role="none">
                      <a
                        href="/#pembaruan"
                        role="menuitem"
                        className="village-dropdown-item"
                        onClick={() => setStatsDropdownOpen(false)}
                      >
                        Riwayat Pembaruan Data
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <NavLink
                  to="/sumber"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  Sumber Data
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Mobile Selector */}
          <MobileVillageSelect currentSlug={currentSlug} />
        </div>
      </header>
    </>
  );
};
