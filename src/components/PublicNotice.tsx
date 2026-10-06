import React from "react";

interface PublicNoticeProps {
  type?: "academic" | "warning" | "info";
  children?: React.ReactNode;
}

export const PublicNotice: React.FC<PublicNoticeProps> = ({
  type = "academic",
  children
}) => {
  const isWarning = type === "warning";

  return (
    <div
      className={`public-notice ${isWarning ? "public-notice-warning" : ""}`}
      role="note"
      aria-label="Pemberitahuan Proyek Akademik"
    >
      {children || (
        <p>
          <strong>Catatan Akademik:</strong> Website ini merupakan luaran tugas proyek sistem terdistribusi untuk tujuan penyajian informasi profil wilayah. Website ini <em>bukan kanal layanan resmi</em> Pemerintah Desa dan tidak menyelenggarakan transaksi administrasi publik daring.
        </p>
      )}
    </div>
  );
};
