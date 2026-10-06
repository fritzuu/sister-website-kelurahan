import React from "react";
import { AwardIcon, UsersIcon, ShieldCheckIcon, MapPinIcon } from "./Icons";

interface OrgNode {
  title: string;
  reportsTo?: string;
}

interface OrganizationTreeProps {
  nodes: OrgNode[];
  sourceNote?: React.ReactNode;
}

export const OrganizationTree: React.FC<OrganizationTreeProps> = ({ nodes, sourceNote }) => {
  if (!nodes || nodes.length === 0) return null;

  // Classify tiers for a clean, intuitive organizational breakdown
  const headNode = nodes.find((n) => !n.reportsTo || n.title.toLowerCase().includes("kepala desa"));
  const secretarialNodes = nodes.filter(
    (n) => n !== headNode && (n.title.toLowerCase().includes("sekretar") || n.title.toLowerCase().includes("kaur"))
  );
  const technicalNodes = nodes.filter(
    (n) => n !== headNode && !secretarialNodes.includes(n) && (n.title.toLowerCase().includes("kasi") || n.title.toLowerCase().includes("teknis"))
  );
  const territorialNodes = nodes.filter(
    (n) => n !== headNode && !secretarialNodes.includes(n) && !technicalNodes.includes(n)
  );

  return (
    <div className="org-hierarchy-wrapper" aria-label="Bagan Struktur Organisasi Pemerintah Desa">
      {/* 1. Executive Tier: Kepala Desa */}
      {headNode && (
        <div className="org-tier org-tier-executive">
          <div className="org-card org-card-head">
            <div className="org-card-badge">
              <AwardIcon size={16} color="#BAE6FD" />
              PIMPINAN DESA
            </div>
            <div className="org-card-title">{headNode.title}</div>
            <div className="org-card-sub">Penanggung Jawab Utama Pemerintahan & Wilayah</div>
          </div>
          <div className="org-connector-down" />
        </div>
      )}

      {/* 2. Operational Tiers Grid */}
      <div className="org-tiers-grid">
        {/* Sekretariat Desa */}
        {secretarialNodes.length > 0 && (
          <div className="org-column-card">
            <div className="org-column-header">
              <UsersIcon size={18} color="var(--color-primary)" />
              <div>
                <h4 className="org-column-title">Sekretariat Desa</h4>
                <span className="org-column-sub">Unsur Staf & Administrasi</span>
              </div>
            </div>
            <div className="org-items-list">
              {secretarialNodes.map((node, idx) => (
                <div key={idx} className="org-item">
                  <span className="org-item-bullet" />
                  <span className="org-item-text">{node.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pelaksana Teknis */}
        {technicalNodes.length > 0 && (
          <div className="org-column-card">
            <div className="org-column-header">
              <ShieldCheckIcon size={18} color="var(--color-primary)" />
              <div>
                <h4 className="org-column-title">Pelaksana Teknis</h4>
                <span className="org-column-sub">Seksi Pelayanan & Program</span>
              </div>
            </div>
            <div className="org-items-list">
              {technicalNodes.map((node, idx) => (
                <div key={idx} className="org-item">
                  <span className="org-item-bullet" />
                  <span className="org-item-text">{node.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pelaksana Kewilayahan */}
        {territorialNodes.length > 0 && (
          <div className="org-column-card">
            <div className="org-column-header">
              <MapPinIcon size={18} color="var(--color-primary)" />
              <div>
                <h4 className="org-column-title">Pelaksana Kewilayahan</h4>
                <span className="org-column-sub">Kepala Dusun / Kebayanan</span>
              </div>
            </div>
            <div className="org-items-list">
              {territorialNodes.map((node, idx) => (
                <div key={idx} className="org-item">
                  <span className="org-item-bullet" />
                  <span className="org-item-text">{node.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {sourceNote && <div className="org-source-wrap">{sourceNote}</div>}
    </div>
  );
};
