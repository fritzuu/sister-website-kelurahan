import React from "react";
import { useNavigate } from "react-router-dom";

interface MobileVillageSelectProps {
  currentSlug?: string;
}

export const MobileVillageSelect: React.FC<MobileVillageSelectProps> = ({ currentSlug }) => {
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      navigate(`/desa/${val}`);
    }
  };

  return (
    <div className="mobile-nav-container">
      <label htmlFor="mobile-village-selector" className="sr-only">
        Pilih Desa
      </label>
      <select
        id="mobile-village-selector"
        className="mobile-select"
        value={currentSlug || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Pilih Desa...
        </option>
        <option value="dagen">Desa Dagen</option>
        <option value="ngringo">Desa Ngringo</option>
        <option value="sroyo">Desa Sroyo</option>
      </select>
    </div>
  );
};
