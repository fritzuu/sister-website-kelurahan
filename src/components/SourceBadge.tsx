import React from "react";

interface SourceBadgeProps {
  status: "verified" | "needs-confirmation" | "historical";
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ status, className = "" }) => {
  switch (status) {
    case "verified":
      return (
        <span className={`source-badge source-badge-verified ${className}`}>
          ✓ Terverifikasi
        </span>
      );
    case "needs-confirmation":
      return null;
    case "historical":
      return (
        <span className={`source-badge source-badge-historical ${className}`}>
          ⏱ Data Historis
        </span>
      );
    default:
      return null;
  }
};
