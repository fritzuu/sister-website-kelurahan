import React from "react";

interface ServiceLevelBadgeProps {
  level: "kabupaten" | "kecamatan" | "desa";
}

export const ServiceLevelBadge: React.FC<ServiceLevelBadgeProps> = ({ level }) => {
  const labels: Record<string, string> = {
    kabupaten: "Ketentuan Kabupaten Karanganyar",
    kecamatan: "Layanan Berjenjang Kecamatan Jaten",
    desa: "Layanan Tingkat Desa"
  };

  return (
    <span className={`service-level-badge service-level-${level}`}>
      {labels[level] || labels.desa}
    </span>
  );
};
