import type { Source } from "../types/village";

export const sourcesRegistry: Record<string, Source> = {
  "bps-jaten-2025": {
    id: "bps-jaten-2025",
    title: "Kecamatan Jaten Dalam Angka 2025",
    publisher: "BPS Kabupaten Karanganyar",
    url: "https://karanganyarkab.bps.go.id",
    publishedAt: "2025-09-26",
    dataYear: 2024,
    accessedAt: "2026-10-02",
    scope: "Data luas wilayah, jumlah RW/RT, dusun, dan penduduk tahun 2024 untuk Dagen, Ngringo, dan Sroyo",
    note: "Data statistik wilayah mengacu pada tahun data 2024, bukan kondisi tahun 2026."
  },
  "opendata-dagen-profil": {
    id: "opendata-dagen-profil",
    title: "Profil Desa Dagen (Visi dan Misi)",
    publisher: "Pemerintah Desa Dagen melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    accessedAt: "2026-10-02",
    scope: "Visi dan misi Desa Dagen",
    note: "Dokumen tidak mencantumkan tahun penetapan/periode berlaku; disajikan sebagai data arsip."
  },
  "opendata-dagen-sejarah": {
    id: "opendata-dagen-sejarah",
    title: "Sejarah Desa Dagen",
    publisher: "Pemerintah Desa Dagen melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    accessedAt: "2026-10-02",
    scope: "Tradisi lisan asal-usul penamaan Desa Dagen dan narasi batas wilayah versi dokumen",
    note: "Disajikan sebagai narasi tradisi/sejarah lokal bertutur, bukan klaim geografis mutakhir."
  },
  "opendata-ngringo-profil-2023": {
    id: "opendata-ngringo-profil-2023",
    title: "Profil Perangkat Desa Ngringo Tahun 2023",
    publisher: "Pemerintah Desa Ngringo melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    dataYear: 2023,
    accessedAt: "2026-10-02",
    scope: "Daftar 16 nama dan jabatan perangkat desa Ngringo tahun 2023",
    note: "Diberi label arsip 2023. Perubahan pejabat setelah 2023 belum terkonfirmasi penuh dari kantor desa."
  },
  "opendata-ngringo-alamat": {
    id: "opendata-ngringo-alamat",
    title: "Alamat Kantor Desa Ngringo",
    publisher: "Pemerintah Desa Ngringo melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    accessedAt: "2026-10-02",
    scope: "Alamat fisik kantor Desa Ngringo (Jl. Balai Desa No. 43, Dusun Palur, Kode Pos 57772)",
    note: "Perlu konfirmasi lapangan sebelum publikasi administratif resmi."
  },
  "opendata-ngringo-tusi": {
    id: "opendata-ngringo-tusi",
    title: "Tugas dan Fungsi Kepala Desa dan Perangkat Desa Ngringo",
    publisher: "Pemerintah Desa Ngringo melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    accessedAt: "2026-10-02",
    scope: "Uraian tugas generik perangkat desa berdasarkan Perbup Karanganyar No. 70 Tahun 2016",
    note: "Arsip regulasi tugas perangkat."
  },
  "opendata-sroyo-struktur": {
    id: "opendata-sroyo-struktur",
    title: "Struktur Organisasi, Tugas, Wewenang dan Fungsi Pemerintah Desa Sroyo",
    publisher: "Pemerintah Desa Sroyo melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    dataYear: 2022,
    accessedAt: "2026-10-02",
    scope: "Bagan struktur organisasi berdasarkan Perdes Sroyo No. 4 Tahun 2016 (judul dokumen 2022)",
    note: "Menyajikan struktur jabatan normatif, bukan klaim pengisian jabatan aktif 2026."
  },
  "opendata-sroyo-visimisi": {
    id: "opendata-sroyo-visimisi",
    title: "Visi dan Misi Desa Sroyo",
    publisher: "Pemerintah Desa Sroyo melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    accessedAt: "2026-10-02",
    scope: "Rumusan visi dan enam arah misi pembangunan Desa Sroyo",
    note: "Dokumen tidak mencantumkan periode berlaku resmi."
  },
  "opendata-sroyo-kontak": {
    id: "opendata-sroyo-kontak",
    title: "Profil dan Informasi Kontak Desa Sroyo",
    publisher: "Pemerintah Desa Sroyo melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    accessedAt: "2026-10-02",
    scope: "Alamat kantor, nomor telepon, surel, dan akun media sosial",
    note: "Perlu verifikasi keaktifan kanal komunikasi sebelum digunakan untuk urusan mendesak."
  },
  "kemendikdasmen-jaten": {
    id: "kemendikdasmen-jaten",
    title: "Data Pokok Pendidikan (Dapodik) Sekolah Negeri Kecamatan Jaten",
    publisher: "Kementerian Pendidikan Dasar dan Menengah RI",
    url: "https://referensi.data.kemdikbud.go.id",
    accessedAt: "2026-10-02",
    scope: "Daftar sekolah dasar dan menengah negeri berstatus formal di wilayah Dagen, Ngringo, dan Sroyo",
    note: "Hanya memuat sekolah berstatus negeri formal jenjang Dikdas sesuai filter pencarian."
  },
  "puskesmas-jaten-2": {
    id: "puskesmas-jaten-2",
    title: "Profil Wilayah Kerja Puskesmas Jaten II",
    publisher: "UPT Puskesmas Jaten II Kabupaten Karanganyar",
    url: "https://dinkes.karanganyarkab.go.id",
    accessedAt: "2026-10-02",
    scope: "Lokasi fasilitas di Ngringo dan cakupan wilayah binaan (Dagen, Ngringo, Sroyo)",
    note: "Angka kependudukan internal puskesmas berbeda sedikit dengan BPS; angka statistik utama tetap mengacu BPS 2024."
  },
  "setda-krg-surat-adminduk-2025": {
    id: "setda-krg-surat-adminduk-2025",
    title: "Surat Penekanan Terkait Pelayanan Adminduk di Desa (Nomor 400.12/702)",
    publisher: "Sekretariat Daerah Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    publishedAt: "2025-08-26",
    dataYear: 2025,
    accessedAt: "2026-10-04",
    scope: "Ketentuan pelayanan dokumen kependudukan di tingkat desa melalui aplikasi Paklay Komplit Disdukcapil",
    note: "Berlaku tingkat Kabupaten Karanganyar untuk seluruh desa/kelurahan."
  },
  "kec-jaten-standar-pelayanan-2024": {
    id: "kec-jaten-standar-pelayanan-2024",
    title: "Keputusan Camat Jaten tentang Standar Pelayanan di Lingkungan Kecamatan Jaten",
    publisher: "Pemerintah Kecamatan Jaten (SIPPN KemenPAN-RB)",
    url: "https://sippn.menpan.go.id",
    publishedAt: "2024-09-30",
    dataYear: 2024,
    accessedAt: "2026-10-04",
    scope: "Informasi alur layanan kecamatan yang membutuhkan surat pengantar desa (mis. SKCK)",
    note: "Hanya cuplikan ringkasan yang terbaca; persyaratan rinci menunggu akses dokumen lengkap."
  },
  "kec-jaten-dip-2020": {
    id: "kec-jaten-dip-2020",
    title: "Daftar Informasi Publik Kecamatan Jaten 2020",
    publisher: "Pemerintah Kecamatan Jaten melalui Open Data Kabupaten Karanganyar",
    url: "https://opendata.karanganyarkab.go.id",
    dataYear: 2020,
    accessedAt: "2026-10-04",
    scope: "Alamat dan kontak induk administratif Kecamatan Jaten",
    note: "Data kontak tahun 2020, disajikan sebagai rujukan sementara induk kecamatan."
  },
  "rmol-jateng-pj-ngringo-2026": {
    id: "rmol-jateng-pj-ngringo-2026",
    title: "Pemberitaan Pelantikan/Penunjukan Pj Kepala Desa Ngringo",
    publisher: "RMOL Jawa Tengah",
    url: "https://rmoljawatengah.id",
    publishedAt: "2026-09-16",
    dataYear: 2026,
    accessedAt: "2026-10-02",
    scope: "Penyebutan nama Apri Linawati sebagai Penjabat (Pj) Kepala Desa Ngringo",
    note: "Sumber berita; konfirmasi SK resmi aktif tetap dianjurkan."
  },
  "artikel-pleret-dagen-2022": {
    id: "artikel-pleret-dagen-2022",
    title: "Kunjungan Studi Banding Desa Dagen ke Kalurahan Pleret",
    publisher: "Pemerintah Kalurahan Pleret, Bantul",
    url: "https://pleret.kalurahan.web.id",
    publishedAt: "2022-11-26",
    dataYear: 2022,
    accessedAt: "2026-10-02",
    scope: "Penyebutan nama Kepala Desa Dagen Andi Susilo Purnomo, S.H. pada kegiatan 2022",
    note: "Sumber sekunder berita kegiatan historis."
  }
};

export const getSourceById = (id: string): Source | undefined => {
  return sourcesRegistry[id];
};

export const getAllSources = (): Source[] => {
  return Object.values(sourcesRegistry);
};
