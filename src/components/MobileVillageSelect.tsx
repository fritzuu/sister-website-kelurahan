import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface MobileVillageSelectProps {
  currentSlug?: string;
}

export const MobileVillageSelect: React.FC<MobileVillageSelectProps> = ({ currentSlug }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = currentSlug ? `/desa/${currentSlug}` : location.pathname;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      navigate(val);
    }
  };

  return (
    <div className="mobile-nav-container">
      <label htmlFor="mobile-village-selector" className="sr-only">
        Navigasi Halaman
      </label>
      <select
        id="mobile-village-selector"
        className="mobile-select"
        value={["/", "/sumber", "/desa/dagen", "/desa/ngringo", "/desa/sroyo"].includes(currentPage) ? currentPage : ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Pilih Halaman...
        </option>
        <option value="/">Beranda</option>
        <option value="/#peta-desa">Peta Tiga Desa</option>
        <option value="/#statistik">Statistik Wilayah</option>
        <option value="/desa/dagen">Desa Dagen</option>
        <option value="/desa/ngringo">Desa Ngringo</option>
        <option value="/desa/sroyo">Desa Sroyo</option>
        <option value="/sumber">Sumber Data</option>
      </select>
    </div>
  );
};
