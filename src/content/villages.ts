export type VillageSlug = 'dagen' | 'ngringo' | 'sroyo';
export type Village = {
  slug: VillageSlug; name: string; number: string; accent: string; light: string;
  area: number; population: number; male: number; female: number;
  dusun: number; rw: number; rt: number; density: number;
  headline: string; description: string; editorial: string;
  sources: string[];
};
export const villages: Village[] = [
  { slug: 'dagen', name: 'Dagen', number: '01', accent: '#8c462f', light: '#e6b798', area: 283.5, population: 5810, male: 2914, female: 2896, dusun: 5, rw: 13, rt: 39, density: 2049, headline: 'Mengenal Dagen,\nlebih dekat.', description: 'Lima dusun, 13 RW, dan 39 RT. Sebuah bagian dari Jaten yang bisa mulai kita kenali lewat data.', editorial: 'Dengan luas 283,50 hektare, Dagen merupakan desa dengan wilayah terkecil di antara tiga desa dalam atlas ini. Sebanyak 5.810 penduduk tercatat pada tahun 2024.', sources: ['bps', 'dagen-profile', 'dagen-history'] },
  { slug: 'ngringo', name: 'Ngringo', number: '02', accent: '#385a72', light: '#aac0c8', area: 420.27, population: 24407, male: 12026, female: 12381, dusun: 8, rw: 29, rt: 178, density: 5807, headline: 'Banyak kehidupan,\nsatu Ngringo.', description: 'Delapan dusun dan 24.407 penduduk. Kenali desa dengan penduduk terbanyak di antara ketiganya.', editorial: 'Ngringo memiliki penduduk terbanyak di antara Dagen, Ngringo, dan Sroyo. Dengan luas 420,27 hektare, kepadatan penduduknya tercatat 5.807 jiwa per kilometer persegi pada 2024.', sources: ['bps', 'ngringo-government'] },
  { slug: 'sroyo', name: 'Sroyo', number: '03', accent: '#6a6639', light: '#d1cd9c', area: 459.78, population: 10470, male: 5188, female: 5282, dusun: 6, rw: 10, rt: 58, density: 2277, headline: 'Ruang untuk\nmengenal Sroyo.', description: 'Enam dusun di atas 459,78 hektare. Telusuri angka dan dokumen yang bercerita tentang Sroyo.', editorial: 'Di antara tiga desa dalam atlas ini, Sroyo memiliki wilayah terluas: 459,78 hektare. Pada tahun 2024, desa ini memiliki 10.470 penduduk yang tersebar dalam 6 dusun, 10 RW, dan 58 RT.', sources: ['bps', 'sroyo-government', 'sroyo-planning'] },
];
export type Source = { id: string; title: string; publisher: string; year: string; url: string; scope: string; kind: 'Statistik' | 'Arsip'; note: string };
export const sources: Source[] = [
  { id: 'bps', title: 'Kecamatan Jaten Dalam Angka 2025', publisher: 'BPS Kabupaten Karanganyar', year: 'Data 2024 · terbit 2025', url: 'https://opendata.karanganyarkab.go.id/dataset/5ebaec1d-4db7-4921-980a-028878cc5c38/resource/3901c802-e3e4-4c8a-af13-560844cb9fd4/download/publikasi-kecamatan-jaten-dalam-angka-2025_compressed.pdf', scope: 'Luas, penduduk, kepadatan, dusun, RW, dan RT ketiga desa.', kind: 'Statistik', note: 'Akumulasi adalah hasil penjumlahan Dagen, Ngringo, dan Sroyo; bukan keseluruhan Kecamatan Jaten.' },
  { id: 'dagen-profile', title: 'Profil Desa Dagen', publisher: 'Open Data Kabupaten Karanganyar', year: 'Tanggal dokumen tidak tercantum', url: 'https://opendata.karanganyarkab.go.id/dataset/07478638-0241-4ffd-8402-75811b0f44b4/resource/dcec0d92-abb1-49fc-8023-0a173286a214/download/profil-desa-dagen.docx', scope: 'Dokumen visi dan misi Dagen.', kind: 'Arsip', note: 'Tersedia sebagai rujukan dokumen. Isi dan masa berlaku belum diverifikasi ulang untuk atlas ini.' },
  { id: 'dagen-history', title: 'Sejarah Desa Dagen', publisher: 'Open Data Kabupaten Karanganyar', year: 'Tanggal dokumen tidak tercantum', url: 'https://opendata.karanganyarkab.go.id/dataset/7e633cd3-7671-4569-8005-716de2d36480/resource/b4e969e7-3fe7-4b05-8b63-c0a615e4779d/download/sejarah-desa-dagen.docx', scope: 'Rujukan sejarah Desa Dagen.', kind: 'Arsip', note: 'Dokumen disediakan sebagai arsip. Atlas ini belum menerbitkan ulang isinya.' },
  { id: 'ngringo-government', title: 'Profil Perangkat Desa Ngringo', publisher: 'Open Data Kabupaten Karanganyar', year: 'Arsip 2023', url: 'https://opendata.karanganyarkab.go.id/dataset/42b0d73b-b322-4899-8af3-432b911f3f88/resource/286f7a69-8ab7-4daa-9b28-10f8be9238fa/download/perangkat-desa-ngringo.pdf', scope: 'Rujukan pemerintahan Ngringo pada 2023.', kind: 'Arsip', note: 'Dokumen historis, bukan daftar pejabat aktif. Nomor personal dalam dokumen tidak disalin ke website.' },
  { id: 'sroyo-government', title: 'Struktur Organisasi & Tugas Desa Sroyo', publisher: 'Open Data Kabupaten Karanganyar', year: 'Rujukan Perdes No. 4 Tahun 2016', url: 'https://opendata.karanganyarkab.go.id/dataset/63e138ff-568e-4223-a371-8fa108e14c9f/resource/c4c32806-5ea9-496d-869e-b8e1865df616/download/struktur-organisasi-tugas.pdf', scope: 'Dokumen struktur dan fungsi pemerintahan Sroyo.', kind: 'Arsip', note: 'Rujukan historis. Tidak menyatakan susunan atau nama pejabat yang berlaku sekarang.' },
  { id: 'sroyo-planning', title: 'RPJMDes Sroyo 2019–2025', publisher: 'Open Data Kabupaten Karanganyar', year: 'Periode 2019–2025', url: 'https://opendata.karanganyarkab.go.id/dataset/015cdffd-a558-4f6d-9cec-3cb4591fdc13/resource/47379324-30bc-42dc-be82-444e91394ee1/download/rpjmdes-sroyo-2019-2025.pdf', scope: 'Arsip rencana pembangunan Sroyo.', kind: 'Arsip', note: 'Periode rencana telah berakhir. Dibaca sebagai arsip, bukan rencana pembangunan aktif.' },
];
export const format = (value: number, decimals = 0) => new Intl.NumberFormat('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
export const totals = { area: 1163.55, population: 40687, dusun: 19, rw: 52, rt: 275 };
export const metrics = [
  { key: 'population', label: 'Penduduk', unit: 'jiwa', decimals: 0 },
  { key: 'area', label: 'Luas wilayah', unit: 'ha', decimals: 2 },
  { key: 'dusun', label: 'Dusun', unit: 'dusun', decimals: 0 },
  { key: 'rw', label: 'RW', unit: 'RW', decimals: 0 },
  { key: 'rt', label: 'RT', unit: 'RT', decimals: 0 },
] as const;
