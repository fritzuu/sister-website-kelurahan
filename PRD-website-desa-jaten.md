# PRD: Website Informasi Desa Dagen, Ngringo, dan Sroyo

**Status:** Spesifikasi implementasi untuk demo akademik  
**Tanggal pemutakhiran riset:** 1 Oktober 2026  
**Wilayah:** Kecamatan Jaten, Kabupaten Karanganyar, Jawa Tengah  
**Cakupan desa:** Dagen, Ngringo, Sroyo  
**Pengguna utama:** warga/pengunjung umum dan dosen penilai  
**Rujukan tugas:** PDF “Tugas 21 September Sistem Terdistribusi”, bagian B. Tugas 2 meminta informasi wilayah, perangkat daerah, struktur organisasi, serta informasi relevan lainnya. Instruksi tugas adalah konteks; spesifikasi di bawah ini adalah rancangan produk, bukan teks yang harus tampil mentah kepada pengunjung.
**Target demo kelompok:** 12 Oktober 2026 (sesuai catatan kerja kelompok; cocokkan kembali dengan dosen).

---

## 1. Ringkasan produk

Bangun satu website informatif berbahasa Indonesia yang menyajikan tiga profil desa Jaten dengan struktur halaman yang konsisten dan konten terpisah. Pengunjung dapat memilih desa, membaca profil dan data wilayah, melihat struktur pemerintahan, menelusuri potensi/informasi publik yang sumbernya jelas, serta menemukan alamat dan tautan peta.

Website ini untuk kebutuhan tugas dan demonstrasi. Jangan memberi kesan sebagai situs layanan resmi Pemerintah Desa sebelum ada izin/persetujuan tertulis. Rilis pertama tidak menerima pengajuan surat, tidak menyimpan data warga, dan tidak menyediakan akun.

### Keputusan arsitektur informasi

Gunakan **satu website dengan satu halaman per desa**, ditambah halaman awal dan halaman sumber/metodologi. Ini paling sederhana untuk dibangun dan memungkinkan perbandingan. Jika dosen mensyaratkan tiga situs/domain terpisah, struktur konten yang sama dapat dipakai ulang dengan konfigurasi `village` per deployment.

### Benchmark pola website kelurahan

Website resmi Kelurahan Sondakan, Pajang, dan Purwosari Surakarta dipakai sebagai inspirasi struktur informasi, bukan untuk menyalin isi atau branding. Pola yang relevan adalah profil/tentang, layanan dan informasi publik, rilis unduhan, kabar kegiatan, kontak, dan lokasi. Sondakan dan Pajang menyediakan navigasi layanan/informasi publik serta rilis profil; Purwosari juga mengelompokkan profil, kontak, berita, infografis, dan informasi publik. Untuk tugas Jaten, ambil pola navigasinya saja: halaman profil, pemerintahan, sumber/unduhan, informasi kegiatan/potensi, dan kontak/lokasi. Jangan meniru fitur layanan transaksi, formulir kepuasan, statistik pengunjung, atau konten aktual instansi tersebut; data/proses layanan desa Jaten harus diverifikasi mandiri.

### Tujuan terukur

1. Pengunjung dapat masuk ke profil desa pilihan dari beranda dengan satu klik.
2. Informasi Dagen, Ngringo, dan Sroyo tidak tertukar.
3. Fakta berubah-ubah (nama pejabat, jumlah penduduk, kontak) membawa tahun/tanggal sumber yang terlihat.
4. Halaman tetap berguna walau suatu data belum ditemukan: tampilkan status “belum tersedia” hanya pada panel editorial/administrasi; jangan tampilkan angka atau prosedur rekaan ke publik.
5. Website berfungsi di ponsel, dapat dinavigasi dengan keyboard, dan siap diperagakan lokal maupun di hosting statis.

## 2. Ruang lingkup

### Rilis pertama (wajib)

- Beranda dengan pengantar, pilihan tiga desa, angka ringkas agregat berlabel “akumulasi tiga desa” dan tahun sumber.
- Halaman profil Dagen, Ngringo, Sroyo.
- Bagian pemerintahan/struktur organisasi.
- Bagian data wilayah (luas, dusun, RW, RT, penduduk; tahun wajib terlihat).
- Bagian informasi publik/potensi yang mempunyai sumber dan tidak memuat data pribadi.
- Bagian alamat kantor dan tautan peta bila telah diverifikasi.
- Halaman “Sumber Data” yang mencantumkan judul, penerbit, tahun/tanggal, dan tautan.
- Menu responsif, footer, tautan lintas desa, metadata dasar untuk mesin pencari, tampilan kosong yang tertangani.

### Bukan bagian rilis pertama

- Pengajuan surat, antrean layanan, unggah berkas, pembayaran, akun pengguna, atau database kependudukan.
- Admin/CMS online. Konten demo dapat dikelola lewat berkas JSON/TypeScript di repositori.
- Peta interaktif berbayar, pencarian penuh, komentar, chatbot, integrasi media sosial otomatis, dan notifikasi.
- Menyalin daftar penerima bantuan, nomor HP pribadi, tanda tangan, atau dokumen yang mengandung data pribadi.
- Publikasi APBDes/realisasi anggaran tanpa kebutuhan eksplisit dan pengecekan klasifikasi/keterbukaan informasi.

## 3. Pengguna, kebutuhan, dan tugas utama

| Pengguna | Kebutuhan | Tugas utama |
|---|---|---|
| Warga desa | Menemukan alamat kantor dan gambaran pemerintahan desanya | Memilih desa → membuka “Kontak & lokasi” atau “Pemerintahan” |
| Pengunjung/mahasiswa | Memahami perbedaan wilayah dan melihat sumber | Membandingkan ringkasan → membuka sumber data |
| Dosen/penilai | Memeriksa bahwa tiga desa tercakup, datanya dapat ditelusuri, dan alur berfungsi | Membuka tiap profil → mengikuti tautan sumber |
| Anggota kelompok pengelola konten | Memutakhirkan teks tanpa mengubah komponen antarmuka | Mengedit entri data, meninjau sumber/tanggal, membangun ulang |

## 4. Peta situs dan URL

```text
/                         Beranda
/sumber                   Sumber, tahun, metodologi, batas data
/desa/dagen               Profil Desa Dagen
/desa/ngringo             Profil Desa Ngringo
/desa/sroyo               Profil Desa Sroyo
```

Semua halaman menggunakan header yang sama: logo teks “Jaten: Profil Desa”, menu Beranda, pilihan desa (dropdown di ponsel), Sumber Data, dan penanda halaman aktif. Logo harus berupa teks/ikon buatan sendiri sampai logo berizin tersedia.

### Beranda

1. **Hero:** “Mengenal Desa di Kecamatan Jaten” + satu kalimat penjelas bahwa ini proyek informasi akademik.
2. **Kartu desa:** nama, ringkasan satu kalimat bersumber, luas dan jumlah penduduk beserta tahun; tombol “Lihat profil”.
3. **Ringkasan komparatif:** tabel kecil Dagen/Ngringo/Sroyo: luas, penduduk, dusun, RW, RT. Sertakan tahun 2024 dan sumber BPS.
4. **Tentang data:** tautan ke halaman Sumber Data dan pemberitahuan bahwa data dapat berubah.
5. **Footer:** wilayah cakupan, tanggal pembaruan konten, catatan “website tugas akademik, bukan kanal layanan resmi”.

### Templat halaman desa

Urutan bagian konsisten:

1. Breadcrumb: Beranda → Nama desa.
2. Judul, label “Desa”, kecamatan/kabupaten, dan tahun pembaruan profil.
3. “Sekilas”: 2–4 kalimat ringkasan editorial, kartu statistik, gambar hanya bila ada izin/kredit.
4. Navigasi jangkar: Profil, Wilayah, Pemerintahan, Potensi & informasi, Kontak & lokasi.
5. Profil/sejarah: ringkasan, visi-misi, sejarah bila sumber cukup. Jangan mengisi panel yang datanya belum diterbitkan.
6. Wilayah & demografi: luas, dusun/RW/RT, penduduk laki-laki/perempuan/total, kepadatan; cantumkan sumber/tahun dekat angka.
7. Pemerintahan: bagan struktur generik berdasarkan Perdes/dokumen; nama pejabat hanya jika tanggal berlaku jelas. Susunan organisasi bukan klaim siapa sedang menjabat.
8. Potensi & informasi publik: hanya pilihan konten yang aman dan relevan, misalnya daftar usaha yang memang diperuntukkan publik, perpustakaan, pertanian, atau dokumen perencanaan. Beri tanggal dan sumber. Hindari data penerima program/bantuan.
9. Kontak & lokasi: alamat kantor, nomor kantor publik, surel/situs resmi dan tautan peta; tampilkan hanya setelah validasi. Hindari menyematkan peta pihak ketiga jika tautan eksternal sudah cukup.
10. “Sumber halaman”: sumber spesifik halaman, tahun/tanggal, tautan dokumen dan tanggal terakhir diperiksa.
11. Navigasi “Desa sebelumnya/berikutnya” dan kembali ke semua desa.

### Halaman Sumber Data

Tabel sumber dengan kolom: nama sumber, penerbit, cakupan data, tahun/tanggal dokumen, desa, tautan, status verifikasi, catatan keterbatasan. Di bawah tabel jelaskan metode: angka BPS dipertahankan pada tahun rilisnya; agregat tiga desa dihitung dari tabel; pejabat/kontak cepat kedaluwarsa; foto/peta mengikuti atribusi/izin.

## 5. Inventaris konten terverifikasi untuk seed website

Semua angka di bawah bersumber pada BPS Kabupaten Karanganyar, *Kecamatan Jaten Dalam Angka 2025*, dengan tahun data 2024. Ini bukan angka tahun 2026.

| Desa | Luas | Penduduk (L/P/total) | Dusun | RW | RT | Kepadatan |
|---|---:|---:|---:|---:|---:|---:|
| Dagen | 283,50 ha | 2.914 / 2.896 / 5.810 | 5 | 13 | 39 | 2.049 jiwa/km² |
| Ngringo | 420,27 ha | 12.026 / 12.381 / 24.407 | 8 | 29 | 178 | 5.807 jiwa/km² |
| Sroyo | 459,78 ha | 5.188 / 5.282 / 10.470 | 6 | 10 | 58 | 2.277 jiwa/km² |
| **Akumulasi tiga desa** | **1.163,55 ha** | **20.128 / 20.559 / 40.687** | **19** | **52** | **275** | — |

Agregat dihitung dengan menjumlahkan baris Dagen, Ngringo, dan Sroyo dari tabel BPS; tampilkan label “hasil penjumlahan tiga desa, data 2024”. Jangan sebut sebagai total Kecamatan Jaten karena kecamatan memiliki delapan desa.

### Status konten spesifik desa

| Desa | Tersedia dari sumber yang ditemukan | Status/keterbatasan untuk implementasi |
|---|---|---|
| Dagen | Visi/misi; sejarah (dokumen desa); angka wilayah BPS; berita pertanian; nama kepala desa diberitakan tahun 2025 | Dokumen “Profil Desa Dagen” yang ada di portal ternyata berisi visi/misi. Kepala desa Andi Susilo Purnomo disebut pada 2022 dan diberitakan lagi Desember 2025; konfirmasi berlaku pada tanggal publikasi website. Daftar lengkap perangkat, alamat kantor, jam, kontak, koordinat, dan lisensi foto belum tervalidasi. |
| Ngringo | Alamat kantor di dokumen portal; profil perangkat tahun 2023; visi-misi sebagai gambar; daftar kepengurusan RT/RW; angka wilayah BPS; daftar perusahaan dan data perpustakaan 2022 | Alamat dokumen: Jalan Balai Desa No. 43, Dusun Palur, Desa Ngringo, Kecamatan Jaten, Kabupaten Karanganyar, kode pos 57772. Verifikasi sebelum tampil. Daftar perangkat bertahun 2023 dan pejabat dapat berubah; jangan tampilkan nomor HP personal dari dokumen. Perlu ekstraksi/validasi isi visi-misi dan izin data perusahaan. |
| Sroyo | Struktur dan fungsi (berdasarkan Perdes No. 4 Tahun 2016); profil singkat kepala desa tanpa tanggal pembaruan; alamat/kontak/situs/Instagram dalam dokumen portal; visi-misi; RPJMDes 2019–2025; daftar perusahaan dan data perpustakaan 2022; angka wilayah BPS | Dokumen menyebut H. Yulianto, S.T. sebagai kepala desa; tanggal berlaku tidak dicantumkan. Alamat dokumen: Jl. Kasak No. 1, Kasak, Sroyo, Jaten, Karanganyar; telepon (0271) 826285; email Sroyojaten@gmail.com; situs desasroyo.karanganyar.go.id; Instagram pemdes_sroyo. Semua kanal harus dicek aktif/publik sebelum tayang. RPJMDes 2019–2025 telah melewati periode rencana, gunakan hanya sebagai arsip historis. |

### Konten yang perlu diminta/dikonfirmasi sebelum publikasi final

1. Keputusan dosen: satu situs atau tiga situs; ketentuan domain/hosting; format demonstrasi.
2. Dari tiap kantor desa: nama dan jabatan pejabat yang berlaku, struktur/Perdes terbaru, alamat, jam pelayanan, nomor kantor/surel resmi, tautan peta dan kanal resmi.
3. Dari tiap desa: deskripsi profil yang disetujui, visi-misi yang berlaku, sejarah yang layak publik, informasi potensi yang ingin ditonjolkan.
4. Izin tertulis/kredit foto dan logo; gambar peta yang boleh dipublikasikan.
5. Tanggal pengambilan data terbaru untuk angka penduduk bila kelompok diminta menyajikan data mutakhir selain BPS 2024.

Jangan membuat formulir layanan atau menjanjikan jam/biaya/persyaratan layanan sampai diverifikasi oleh sumber desa yang bertanggung jawab.

## 6. Model data yang langsung dapat dikodekan

Simpan data statis di `src/content/villages.ts` atau berkas JSON. Pertahankan satu catatan sumber per klaim agar sumber dapat dirender di sisi pengguna.

```ts
type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt?: string;       // ISO date jika tersedia
  dataYear?: number;
  accessedAt: string;         // ISO date
  scope: string;
  note?: string;
};

type Sourced<T> = {
  value: T;
  sourceIds: string[];
  asOf?: string;              // misalnya "2024" atau tanggal konfirmasi
  verifiedAt?: string;        // tanggal anggota kelompok memeriksa
  status: "verified" | "needs-confirmation" | "historical";
};

type Village = {
  slug: "dagen" | "ngringo" | "sroyo";
  name: string;
  type: "desa";
  district: "Jaten";
  regency: "Karanganyar";
  province: "Jawa Tengah";
  summary?: Sourced<string>;
  areaHa?: Sourced<number>;
  population?: Sourced<{ male: number; female: number; total: number }>;
  administration?: Sourced<{ dusun: number; rw: number; rt: number }>;
  densityPerKm2?: Sourced<number>;
  vision?: Sourced<string>;
  mission?: Sourced<string[]>;
  history?: Sourced<string>;
  government?: {
    structure: Sourced<Array<{ title: string; reportsTo?: string }>>;
    officials?: Sourced<Array<{ role: string; name: string; termOrAsOf: string }>>;
  };
  publicInformation?: Array<{ title: string; description: string; sourceIds: string[]; dataYear?: number }>;
  contact?: Sourced<{ address?: string; publicPhone?: string; email?: string; website?: string; instagram?: string; mapUrl?: string }>;
  media?: Array<{ src: string; alt: string; credit: string; licenseOrPermission: string }>;
  updatedAt: string;
  sourceIds: string[];
};
```

Aturan render:

- `undefined`/belum terverifikasi berarti bagian tersebut disembunyikan dari pengunjung, bukan diisi “-”, angka nol, atau teks contoh.
- `historical` harus diberi label tahun dan tidak ditampilkan sebagai kondisi kini.
- `needs-confirmation` boleh muncul hanya bila jelas diberi label “tercatat pada dokumen [tahun]” dan dosen menerima materi historis; untuk prototipe publik, sembunyikan nama/kontak yang belum dicek.
- Hindari menyimpan nomor personal, tanda tangan, identitas penduduk, atau daftar penerima bantuan.
- Sumber eksternal selalu dibuka di tab baru dengan `rel="noopener noreferrer"`.

## 7. Rancangan visual dan komponen

### Arah desain

Rasa: informatif, hangat, sederhana, dan mudah dibaca. Hindari meniru logo pemerintah atau menampilkan lambang resmi tanpa izin. Gunakan latar putih/krem muda, hijau tua sebagai warna utama, hijau pucat untuk latar kartu, abu gelap untuk teks. Sediakan kontras teks minimal WCAG AA. Tipografi sans-serif umum; batas lebar isi sekitar 70–78 karakter.

### Komponen

- `SiteHeader` + `MobileVillageSelect`
- `Breadcrumbs`
- `VillageCard`
- `StatCard` dengan label tahun dan komponen `SourceNote`
- `VillageSectionNav` yang dapat dipakai dengan keyboard
- `OrganizationTree` (desktop) dan daftar bertingkat (ponsel)
- `SourceBadge` / `SourceList`
- `ContactCard` dan tombol “Buka di peta” (jika URL terverifikasi)
- `PublicNotice` untuk penanda data historis dan status proyek akademik
- `SiteFooter`

### Tata letak responsif

- Mobile: satu kolom, menu ringkas, kartu statistik 2 kolom bila lebar memadai, bagan organisasi menjadi daftar bertingkat.
- Tablet: kartu desa dua/ tiga kolom sesuai ruang.
- Desktop: konten utama maks. 1120 px, navigasi desa terlihat, statistik sejajar.
- Tidak boleh ada tabel melebar keluar viewport; tabel komparasi dapat bergulir horizontal dengan petunjuk aksesibilitas.

## 8. Spesifikasi fungsi dan penerimaan

| ID | Kriteria penerimaan |
|---|---|
| F-01 | `/` memuat tiga kartu yang mengarah tepat ke `/desa/dagen`, `/desa/ngringo`, `/desa/sroyo`. |
| F-02 | Setiap halaman desa menampilkan nama wilayah yang benar dan tidak mencampur data desa lain. |
| F-03 | Setiap statistik menampilkan tahun data dan setidaknya satu sumber yang bisa dibuka. |
| F-04 | Data nama pejabat ditampilkan hanya dengan tanggal/tahun data terlihat; konten historis diberi label historis. |
| F-05 | Bagian yang tidak memiliki data valid disembunyikan; tidak ada angka placeholder, alamat rekaan, atau prosedur layanan rekaan. |
| F-06 | Halaman sumber mengindeks semua sumber yang dirujuk pada halaman publik. |
| F-07 | Header, tautan jangkar, breadcrumb, tombol, tautan eksternal, dan navigasi antar desa berfungsi dengan mouse dan keyboard. |
| F-08 | Pada lebar 360 px tidak ada konten utama yang menyebabkan gulir horizontal; semua teks/tabel dapat dibaca. |
| F-09 | Gambar yang tampil memiliki teks alternatif; gambar berizin memuat kredit. |
| F-10 | Footer menjelaskan cakupan akademik dan tanggal pemutakhiran konten. |
| F-11 | Halaman memiliki judul dokumen unik, deskripsi metadata, satu H1, struktur heading berurutan, dan fokus keyboard terlihat. |
| F-12 | Tidak ada tautan mati, halaman kosong, lorem ipsum, atau tombol yang hanya dekoratif pada demo. |

## 9. Teknis implementasi yang disarankan

Pilih **Next.js + TypeScript** jika starter proyek belum ditetapkan. Bila repo sudah menggunakan kerangka lain, pertahankan yang ada dan terapkan rute/model konten di atas; fitur ini tidak memerlukan backend.

- Render statis/SSG untuk seluruh rute agar murah, cepat, dan mudah di-host di layanan statis yang kompatibel.
- Satu berkas konten bertipe untuk tiap desa dan registry sumber terpusat; komponen halaman menerima satu objek `Village`.
- Tidak ada database, autentikasi, cookie tracking, formulir, atau API eksternal di rilis pertama.
- Gambar lokal di `/public/images/` dengan berkas kredit/izin.
- Gunakan tautan peta eksternal setelah alamat diverifikasi; jangan memetakan geometri batas wilayah secara manual.
- Simpan `lastReviewedAt` terpisah dari tahun data. Peringatkan editor bila data pejabat/kontak lebih dari 180 hari belum ditinjau; angka demografi tetap mempertahankan tahun sumber.
- Lingkungan demo lokal harus dijalankan dengan satu perintah yang didokumentasikan dalam README; deployment domain publik dilakukan hanya setelah nama/branding/status resmi disepakati.

### Struktur direktori contoh

```text
src/
  app/page.tsx
  app/sumber/page.tsx
  app/desa/[slug]/page.tsx
  components/{SiteHeader,VillageCard,StatCard,OrganizationTree,SourceNote,SiteFooter}.tsx
  content/villages.ts
  content/sources.ts
public/images/README.md
README.md
```

### SEO dan berbagi tautan

Gunakan title “Profil Desa Dagen — Kecamatan Jaten” sesuai halaman; deskripsi singkat yang tidak mengklaim kanal resmi. Tambahkan Open Graph dasar dengan ilustrasi generik buatan kelompok, bukan foto tanpa izin. Sitemap/robots boleh dibuat otomatis dari empat rute.

## 10. Aksesibilitas, privasi, dan editorial

- Sasaran aksesibilitas: WCAG 2.2 AA sejauh dapat dicapai untuk prototipe; rasio kontras teks, fokus terlihat, landmark semantik, label tombol jelas, dan tidak hanya membedakan status melalui warna.
- Jangan mempublikasikan nomor HP pribadi yang ada pada profil perangkat, data warga, NIK, tanda tangan, daftar bantuan, atau dokumen yang mengekspos informasi pribadi.
- Jangan menggambarkan situs sebagai kanal pemerintah, portal administrasi, atau sumber resmi baru. Cantumkan penerbit asli pada fakta.
- Tampilkan tanggal data dekat metrik. Jangan menyamakan tanggal publikasi laporan dengan tahun data.
- Koreksi fakta dicatat sebagai perubahan konten beserta siapa memeriksa dan kapan.
- Tautan ke kanal eksternal harus diverifikasi; jika mati, sembunyikan atau beri label “tautan belum tersedia”.

## 11. Rencana implementasi

1. **Kunci keputusan tugas:** konfirmasi satu situs/tiga situs, cara demo/hosting, dan kebutuhan Bahasa Indonesia/Jawa.
2. **Audit konten:** salin angka BPS yang tercantum di dokumen ini; ekstrak visi-misi dan sumber Dagen/Ngringo/Sroyo; tandai tahun setiap dokumen.
3. **Konfirmasi cepat:** minta ketiga kantor desa memverifikasi pejabat aktif, kontak publik, alamat, jam pelayanan, izin logo/foto, dan tautan resmi. Jangan hentikan coding jika balasan belum ada; sembunyikan field yang belum terkonfirmasi.
4. **Bangun shell:** header, footer, beranda, rute dinamis desa, sumber.
5. **Masukkan data:** isi tipe `Village`, source IDs, tahun data dan status.
6. **Polish:** gaya responsif, navigasi keyboard, status data historis, atribusi.
7. **Uji penerimaan:** jalankan semua kriteria F-01–F-12 secara manual pada desktop dan viewport ponsel; pastikan eksternal links serta route fallback berfungsi.
8. **Siapkan demo:** README dengan perintah instal/jalankan/build, ambil tangkapan layar halaman, isi nama/NIM anggota bila tugas meminta.

## 12. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Dokumen perangkat sudah lama | Nama pejabat salah | Jangan tampilkan tanpa verifikasi tanggal berlaku; tampilkan struktur jabatan saja. |
| Data BPS tahun 2024 dianggap mutakhir 2026 | Perbandingan menyesatkan | Selalu beri label “data 2024, publikasi 2025”. |
| Website dikira portal resmi | Warga mengandalkan informasi yang belum resmi | Penanda akademik di header/footer dan tidak menyediakan transaksi layanan. |
| Kontak atau peta usang | Pengunjung gagal menghubungi kantor | Uji sebelum publikasi; rekam tanggal pemeriksaan. |
| Foto/logo tanpa izin | Masalah hak penggunaan | Gunakan aset buatan sendiri atau yang izinnya tercatat; berikan kredit. |
| Cakupan website ditafsir salah | Tidak sesuai tugas kelompok | Konfirmasi dosen satu website vs tiga. |

## 13. Sumber riset

1. **BPS Kabupaten Karanganyar**, *Kecamatan Jaten Dalam Angka 2025* (data wilayah, RW/RT, penduduk 2024): [PDF publikasi](https://opendata.karanganyarkab.go.id/dataset/5ebaec1d-4db7-4921-980a-028878cc5c38/resource/3901c802-e3e4-4c8a-af13-560844cb9fd4/download/publikasi-kecamatan-jaten-dalam-angka-2025_compressed.pdf).
2. **Open Data Kabupaten Karanganyar – Desa Dagen**, profil/visi-misi: [Profil Desa Dagen (DOCX)](https://opendata.karanganyarkab.go.id/dataset/07478638-0241-4ffd-8402-75811b0f44b4/resource/dcec0d92-abb1-49fc-8023-0a173286a214/download/profil-desa-dagen.docx); [Sejarah Desa Dagen (DOCX)](https://opendata.karanganyarkab.go.id/dataset/7e633cd3-7671-4569-8005-716de2d36480/resource/b4e969e7-3fe7-4b05-8b63-c0a615e4779d/download/sejarah-desa-dagen.docx); [kumpulan dataset Dagen](https://opendata.karanganyarkab.go.id/api/3/action/package_search?q=dagen).
3. **Open Data Kabupaten Karanganyar – Desa Ngringo**: [alamat kantor (PDF)](https://opendata.karanganyarkab.go.id/dataset/cf2e956b-f53f-4ec9-ac0f-ed9db3593ed7/resource/6129e108-c0b6-48fd-8d55-784ff3867510/download/alamat-kantor-desa-ngringo.pdf); [profil perangkat 2023 (PDF)](https://opendata.karanganyarkab.go.id/dataset/42b0d73b-b322-4899-8af3-432b911f3f88/resource/286f7a69-8ab7-4daa-9b28-10f8be9238fa/download/perangkat-desa-ngringo.pdf); [kumpulan dataset Ngringo](https://opendata.karanganyarkab.go.id/api/3/action/package_search?q=ngringo).
4. **Open Data Kabupaten Karanganyar – Desa Sroyo**: [struktur organisasi (PDF)](https://opendata.karanganyarkab.go.id/dataset/63e138ff-568e-4223-a371-8fa108e14c9f/resource/c4c32806-5ea9-496d-869e-b8e1865df616/download/struktur-organisasi-tugas.pdf); [profil pejabat (PDF)](https://opendata.karanganyarkab.go.id/dataset/21ec1a25-a436-44f5-bbdf-fb36ec6ab6b2/resource/e1f2bac8-272b-4cd8-809b-d9748b8ba77d/download/profil-singkat-pejabat.pdf); [alamat/kontak (PDF)](https://opendata.karanganyarkab.go.id/dataset/6cb44699-6a3c-403f-949c-3af558ddbc4f/resource/f4371dd3-01fa-4bf1-ad79-e6758dcb3ad2/download/kedudukan-dan-alamat.pdf); [visi-misi (PDF)](https://opendata.karanganyarkab.go.id/dataset/e6212161-6080-42f0-9fca-b2eb54e94323/resource/62685f8f-90a8-40b5-a9a9-24a7e208697f/download/visi-misi.pdf); [RPJMDes 2019–2025 (PDF, arsip periode lalu)](https://opendata.karanganyarkab.go.id/dataset/015cdffd-a558-4f6d-9cec-3cb4591fdc13/resource/47379324-30bc-42dc-be82-444e91394ee1/download/rpjmdes-sroyo-2019-2025.pdf); [kumpulan dataset Sroyo](https://opendata.karanganyarkab.go.id/api/3/action/package_search?q=sroyo).
5. **Kalurahan Pleret**, kunjungan Desa Dagen, 26 November 2022 (nama kades pada tanggal artikel): [artikel](https://pleret-bantul.desa.id/artikel/2022/11/26/lurah-pleret-berikan-materi-peningkatan-kapasitas-rt-desa-dagen-kec-jaten-kab-karanganyar).
6. **Berita Jateng**, laporan kegiatan pertanian di Dagen dan penyebutan kepala desa, 5 Desember 2025: [artikel](https://beritajateng.tv/harga-pangan-terus-meningkat-sumanto-minta-para-petani-bangga-dengan-pekerjaannya/). Ini sumber berita untuk konteks; minta konfirmasi desa untuk klaim terkini.
7. **Open Data Kabupaten Karanganyar**, laporan naskah masuk 2023 menyebut Pj Kepala Desa Ngringo pada 31 Oktober 2023; menunjukkan nama jabatan bisa berubah: [PDF](https://opendata.karanganyarkab.go.id/dataset/f24ad0b7-8d66-4878-9ecb-82aee0b2cbc5/resource/914d0a26-08e3-4f9b-9643-e0962826ea1f/download/laporan-naskah-masuk-2023-srikandi-inspektorat-daerah-kab.-karanganyar-desember.pdf).
8. **Kelurahan Sondakan Surakarta**, contoh struktur profil, layanan, informasi publik, rilis data, berita, kontak/lokasi: [situs resmi](https://kel-sondakan.surakarta.go.id/).
9. **Kelurahan Pajang Surakarta**, contoh beranda profil, layanan, informasi publik, buku profil, berita, kontak/lokasi: [situs resmi](https://kel-pajang.surakarta.go.id/).
10. **Kelurahan Purwosari Surakarta**, contoh kelompok navigasi profil, alamat/kontak, data sektoral/infografis, berita, informasi publik: [situs resmi](https://kel-purwosari.surakarta.go.id/).

**Catatan:** portal data adalah sumber dokumen, tetapi metadata tanggal pembaruan beberapa berkas tidak lengkap. Sebelum deployment publik, cek kembali tautan, kondisi dokumen, masa berlaku, dan izin penggunaan.
