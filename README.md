# Jaten — Atlas Tiga Desa

Website informasi Dagen, Ngringo, dan Sroyo untuk proyek akademik Sistem Terdistribusi. React, TypeScript, Vite, Tailwind CSS, GSAP/ScrollTrigger, Motion, React Router, Lucide, dan Leaflet.

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

## Peta desa

Peta interaktif tersedia di `/#peta` dan pada setiap profil (`/desa/sroyo#peta`, misalnya). Pilihan desa dan pin memperbarui fokus peta serta tautan profil/Google Maps. Ada kontrol zoom, skala, reset ke tiga desa, dan atribusi OpenStreetMap. Zoom lewat roda mouse dinonaktifkan agar tidak mengganggu scroll halaman. Library peta dimuat secara dinamis saat bagian mendekati viewport.

Koordinat di `src/content/locations.ts` adalah titik referensi gazetteer dari Mapcarta/OpenStreetMap/GeoNames yang diperiksa 5 Oktober 2026. Titik tidak menyatakan lokasi kantor, pusat geometris, atau batas resmi desa. Semua sumber lokasi juga tercatat pada indeks Sumber Data.

Peta dasar memakai layanan tile OpenStreetMap dan memerlukan internet. URL provider dapat diganti di `tileProvider`; pertahankan atribusi dan ikuti kebijakan tile penerbit. Tidak ada geolokasi pengguna, API key, geocoding saat runtime, atau unduhan tile untuk offline. Kegagalan jaringan menyediakan tautan Google Maps.

Pemeriksaan tambahan: tile dan tiga marker termuat di desktop, pilihan desa mengubah detail, kontrol zoom dan reset bekerja, peta profil Sroyo memilih desa yang tepat, serta halaman tetap selebar viewport 360 px.

### Eksplorasi potensi lokal

Bagian `#potensi` di bawah peta menampilkan delapan pilihan editorial bersumber: enam nama UMKM, Guntur Laras (karawitan Sroyo, publikasi 2025), dan catatan ProKlim Madya Ngringo tahun 2019. Data ada di `src/content/explore.ts` dan sumber terdaftar dalam indeks kategori **Potensi**. Filter desa mengikuti pilihan peta, disertai filter kategori, pencarian nama/alamat, reset, dan keadaan tanpa hasil. Detail sumber menggunakan dialog yang sama dengan statistik.

Nama dan alamat UMKM diambil dari [direktori Diskuktransesdm](https://diskuktransesdm.karanganyarkab.go.id/umkm-binaan/), baris 165, 209, 229, 240, 256, dan 305. Catatan lingkungan dari [DLH Karanganyar](https://dlh.karanganyarkab.go.id/kampung-iklim/); budaya dari [Peta Potensi Investasi Karanganyar 2025](https://opendata.karanganyarkab.go.id/dataset/0da9d288-37d3-46a0-ba2e-72219c3ab276/resource/583be1bd-b3ed-4d21-bdf6-8b53bc1e0432/download/peta-potensi-investasi-kabupaten-karanganyar-2025-compressed.pdf#page=45), halaman PDF 45. Diperiksa 5 Oktober 2026.

Direktori tidak memberikan tahun pendataan UMKM atau koordinat usaha. Website tidak menerbitkan jam buka, nomor pribadi, status operasional, maupun pin usaha yang diperkirakan. Tombol Google Maps merupakan pencarian nama/alamat; tombol area desa memusatkan peta pada titik referensi desa. Galeri foto telah ditambahkan setelah penelusuran lokasi dan atribusi; lihat catatan aset di `public/photos/ATTRIBUTION.md`.

### Galeri dokumentasi

Tiga foto lokal tersimpan dalam `public/photos/`, dengan metadata terpisah di `src/content/photos.ts`. Galeri `#galeri` ada di beranda dan tiap profil desa. Klik foto untuk melihat bingkai utuh, berpindah dengan tombol atau panah keyboard, dan tutup dengan Escape. Dialog native menjaga fokus. Foto dimuat secara lazy, punya dimensi eksplisit, alt text, tanggal, caption, dan atribusi; sumber foto juga masuk indeks kategori **Foto**. Dokumentasi rapat Ngringo diberi lokasi Setda sesuai sumber. Catatan lisensi lengkap ada di `public/photos/ATTRIBUTION.md`.

### Koreografi animasi tambahan

GSAP mengendalikan entrance judul per baris, reveal heading dengan clip-path, kemunculan pilihan desa secara berurutan, hitungan statistik sekali saat terlihat, reveal foto, dan parallax wrapper foto pada desktop. Motion mengendalikan tilt/tekan pilihan desa, ikon hover, pergantian detail peta, dan transisi halaman. Animasi CSS dipakai untuk kedatangan pin, ring sekali saat dipilih, serta pembukaan dialog. Properti transform tidak dibagi oleh GSAP dan Motion pada elemen yang sama; hover gambar bekerja pada anak wrapper parallax. Context GSAP dan matchMedia dibersihkan saat halaman dilepas. Nilai aksesibel statistik selalu angka final, walaupun tampilan sedang menghitung. `prefers-reduced-motion` menonaktifkan gerak scroll, tilt, hitungan, parallax, dan efek hover bergerak; mobile memakai foto tanpa parallax.
