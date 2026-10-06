import React from "react";
import type { ServiceInfo } from "../types/village";
import { ServiceLevelBadge } from "./ServiceLevelBadge";
import { SourceNote } from "./SourceNote";
import { CheckIcon, FileTextIcon } from "./Icons";

interface ServiceCardProps {
  service: ServiceInfo;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <article className="service-card" aria-labelledby={`service-${service.id}`}>
      <div className="service-header">
        <div className="service-icon-wrap">
          <FileTextIcon size={20} color="var(--color-primary)" />
        </div>
        <div className="service-heading-wrap">
          <div className="service-badge-row">
            <ServiceLevelBadge level={service.level} />
          </div>
          <h4 id={`service-${service.id}`} className="service-title">
            {service.title}
          </h4>
        </div>
      </div>

      <p className="service-summary">{service.summary}</p>

      {service.requirements && service.requirements.length > 0 && (
        <div className="service-requirements">
          <div className="service-requirements-title">
            Persyaratan Berkas Dokumen:
          </div>
          <ul className="service-req-list">
            {service.requirements.map((req, idx) => (
              <li key={idx} className="service-req-item">
                <span className="service-req-check">
                  <CheckIcon size={12} color="#0284c7" />
                </span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="service-footer">
        <SourceNote sourceIds={service.sourceIds} asOf={service.sourceDate} />
      </div>
    </article>
  );
};
