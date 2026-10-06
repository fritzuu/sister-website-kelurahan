import React from "react";
import { Link } from "react-router-dom";
import { getSourceById } from "../content/sources";

interface SourceNoteProps {
  sourceIds?: string[];
  asOf?: string;
  className?: string;
}

export const SourceNote: React.FC<SourceNoteProps> = ({ sourceIds, asOf, className = "" }) => {
  if (!sourceIds || sourceIds.length === 0) {
    if (asOf) {
      return <div className={`source-note ${className}`}>Tahun data: {asOf}</div>;
    }
    return null;
  }

  const primarySource = getSourceById(sourceIds[0]);

  return (
    <div className={`source-note ${className}`}>
      {asOf && <span>Tahun {asOf} • </span>}
      {primarySource ? (
        <span>
          Sumber:{" "}
          <Link to={`/sumber#${primarySource.id}`} title={primarySource.title}>
            {primarySource.publisher}
          </Link>
        </span>
      ) : (
        <span>
          <Link to="/sumber">Lihat rujukan sumber</Link>
        </span>
      )}
    </div>
  );
};
