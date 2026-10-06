import React from "react";
import type { Source } from "../types/village";
import { SourceBadge } from "./SourceBadge";
import { FileTextIcon, ExternalLinkIcon } from "./Icons";
import { getSourceLinkLabel } from "../utils/sourceLinks";

interface SourceCardProps {
  source: Source;
  status?: "verified" | "needs-confirmation" | "historical";
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, status = "verified" }) => {
  const displayYear = source.dataYear || (source.publishedAt ? source.publishedAt.slice(0, 4) : undefined);

  return (
    <article className="source-card" aria-labelledby={`src-title-${source.id}`}>
      <div className="source-card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FileTextIcon size={18} color="var(--color-primary)" />
          <span className="source-card-year">{displayYear ? `Tahun ${displayYear}` : "Rujukan Informasi"}</span>
        </div>
        <SourceBadge status={status} />
      </div>

      <h4 id={`src-title-${source.id}`} className="source-card-title">
        {source.title}
      </h4>

      <div className="source-card-publisher">
        Penerbit: <strong>{source.publisher}</strong>
      </div>

      <p className="source-card-scope">
        {source.scope}
      </p>

      {source.note && (
        <div style={{ fontSize: "0.78rem", color: "var(--color-text-subtle)", fontStyle: "italic", marginBottom: "0.75rem" }}>
          * {source.note}
        </div>
      )}

      <div className="source-card-footer">
        <span style={{ fontSize: "0.72rem", color: "var(--color-text-subtle)" }}>
          Diperiksa: {source.accessedAt}
        </span>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          aria-label={`${getSourceLinkLabel(source)}: ${source.title}`}
        >
          {getSourceLinkLabel(source)}
          <ExternalLinkIcon size={13} />
        </a>
      </div>
    </article>
  );
};
