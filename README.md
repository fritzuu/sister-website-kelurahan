# Website Informasi Tiga Desa Kecamatan Jaten (Dagen, Ngringo, Sroyo)

Website profil wilayah yang menyajikan informasi demografi, geografis, kelembagaan desa, serta rujukan sumber data untuk tiga desa di Kecamatan Jaten, Kabupaten Karanganyar, Jawa Tengah: **Desa Dagen**, **Desa Ngringo**, dan **Desa Sroyo**. Website ini hadir dengan antarmuka yang modern, dinamis, dan responsif.

> **PENTING / PERNYATAAN STATUS AKADEMIK**:
> Website ini dibangun untuk memenuhi tugas akademik mata kuliah **Sistem Terdistribusi**. Website ini **BUKAN** merupakan website/portal layanan resmi Pemerintah Desa maupun Pemerintah Kabupaten Karanganyar. Website ini tidak melayani pengajuan surat, transaksi administrasi warga, ataupun penyimpanan basis data kependudukan pribadi.

---

## 1. Tech Stack

- **Framework & Runtime**: React 19 + TypeScript
- **Build Tool & Bundler**: Vite 8
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Mobile-first, WCAG AA compliant)
- **Arsitektur**: Single Page Application (SPA), Pure Static Client-side, Tanpa Backend/Database

---

## 2. Struktur Direktori Proyek

```text
sister-website-kelurahan/
├── public/
│   ├── images/
│   │   └── README.md        # Panduan perizinan, atribusi, dan alt-text gambar
│   ├── _redirects           # Aturan rewrite SPA fallback untuk static host
│   ├── robots.txt           # Kebijakan perayapan mesin pencari
│   └── sitemap.xml          # Peta situs 5 rute utama
├── src/
│   ├── components/          # Komponen antarmuka modular
│   │   ├── Breadcrumbs.tsx
│   │   ├── ContactCard.tsx
│   │   ├── MobileVillageSelect.tsx
│   │   ├── OrganizationTree.tsx
│   │   ├── PublicNotice.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceLevelBadge.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SiteHeader.tsx
│   │   ├── SourceBadge.tsx
│   │   ├── SourceList.tsx
│   │   ├── SourceNote.tsx
│   │   ├── StatCard.tsx
│   │   ├── VillageCard.tsx
│   │   └── VillageSectionNav.tsx
│   ├── content/             # Typed content model & data registry
│   │   ├── sources.ts       # Registry terpusat seluruh rujukan sumber data
│   │   └── villages.ts      # Data resmi profil Dagen, Ngringo, Sroyo & agregat
│   ├── pages/               # Halaman rute aplikasi
│   │   ├── HomePage.tsx     # Beranda, kartu desa, tabel perbandingan agregat
│   │   ├── NotFoundPage.tsx # Penanganan 404 dengan tautan fallback 3 desa
│   │   ├── SourcesPage.tsx  # Katalog sumber data & metodologi lengkap
│   │   └── VillagePage.tsx  # Halaman dinamis profil desa (/desa/:slug)
│   ├── styles/
│   │   └── globals.css      # Desain sistem warna, tipografi, dan responsif
│   ├── types/
│   │   └── village.ts       # Definisi tipe TypeScript: Village, Sourced<T>, Source, OfficialRecord, ServiceInfo
│   ├── utils/
│   │   └── seo.ts           # Helper metadata rute & pengalihan fokus keyboard (WCAG AA)
│   ├── App.tsx              # Definisi router & layout shell
│   └── main.tsx             # Entrypoint React
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 3. Instalasi dan Menjalankan Proyek

Pastikan Anda telah memasang **Node.js** (rekomendasi LTS v20+) dan **npm**.

### 1. Memasang dependensi
```bash
npm install
```

### 2. Menjalankan lingkungan pengembangan (Development Server)
```bash
npm run dev
```
Buka browser pada alamat lokal yang tertera (biasanya `http://localhost:5173`).

### 3. Membangun bundle produksi (Production Build)
```bash
npm run build
```
Hasil build statis akan dihasilkan pada folder `dist/`.

### 4. Meninjau hasil build lokal (Preview Build)
```bash
npm run preview
```

### 5. Menjalankan linter
```bash
npm run lint
```

---

## 4. Rute Halaman (Routing)

Aplikasi mengimplementasikan rute berbasis React Router:

| Rute URL | Komponen Halaman | Deskripsi |
|---|---|---|
| `/` | `HomePage` | Beranda, pengantar akademik, 3 kartu desa, dan tabel ringkasan komparatif agregat |
| `/sumber` | `SourcesPage` | Katalog lengkap rujukan dokumen, metodologi, dan catatan keterbatasan |
| `/desa/dagen` | `VillagePage` | Profil lengkap Desa Dagen |
| `/desa/ngringo` | `VillagePage` | Profil lengkap Desa Ngringo |
| `/desa/sroyo` | `VillagePage` | Profil lengkap Desa Sroyo |
| `/desa/:slug` (tidak valid) | `NotFoundPage` | Halaman 404 informatif yang menyediakan tautan kembali ke tiga desa dan beranda |

---

## 5. Konfigurasi SPA Fallback untuk Static Hosting

Karena aplikasi ini adalah Single Page Application (SPA) berbasis `BrowserRouter`, web server statis (seperti Netlify, Vercel, Cloudflare Pages, GitHub Pages, Apache, atau Nginx) harus dikonfigurasi untuk mengalihkan seluruh permintaan rute ke `index.html`.

- **Netlify & Cloudflare Pages**: Berkas `public/_redirects` telah disediakan dengan aturan:
  ```text
  /*    /index.html   200
  ```
- **Nginx**:
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```
- **Apache (.htaccess)**:
  ```apache
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

---

## 6. Pengelolaan Data & Aturan Editorial

Data profil desa tidak ditulis langsung secara statis di dalam JSX komponen, melainkan dikelola melalui model bertipe di folder `src/content/`.

### Aturan Data Tidak Tersedia (Prinsip No-Placeholder Palsu):
- Jika suatu data belum memiliki dasar dokumen valid (seperti nomor kontak pribadi perangkat, jam loket desa yang belum dikonfirmasi, atau teks visi-misi yang belum ditranskripsi), bagian tersebut **dikosongkan/disembunyikan** dari antarmuka publik (`undefined`).
- Dilarang mengisi dengan tanda `"-"`, angka nol palsu, atau teks `Lorem Ipsum`.

### Cara Memperbarui Data Desa:
Buka `src/content/villages.ts`:
1. Sesuaikan field pada objek desa terkait (`dagen`, `ngringo`, atau `sroyo`).
2. Masukkan ID rujukan sumber pada array `sourceIds`.
3. Perbarui `asOf` (tahun data) jika diperlukan.

### Cara Menambahkan Sumber Baru:
Buka `src/content/sources.ts`:
1. Tambahkan entri baru pada objek `sourcesRegistry` dengan tipe `Source`.
2. Cantumkan `id`, `title`, `publisher`, `url`, `dataYear`/`publishedAt`, `accessedAt`, dan `scope`.
3. Gunakan ID sumber tersebut pada entri data di `src/content/villages.ts`.

---

## 7. Aksesibilitas & Standar Tampilan

- Mengikuti pedoman **WCAG AA** dengan rasio kontras teks yang nyaman dibaca.
- Satu tag `<h1>` utama per halaman.
- Mekanisme pemindahan fokus otomatis ke judul halaman (`<h1>`) saat berpindah rute untuk navigasi pembaca layar dan keyboard.
- Indikator fokus terlihat (`:focus-visible`) di seluruh link dan tombol interaktif.
- Tata letak responsif penuh dari layar ponsel minimum 360px hingga layar desktop 1120px tanpa adanya _horizontal overflow_.
