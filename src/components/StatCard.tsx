import React from "react";
import { SourceNote } from "./SourceNote";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  asOf?: string;
  sourceIds?: string[];
  status?: "verified" | "needs-confirmation" | "historical";
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "accent";
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  asOf,
  sourceIds,
  icon,
  variant = "default"
}) => {
  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        {icon && <div className="stat-card-icon-wrap">{icon}</div>}
      </div>
      <div className="stat-card-value">
        {value}
        {unit && <span className="stat-card-unit">{unit}</span>}
      </div>
      <div className="stat-card-meta">
        {sourceIds && <SourceNote sourceIds={sourceIds} asOf={asOf} />}
      </div>
    </div>
  );
};
