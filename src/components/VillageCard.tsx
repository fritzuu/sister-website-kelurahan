import React from "react";
import { Link } from "react-router-dom";
import type { Village } from "../types/village";

interface VillageCardProps {
  village: Village;
}

const villageImages: Record<string, string> = {
  dagen: "/images/Kantor-desa-dagen-jaten-karanganyar.jpg",
  ngringo: "/images/Kantor-desa-ngringo-jaten-karanganyar.jpg",
  sroyo: "/images/Kantor-desa-sroyo-jaten-karanganyar.jpg",
};

export const VillageCard: React.FC<VillageCardProps> = ({ village }) => {
  const populationTotal = village.population?.value.total;
  const areaHa = village.areaHa?.value;
  const dataYear = village.population?.asOf || "2024";
  const bgImage = villageImages[village.slug] || "/images/balai_desa_hero.jpg";

  return (
    <article className="village-card" aria-labelledby={`title-${village.slug}`}>
      <div
        className="village-card-top"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(7, 31, 54, 0.94) 0%, rgba(7, 31, 54, 0.45) 55%, rgba(7, 31, 54, 0.2) 100%), url('${bgImage}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="village-card-header">
          <span className="village-card-badge">Desa • Kecamatan Jaten</span>
          <h3 id={`title-${village.slug}`} className="village-card-title">
            {village.name}
          </h3>
        </div>
      </div>

      <div className="village-card-body">
        <p className="village-card-summary">
          {village.summary?.value || `Profil dan data wilayah Desa ${village.name}, Kecamatan Jaten, Kabupaten Karanganyar.`}
        </p>

        <div className="village-card-metrics">
          <div className="card-metric">
            <div className="card-metric-label">Luas Wilayah</div>
            <div className="card-metric-value">
              {areaHa !== undefined ? `${areaHa.toLocaleString("id-ID")} ha` : "—"}
            </div>
            <div className="card-metric-year">BPS {village.areaHa?.asOf || dataYear}</div>
          </div>
          <div className="card-metric">
            <div className="card-metric-label">Penduduk</div>
            <div className="card-metric-value">
              {populationTotal !== undefined ? populationTotal.toLocaleString("id-ID") : "—"}
            </div>
            <div className="card-metric-year">BPS {dataYear}</div>
          </div>
        </div>

        <div className="village-card-action">
          <Link
            to={`/desa/${village.slug}`}
            className="btn btn-primary"
            style={{ width: "100%" }}
            aria-label={`Lihat profil lengkap Desa ${village.name}`}
          >
            Lihat Profil →
          </Link>
        </div>
      </div>
    </article>
  );
};
