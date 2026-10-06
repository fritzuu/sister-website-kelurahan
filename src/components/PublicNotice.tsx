import React from "react";

interface PublicNoticeProps {
  type?: "warning" | "info";
  children?: React.ReactNode;
}

export const PublicNotice: React.FC<PublicNoticeProps> = ({
  type = "info",
  children
}) => {
  const isWarning = type === "warning";
  if (!children) return null;

  return (
    <div
      className={`public-notice ${isWarning ? "public-notice-warning" : ""}`}
      role="note"
      aria-label="Informasi Layanan"
    >
      {children}
    </div>
  );
};
