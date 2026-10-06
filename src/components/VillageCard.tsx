import React from "react";
import { Link } from "react-router-dom";
import type { Village } from "../types/village";
import { getVillageImage } from "../utils/villageImages";
import { LoadingImage } from "./Loading";

interface VillageCardProps {
  village: Village;
}

export const VillageCard: React.FC<VillageCardProps> = ({ village }) => {
  const populationTotal = village.population?.value.total;
  const areaHa = village.areaHa?.value;
  const dataYear = village.population?.asOf || "2024";
  const bgImage = getVillageImage(village.slug);

  return (
    <article className="village-card" aria-labelledby={`title-${village.slug}`}>
      <div className="village-card-top">
        <LoadingImage key={bgImage} className="village-card-photo" src={bgImage} />
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
              {areaHa !== undefined ? `${areaHa.toLocaleString("id-ID")} ha` : "Tidak tersedia"}
            </div>
            <div className="card-metric-year">BPS {village.areaHa?.asOf || dataYear}</div>
          </div>
          <div className="card-metric">
            <div className="card-metric-label">Penduduk</div>
            <div className="card-metric-value">
              {populationTotal !== undefined ? populationTotal.toLocaleString("id-ID") : "Tidak tersedia"}
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
