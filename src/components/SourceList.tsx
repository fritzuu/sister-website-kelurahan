import React from "react";
import { getSourceById } from "../content/sources";

interface SourceListProps {
  sourceIds: string[];
}

export const SourceList: React.FC<SourceListProps> = ({ sourceIds }) => {
  const uniqueSourceIds = Array.from(new Set(sourceIds));
  const sources = uniqueSourceIds
    .map((id) => getSourceById(id))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  if (sources.length === 0) return null;

  return (
    <div className="table-wrapper">
      <table className="data-table" aria-label="Daftar Rujukan Sumber Data Halaman">
        <thead>
          <tr>
            <th scope="col">Nama Dokumen / Sumber</th>
            <th scope="col">Penerbit</th>
            <th scope="col">Tahun Data</th>
            <th scope="col">Cakupan Informasi</th>
            <th scope="col">Tautan</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((src) => (
            <tr key={src.id} id={src.id}>
              <td>
                <strong>{src.title}</strong>
                {src.note && (
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", marginTop: "0.2rem" }}>
                    Catatan: {src.note}
                  </div>
                )}
              </td>
              <td>{src.publisher}</td>
              <td>{src.dataYear ? src.dataYear : src.publishedAt ? src.publishedAt.slice(0, 4) : "—"}</td>
              <td style={{ fontSize: "0.85rem" }}>{src.scope}</td>
              <td>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: "0.3rem 0.65rem", fontSize: "0.8rem" }}
                  aria-label={`Buka dokumen rujukan: ${src.title}`}
                >
                  Buka Dokumen ↗
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
