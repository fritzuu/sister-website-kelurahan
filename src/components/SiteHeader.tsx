import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MobileVillageSelect } from "./MobileVillageSelect";
import { PhoneIcon, MailIcon, CalendarIcon, ClockIcon } from "./Icons";
import { districtContact } from "../content/site";

export const SiteHeader: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statsDropdownOpen, setStatsDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const location = useLocation();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const statsDropdownRef = useRef<HTMLLIElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const statsDropdownButtonRef = useRef<HTMLButtonElement>(null);

  // Live real-time clock in WIB format, matching government portal reference
  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(`${timeFormatter.format(now)} WIB`);
      setCurrentDate(dateFormatter.format(now).replaceAll("/", "-"));
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
        if (dropdownRef.current?.contains(document.activeElement)) {
          dropdownButtonRef.current?.focus();
        } else if (statsDropdownRef.current?.contains(document.activeElement)) {
          statsDropdownButtonRef.current?.focus();
        }
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
      {/* Top information bar: Ocean Blue matching kel-sondakan reference */}
      <div className="top-bar" role="banner">
        <div className="container">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <PhoneIcon size={14} color="#BAE6FD" />
              <span>{districtContact.phone} (Kecamatan Jaten)</span>
            </span>
            <span className="top-bar-sep" aria-hidden="true" />
            <span className="top-bar-item">
              <MailIcon size={14} color="#BAE6FD" />
              <a href={districtContact.website} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Website Kecamatan Jaten</a>
            </span>
          </div>

          <div className="top-bar-right">
            <span className="top-bar-item">
              <CalendarIcon size={14} color="#BAE6FD" />
              <span>{currentDate || "Tidak tersedia"}</span>
            </span>
            <span className="top-bar-sep" aria-hidden="true" />
            <span className="top-bar-item" style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
              <ClockIcon size={14} color="#BAE6FD" />
              <span>{currentTime || "Memuat waktu"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main header with navigation and municipal emblem badges */}
      <header className="site-header">
        <div className="container">
          <div className="site-brand-group">
            <Link to="/" className="site-logo" aria-label="Beranda: Jaten: Profil Tiga Desa">
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
                  ref={dropdownButtonRef}
                  className={`village-dropdown-trigger ${currentSlug ? "active" : ""}`}
                  aria-expanded={dropdownOpen}
                  aria-controls={dropdownOpen ? "village-navigation" : undefined}
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setStatsDropdownOpen(false);
                  }}
                >
                  Profil Desa ▾
                </button>
                {dropdownOpen && (
                  <ul id="village-navigation" className="village-dropdown-menu">
                    <li>
                      <Link
                        to="/desa/dagen"
                        className={`village-dropdown-item ${currentSlug === "dagen" ? "active" : ""}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="menu-bullet" style={{ backgroundColor: "#F59E0B" }} />
                        Desa Dagen
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/desa/ngringo"
                        className={`village-dropdown-item ${currentSlug === "ngringo" ? "active" : ""}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="menu-bullet" style={{ backgroundColor: "#0284C7" }} />
                        Desa Ngringo
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/desa/sroyo"
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
                  ref={statsDropdownButtonRef}
                  className="village-dropdown-trigger"
                  aria-expanded={statsDropdownOpen}
                  aria-controls={statsDropdownOpen ? "statistics-navigation" : undefined}
                  onClick={() => {
                    setStatsDropdownOpen(!statsDropdownOpen);
                    setDropdownOpen(false);
                  }}
                >
                  Statistik & Wilayah ▾
                </button>
                {statsDropdownOpen && (
                  <ul id="statistics-navigation" className="village-dropdown-menu">
                    <li>
                      <Link
                        to="/#statistik"
                        className="village-dropdown-item"
                        onClick={() => setStatsDropdownOpen(false)}
                      >
                        Statistik Komparatif
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/#konteks-wilayah"
                        className="village-dropdown-item"
                        onClick={() => setStatsDropdownOpen(false)}
                      >
                        Konteks Geografis
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/#peta-desa"
                        className="village-dropdown-item"
                        onClick={() => setStatsDropdownOpen(false)}
                      >
                        Peta Tiga Desa
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/#pembaruan"
                        className="village-dropdown-item"
                        onClick={() => setStatsDropdownOpen(false)}
                      >
                        Riwayat Pembaruan Data
                      </Link>
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
