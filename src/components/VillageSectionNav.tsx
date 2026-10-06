import React from "react";
import {
  BuildingIcon,
  MapPinIcon,
  UsersIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  PhoneIcon,
  FileTextIcon
} from "./Icons";

interface VillageSectionNavProps {
  hasProfile?: boolean;
  hasTerritory?: boolean;
  hasGovernment?: boolean;
  hasServices?: boolean;
  hasPublicInfo?: boolean;
  hasContact?: boolean;
}

export const VillageSectionNav: React.FC<VillageSectionNavProps> = ({
  hasProfile = true,
  hasTerritory = true,
  hasGovernment = true,
  hasServices = true,
  hasPublicInfo = true,
  hasContact = true
}) => {
  return (
    <nav className="village-section-nav" aria-label="Navigasi Bagian Halaman Desa">
      <div className="container">
        <ul className="section-nav-list">
          {hasProfile && (
            <li>
              <a href="#profil" className="section-nav-link">
                <BuildingIcon size={15} />
                <span>Profil & Sejarah</span>
              </a>
            </li>
          )}
          {hasTerritory && (
            <li>
              <a href="#wilayah" className="section-nav-link">
                <MapPinIcon size={15} />
                <span>Wilayah & Demografi</span>
              </a>
            </li>
          )}
          {hasGovernment && (
            <li>
              <a href="#pemerintahan" className="section-nav-link">
                <UsersIcon size={15} />
                <span>Pemerintahan</span>
              </a>
            </li>
          )}
          {hasServices && (
            <li>
              <a href="#layanan" className="section-nav-link">
                <ShieldCheckIcon size={15} />
                <span>Layanan Publik</span>
              </a>
            </li>
          )}
          {hasPublicInfo && (
            <li>
              <a href="#potensi" className="section-nav-link">
                <ChartBarIcon size={15} />
                <span>Fasilitas & Potensi</span>
              </a>
            </li>
          )}
          {hasContact && (
            <li>
              <a href="#kontak" className="section-nav-link">
                <PhoneIcon size={15} />
                <span>Kontak Kantor</span>
              </a>
            </li>
          )}
          <li>
            <a href="#peta-kantor" className="section-nav-link">
              <MapPinIcon size={15} />
              <span>Peta Pelayanan</span>
            </a>
          </li>
          <li>
            <a href="#sumber-halaman" className="section-nav-link">
              <FileTextIcon size={15} />
              <span>Rujukan Dokumen</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
