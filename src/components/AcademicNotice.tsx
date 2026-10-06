import { useEffect, useRef, useState } from "react";
import "../styles/notice.css";

const noticeKey = "jaten-kelompok-2-notice";

export function AcademicNotice() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem(noticeKey) !== "dismissed"; }
    catch { return true; }
  });

  useEffect(() => {
    if (!visible) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>(".academic-notice-continue")?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  function dismiss() {
    try { sessionStorage.setItem(noticeKey, "dismissed"); } catch { /* Dismiss still works without storage. */ }
    dialogRef.current?.close();
    setVisible(false);
    document.getElementById("hero-title")?.focus({ preventScroll: true });
  }

  if (!visible) return null;
  return (
    <dialog ref={dialogRef} className="academic-notice-dialog" aria-labelledby="academic-notice-title"
      aria-describedby="academic-notice-description" onCancel={(event) => { event.preventDefault(); dismiss(); }}>
      <button type="button" className="academic-notice-close" aria-label="Tutup informasi" onClick={dismiss}>×</button>
      <span className="academic-notice-label">Informasi Website</span>
      <h2 id="academic-notice-title">Sistem Terdistribusi</h2>
      <span className="academic-notice-group">Kelompok 2</span>
      <p id="academic-notice-description">Website ini dibuat sebagai tugas mata kuliah Sistem Terdistribusi oleh Kelompok 2.</p>
      <p className="academic-notice-detail">Informasi profil, statistik, dan lokasi Desa Dagen, Ngringo, serta Sroyo di Kecamatan Jaten.</p>
      <button type="button" className="btn btn-primary academic-notice-continue" autoFocus onClick={dismiss}>Mengerti, lanjutkan</button>
    </dialog>
  );
}
