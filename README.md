# Jaten — Atlas Tiga Desa

Website informasi Dagen, Ngringo, dan Sroyo untuk proyek akademik Sistem Terdistribusi. React, TypeScript, Vite, Tailwind CSS, GSAP/ScrollTrigger, Motion, React Router, dan Lucide.

## Menjalankan lokal

```sh
npm install
npm run dev
```

Buka alamat yang dicetak Vite (biasanya http://127.0.0.1:5173).

```sh
npm run build
npm run preview
```

Build produksi ada di `dist/`. Untuk hosting statis, gunakan fallback seluruh rute ke `index.html`. Berkas `public/_redirects` menyediakan fallback untuk Netlify; konfigurasi yang setara diperlukan pada host lain. Tidak ada deployment atau push otomatis.

## Konsep dan interaksi

Atlas editorial dengan warna kertas, hijau hutan, vermilion, serta ilustrasi lanskap SVG orisinal. Ilustrasi bukan foto, peta geografis, atau klaim tentang bentang alam desa sebenarnya. Entrance, parallax, dan storytelling dengan ilustrasi sticky serta pergantian angka saat scroll menggunakan GSAP; transisi route, batang perbandingan, dan komponen memakai Motion. Reduced motion didukung. Font Google Fonts memiliki fallback lokal apabila koneksi tidak tersedia.

Rute: `/`, `/desa/dagen`, `/desa/ngringo`, `/desa/sroyo`, `/sumber`. Fitur: perbandingan lima metrik, pemilihan desa, tabel angka, demografi, navigasi bagian profil, dokumen arsip, filter sumber, dan dialog sumber dengan fokus native.

## Konten

Edit `src/content/villages.ts`. Statistik mengikuti inventaris pada `PRD-website-desa-jaten.md`: BPS, data 2024, publikasi 2025. Angka agregat mencakup tiga desa saja. Registry sumber menyimpan penerbit, tahun, cakupan, dan keterbatasan. Persentase penduduk dihitung dari angka laki-laki/perempuan; ringkasan editorial merupakan perbandingan data yang tersedia.

Dokumen pemerintah ditawarkan sebagai rujukan arsip, bukan keterangan pejabat atau kebijakan aktif. Isi dokumen eksternal dan ketersediaan tautan belum seluruhnya diverifikasi ulang. Kontak, nama pejabat, bagan organisasi, layanan, sejarah, dan potensi yang belum tervalidasi tidak dikarang. Tambahkan setelah sumbernya diperiksa.

Belum ada backend, akun, pengumpulan data warga, atau CMS. Dokumen PRD dan file tugas lokal tetap dipertahankan.

## Pemeriksaan

Build TypeScript dan produksi berhasil. Pemeriksaan browser dilakukan pada desktop serta viewport 360 px: semua profil desa, menu mobile, jangkar lintas halaman, pergantian metrik, pemilihan desa (minimum satu), tabel, filter sumber, dialog sumber, Escape dan pemulihan fokus, serta halaman 404. Tidak ditemukan overflow halaman pada viewport yang diperiksa atau error konsol saat pengujian. Dukungan reduced motion diimplementasikan melalui Motion, GSAP, dan CSS; pengaturan OS tidak diubah dalam pemeriksaan.

Preview visual tersimpan di `output/jaten-desktop.jpg`, `output/jaten-mobile.jpg`, dan `output/jaten-story.jpg`.
