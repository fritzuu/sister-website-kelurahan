import React from "react";
import { SourceNote } from "./SourceNote";
import { MapPinIcon, PhoneIcon, MailIcon, ExternalLinkIcon, BuildingIcon } from "./Icons";

interface ContactData {
  address?: string;
  publicPhone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  mapUrl?: string;
}

interface ContactCardProps {
  contact?: ContactData;
  sourceIds?: string[];
  status?: "verified" | "needs-confirmation" | "historical";
  villageName: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  sourceIds,
  villageName
}) => {
  if (!contact || (!contact.address && !contact.publicPhone && !contact.email && !contact.website)) {
    return (
      <div className="contact-card contact-card-pending">
        <div className="contact-card-header-clean">
          <div className="contact-card-icon-main">
            <BuildingIcon size={22} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="contact-card-title">Kantor Pemerintah Desa {villageName}</h3>
            <span className="contact-card-sub">Pusat Administrasi & Pelayanan Warga</span>
          </div>
        </div>
        <div className="contact-pending-body">
          <p className="contact-pending-desc">
            Informasi alamat surat elektronik dan saluran telepon langsung Kantor Desa {villageName} belum dipublikasikan secara terbuka dalam arsip digital rujukan.
          </p>
          <div className="contact-pending-action">
            <span className="contact-pending-tip">Rujukan Layanan Berjenjang:</span>
            <p className="contact-pending-action-text">
              Warga dapat mengurus administrasi langsung di Balai Desa {villageName} pada jam kerja, atau melalui koordinasi Kantor Kecamatan Jaten.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-card">
      <div className="contact-card-header-clean">
        <div className="contact-card-icon-main">
          <BuildingIcon size={22} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="contact-card-title">Kantor Pemerintah Desa {villageName}</h3>
          <span className="contact-card-sub">Pusat Administrasi & Pelayanan Warga</span>
        </div>
      </div>

      <div className="contact-grid-items">
        {contact.address && (
          <div className="contact-tile">
            <div className="contact-tile-icon">
              <MapPinIcon size={18} color="var(--color-primary)" />
            </div>
            <div className="contact-tile-content">
              <span className="contact-tile-label">Alamat Kantor</span>
              <span className="contact-tile-value">{contact.address}</span>
            </div>
          </div>
        )}

        {contact.publicPhone && (
          <div className="contact-tile">
            <div className="contact-tile-icon">
              <PhoneIcon size={18} color="var(--color-primary)" />
            </div>
            <div className="contact-tile-content">
              <span className="contact-tile-label">Telepon Publik</span>
              <a href={`tel:${contact.publicPhone}`} className="contact-tile-link">
                {contact.publicPhone}
              </a>
            </div>
          </div>
        )}

        {contact.email && (
          <div className="contact-tile">
            <div className="contact-tile-icon">
              <MailIcon size={18} color="var(--color-primary)" />
            </div>
            <div className="contact-tile-content">
              <span className="contact-tile-label">Surat Elektronik (Email)</span>
              <a href={`mailto:${contact.email}`} className="contact-tile-link">
                {contact.email}
              </a>
            </div>
          </div>
        )}

        {contact.website && (
          <div className="contact-tile">
            <div className="contact-tile-icon">
              <ExternalLinkIcon size={18} color="var(--color-primary)" />
            </div>
            <div className="contact-tile-content">
              <span className="contact-tile-label">Portal Resmi Desa</span>
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="contact-tile-link">
                {contact.website.replace("https://", "")} ↗
              </a>
            </div>
          </div>
        )}
      </div>

      {sourceIds && (
        <div className="contact-card-footer">
          <SourceNote sourceIds={sourceIds} />
        </div>
      )}
    </div>
  );
};
