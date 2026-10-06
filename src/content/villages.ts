import type { Village, OfficialRecord } from "../types/village";

export const aggregateThreeVillages = {
  label: "Akumulasi tiga desa",
  subLabel: "Data 2024 (BPS Kabupaten Karanganyar, rilis 2025)",
  sourceId: "bps-jaten-2025",
  areaHa: 1163.55,
  population: {
    male: 20128,
    female: 20559,
    total: 40687
  },
  administration: {
    dusun: 19,
    rw: 52,
    rt: 275
  },
  note: "Hasil penjumlahan baris Desa Dagen, Ngringo, dan Sroyo. Bukan total seluruh Kecamatan Jaten yang terdiri dari delapan desa."
};

export const villagesRegistry: Record<string, Village> = {
  dagen: {
    slug: "dagen",
    name: "Dagen",
    type: "desa",
    district: "Jaten",
    regency: "Karanganyar",
    province: "Jawa Tengah",
    summary: {
      value: "Desa Dagen adalah salah satu desa di Kecamatan Jaten, Karanganyar, dengan posisi strategis dekat jalur penghubung Solo–Tawangmangu dan jalur menuju Sragen.",
      sourceIds: ["opendata-dagen-sejarah"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    areaHa: {
      value: 283.50,
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    population: {
      value: { male: 2914, female: 2896, total: 5810 },
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    administration: {
      value: { dusun: 5, rw: 13, rt: 39 },
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    densityPerKm2: {
      value: 2049,
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    vision: {
      value: "Kebersamaan Dalam Membangun Desa Dagen Yang Sejahtera",
      sourceIds: ["opendata-dagen-profil"],
      verifiedAt: "2026-10-02",
      status: "needs-confirmation"
    },
    mission: {
      value: [
        "Memperkuat kelembagaan dan pelayanan masyarakat",
        "Menjalankan pemerintahan dan pembangunan secara partisipatif",
        "Menciptakan keamanan dan kedamaian",
        "Memberdayakan masyarakat untuk meningkatkan kesejahteraan"
      ],
      sourceIds: ["opendata-dagen-profil"],
      verifiedAt: "2026-10-02",
      status: "needs-confirmation"
    },
    history: {
      value: "Menurut cerita tutur dan kepercayaan masyarakat setempat yang tercatat dalam dokumen desa, penamaan Desa Dagen bermula dan terkait dengan sosok Eyang Pangeran Dagi. Wilayah ini berbatasan dengan Desa Jetis di utara, Kabupaten Sukoharjo di selatan, Desa Ngringo di barat, dan Desa Jaten di timur.",
      sourceIds: ["opendata-dagen-sejarah"],
      verifiedAt: "2026-10-02",
      status: "historical"
    },
    government: {
      officials: {
        value: [
          {
            role: "Kepala Desa (tercatat artikel kegiatan)",
            name: "Andi Susilo Purnomo, S.H.",
            termOrAsOf: "Tercatat pada kegiatan 2022 & berita 2025"
          }
        ],
        sourceIds: ["artikel-pleret-dagen-2022"],
        asOf: "2022-2025",
        verifiedAt: "2026-10-02",
        status: "historical"
      }
    },
    publicInformation: [
      {
        title: "Fasilitas Pendidikan Dasar Negeri (Dapodik)",
        description: "SD N 01 DAGEN (NPSN 20312214) dan SD N 02 DAGEN (NPSN 20312521) tercatat di database resmi Kementerian Pendidikan Dasar dan Menengah.",
        sourceIds: ["kemendikdasmen-jaten"],
        dataYear: 2024
      },
      {
        title: "Fasilitas Layanan Kesehatan",
        description: "Wilayah Desa Dagen tercakup dalam wilayah kerja pelayanan kesehatan masyarakat UPT Puskesmas Jaten II.",
        sourceIds: ["puskesmas-jaten-2"],
        dataYear: 2024
      }
    ],
    services: [
      {
        id: "dagen-adminduk",
        title: "Pelayanan Dokumen Kependudukan di Desa",
        level: "kabupaten",
        summary: "Pengurusan Kartu Keluarga (KK), Akta Kelahiran, Akta Kematian, dan dokumen kependudukan lainnya dimulai dari kantor desa setempat. Petugas desa memverifikasi berkas dan meneruskannya ke Disdukcapil melalui aplikasi Paklay Komplit.",
        sourceIds: ["setda-krg-surat-adminduk-2025"],
        sourceDate: "2025-08-26",
        status: "verified",
        reviewedAt: "2026-10-04"
      },
      {
        id: "dagen-skck",
        title: "Pengantar SKCK & Layanan Berjenjang Kecamatan",
        level: "kecamatan",
        summary: "Standar pelayanan Kecamatan Jaten mensyaratkan surat pengantar dari pemerintah desa untuk permohonan SKCK dan legalisasi dokumen tertentu.",
        sourceIds: ["kec-jaten-standar-pelayanan-2024"],
        sourceDate: "2024-09-30",
        status: "needs-confirmation",
        reviewedAt: "2026-10-04"
      }
    ],
    // Dagen contact is undefined because address/phone/email have not been officially verified (per PRD Section 10 & F-05)
    updatedAt: "2026-10-04",
    sourceIds: [
      "bps-jaten-2025",
      "opendata-dagen-profil",
      "opendata-dagen-sejarah",
      "kemendikdasmen-jaten",
      "puskesmas-jaten-2",
      "setda-krg-surat-adminduk-2025",
      "kec-jaten-standar-pelayanan-2024"
    ]
  },

  ngringo: {
    slug: "ngringo",
    name: "Ngringo",
    type: "desa",
    district: "Jaten",
    regency: "Karanganyar",
    province: "Jawa Tengah",
    summary: {
      value: "Desa Ngringo merupakan desa dengan jumlah penduduk terbesar dan kepadatan tertinggi di Kecamatan Jaten, terletak di wilayah barat perbatasan Kota Surakarta.",
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    areaHa: {
      value: 420.27,
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    population: {
      value: { male: 12026, female: 12381, total: 24407 },
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    administration: {
      value: { dusun: 8, rw: 29, rt: 178 },
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    densityPerKm2: {
      value: 5807,
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    // Visi & misi Ngringo di sumber berupa gambar dan belum ditranskripsi, sengaja di-omit agar tidak mengarang data.
    government: {
      structure: {
        value: [
          { title: "Kepala Desa" },
          { title: "Sekretaris Desa", reportsTo: "Kepala Desa" },
          { title: "Kaur Tata Usaha dan Umum", reportsTo: "Sekretaris Desa" },
          { title: "Kaur Keuangan", reportsTo: "Sekretaris Desa" },
          { title: "Kaur Perencanaan", reportsTo: "Sekretaris Desa" },
          { title: "Kasi Pemerintahan", reportsTo: "Kepala Desa" },
          { title: "Kasi Kesejahteraan", reportsTo: "Kepala Desa" },
          { title: "Kasi Pelayanan", reportsTo: "Kepala Desa" },
          { title: "Kepala Dusun (8 Wilayah)", reportsTo: "Kepala Desa" }
        ],
        sourceIds: ["opendata-ngringo-tusi"],
        verifiedAt: "2026-10-02",
        status: "historical"
      },
      officials: {
        value: [
          { role: "Pj. Kepala Desa (Pemberitaan)", name: "Apri Linawati", termOrAsOf: "Pemberitaan 16 September 2026" },
          { role: "Kepala Desa (Arsip 2023)", name: "Widodo, S.H., M.H.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Sekretaris Desa (Arsip 2023)", name: "Dito Prasetyo Nugroho, S.E.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kaur TU dan Umum (Arsip 2023)", name: "Kaswadi", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kaur Keuangan (Arsip 2023)", name: "Mareta Fatma Yani, S.E.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kaur Perencanaan (Arsip 2023)", name: "Bambang Kilatmoko, S.Pd.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kasi Pemerintahan (Arsip 2023)", name: "Makardi", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kasi Kesejahteraan (Arsip 2023)", name: "Purnomo", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kasi Pelayanan (Arsip 2023)", name: "Waidi, A.Ma.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kadus Benowo (Arsip 2023)", name: "Triyono, S.Sos.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kadus Banaran (Arsip 2023)", name: "Guntoro Setyo Widodo, S.H., S.Sos.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kadus Gunung Wijil (Arsip 2023)", name: "Santosa, S.Sos.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kadus Silamat (Arsip 2023)", name: "Supriyatno", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kadus Karangrejo (Arsip 2023)", name: "Suji Wibowo, S.Pd.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kadus Plosokerep (Arsip 2023)", name: "Putriana Dyan Palupi, A.Md.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kadus Jurug (Arsip 2023)", name: "Dheva Enlivena Irene Restia Mahelingga, S.Sn.", termOrAsOf: "Dokumen Perangkat 2023" },
          { role: "Kadus Palur (Arsip 2023)", name: "Agus Suprianto, S.Pd., S.E.", termOrAsOf: "Dokumen Perangkat 2023" }
        ],
        sourceIds: ["opendata-ngringo-profil-2023", "rmol-jateng-pj-ngringo-2026"],
        asOf: "2023-2026",
        verifiedAt: "2026-10-02",
        status: "historical"
      }
    },
    publicInformation: [
      {
        title: "Fasilitas Pendidikan Dasar Negeri (8 SD)",
        description: "SD N 01 s/d SD N 06 Ngringo, SD N 09 Ngringo, dan SD N 11 Ngringo melayani pendidikan dasar di berbagai dusun.",
        sourceIds: ["kemendikdasmen-jaten"],
        dataYear: 2024
      },
      {
        title: "Fasilitas Kesehatan Masyarakat (Puskesmas Jaten II)",
        description: "Gedung UPT Puskesmas Jaten II berlokasi di Dusun Plosokerep RT 04/XI Ngringo, melayani warga desa setempat dan desa sekitarnya.",
        sourceIds: ["puskesmas-jaten-2"],
        dataYear: 2024
      }
    ],
    services: [
      {
        id: "ngringo-adminduk",
        title: "Pelayanan Dokumen Kependudukan di Desa",
        level: "kabupaten",
        summary: "Pelayanan Adminduk (KK, Akta Kelahiran/Kematian) difasilitasi di kantor desa melalui sistem Paklay Komplit Disdukcapil.",
        sourceIds: ["setda-krg-surat-adminduk-2025"],
        sourceDate: "2025-08-26",
        status: "verified",
        reviewedAt: "2026-10-04"
      },
      {
        id: "ngringo-skck",
        title: "Pengantar SKCK & Layanan Berjenjang Kecamatan",
        level: "kecamatan",
        summary: "Standar pelayanan Kecamatan Jaten mensyaratkan surat pengantar dari pemerintah desa untuk proses SKCK.",
        sourceIds: ["kec-jaten-standar-pelayanan-2024"],
        sourceDate: "2024-09-30",
        status: "needs-confirmation",
        reviewedAt: "2026-10-04"
      }
    ],
    contact: {
      value: {
        address: "Desa Ngringo, Kecamatan Jaten, Kabupaten Karanganyar, Jawa Tengah"
      },
      sourceIds: ["opendata-ngringo-alamat"],
      asOf: "2023",
      verifiedAt: "2026-10-02",
      status: "needs-confirmation"
    },
    updatedAt: "2026-10-04",
    sourceIds: [
      "bps-jaten-2025",
      "opendata-ngringo-profil-2023",
      "opendata-ngringo-alamat",
      "opendata-ngringo-tusi",
      "rmol-jateng-pj-ngringo-2026",
      "kemendikdasmen-jaten",
      "puskesmas-jaten-2",
      "setda-krg-surat-adminduk-2025",
      "kec-jaten-standar-pelayanan-2024"
    ]
  },

  sroyo: {
    slug: "sroyo",
    name: "Sroyo",
    type: "desa",
    district: "Jaten",
    regency: "Karanganyar",
    province: "Jawa Tengah",
    summary: {
      value: "Desa Sroyo adalah desa terluas di antara tiga desa ini (459,78 ha) dengan kombinasi kawasan pemukiman, sentra industri, dan lahan pertanian.",
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    areaHa: {
      value: 459.78,
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    population: {
      value: { male: 5188, female: 5282, total: 10470 },
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    administration: {
      value: { dusun: 6, rw: 10, rt: 58 },
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    densityPerKm2: {
      value: 2277,
      sourceIds: ["bps-jaten-2025"],
      asOf: "2024",
      verifiedAt: "2026-10-02",
      status: "verified"
    },
    vision: {
      value: "Masyarakat yang beragama dan berbudaya, menuju keadilan dan kesejahteraan melalui gotong royong",
      sourceIds: ["opendata-sroyo-visimisi"],
      verifiedAt: "2026-10-02",
      status: "needs-confirmation"
    },
    mission: {
      value: [
        "Pemerintahan bersih",
        "Pemerataan infrastruktur",
        "Pengembangan BUMDes untuk pendapatan desa",
        "Inovasi ekonomi",
        "Perlindungan aset desa",
        "Kegiatan agama, sosial, budaya, dan olahraga"
      ],
      sourceIds: ["opendata-sroyo-visimisi"],
      verifiedAt: "2026-10-02",
      status: "needs-confirmation"
    },
    government: {
      structure: {
        value: [
          { title: "Kepala Desa" },
          { title: "Sekretariat Desa (Sekdes, Kaur TU & Umum, Kaur Keuangan, Kaur Perencanaan)", reportsTo: "Kepala Desa" },
          { title: "Pelaksana Teknis (Kasi Pemerintahan, Kasi Kesejahteraan, Kasi Pelayanan)", reportsTo: "Kepala Desa" },
          { title: "Pelaksana Kewilayahan (Kepala Dusun)", reportsTo: "Kepala Desa" }
        ],
        sourceIds: ["opendata-sroyo-struktur"],
        asOf: "2022",
        verifiedAt: "2026-10-02",
        status: "historical"
      },
      officials: {
        value: [
          {
            role: "Kepala Desa (tercatat dokumen portal)",
            name: "H. Yulianto, S.T.",
            termOrAsOf: "Dokumen profil desa (tanpa tanggal berlaku spesifik)"
          },
          {
            role: "Sekretaris Desa (pemberitaan)",
            name: "Eko Marwanto",
            termOrAsOf: "Disebut berita 5 Juni 2021"
          }
        ],
        sourceIds: ["opendata-sroyo-struktur"],
        asOf: "2021-2022",
        verifiedAt: "2026-10-02",
        status: "historical"
      }
    },
    publicInformation: [
      {
        title: "Fasilitas Pendidikan Negeri",
        description: "MIN 3 Karanganyar (NPSN 60711837), SD N 01 Sroyo (20312647), SD N 02 Sroyo (20312026), SDN 03 Sroyo (20311917), dan SMP N 2 Jaten (20312125).",
        sourceIds: ["kemendikdasmen-jaten"],
        dataYear: 2024
      },
      {
        title: "Fasilitas Pelayanan Kesehatan",
        description: "Wilayah Desa Sroyo terjangkau oleh wilayah pembinaan dan pelayanan UPT Puskesmas Jaten II.",
        sourceIds: ["puskesmas-jaten-2"],
        dataYear: 2024
      }
    ],
    services: [
      {
        id: "sroyo-adminduk",
        title: "Pelayanan Dokumen Kependudukan di Desa",
        level: "kabupaten",
        summary: "Warga mengajukan permohonan dokumen kependudukan ke kantor desa untuk diverifikasi sebelum diteruskan ke Disdukcapil.",
        sourceIds: ["setda-krg-surat-adminduk-2025"],
        sourceDate: "2025-08-26",
        status: "verified",
        reviewedAt: "2026-10-04"
      },
      {
        id: "sroyo-skck",
        title: "Pengantar SKCK & Layanan Berjenjang Kecamatan",
        level: "kecamatan",
        summary: "Standar pelayanan Kecamatan Jaten mencantumkan surat pengantar desa/kelurahan untuk pengurusan SKCK.",
        sourceIds: ["kec-jaten-standar-pelayanan-2024"],
        sourceDate: "2024-09-30",
        status: "needs-confirmation",
        reviewedAt: "2026-10-04"
      }
    ],
    contact: {
      value: {
        address: "Jl. Kasak No. 1, Kasak, Sroyo, Jaten, Karanganyar",
        publicPhone: "(0271) 826285",
        email: "Sroyojaten@gmail.com",
        website: "https://desasroyo.karanganyar.go.id"
      },
      sourceIds: ["opendata-sroyo-kontak"],
      verifiedAt: "2026-10-02",
      status: "needs-confirmation"
    },
    updatedAt: "2026-10-04",
    sourceIds: [
      "bps-jaten-2025",
      "opendata-sroyo-struktur",
      "opendata-sroyo-visimisi",
      "opendata-sroyo-kontak",
      "kemendikdasmen-jaten",
      "puskesmas-jaten-2",
      "setda-krg-surat-adminduk-2025",
      "kec-jaten-standar-pelayanan-2024"
    ]
  }
};

export const getVillageBySlug = (slug: string): Village | undefined => {
  return villagesRegistry[slug.toLowerCase()];
};

export const getAllVillages = (): Village[] => {
  return Object.values(villagesRegistry);
};

// Official records sample list adhering to PRD requirements
export const officialRecordsSeed: OfficialRecord[] = [
  {
    id: "rec-ngringo-pj-2026",
    village: "ngringo",
    name: "Apri Linawati",
    role: "Pj Kepala Desa",
    organization: "pemdes",
    sourceIds: ["rmol-jateng-pj-ngringo-2026"],
    sourceDate: "2026-09-16",
    sourceYear: 2026,
    status: "historical",
    reviewedAt: "2026-10-02",
    note: "Disebutkan dalam berita media sebagai Pj Kepala Desa Ngringo."
  },
  {
    id: "rec-ngringo-kades-2023",
    village: "ngringo",
    name: "Widodo, S.H., M.H.",
    role: "Kepala Desa",
    organization: "pemdes",
    sourceIds: ["opendata-ngringo-profil-2023"],
    sourceYear: 2023,
    status: "historical",
    reviewedAt: "2026-10-02",
    note: "Tercatat dalam dokumen Profil Perangkat Desa Ngringo Tahun 2023."
  },
  {
    id: "rec-dagen-kades-2022",
    village: "dagen",
    name: "Andi Susilo Purnomo, S.H.",
    role: "Kepala Desa",
    organization: "pemdes",
    sourceIds: ["artikel-pleret-dagen-2022"],
    sourceDate: "2022-11-26",
    sourceYear: 2022,
    status: "historical",
    reviewedAt: "2026-10-02",
    note: "Tercatat pada artikel kunjungan studi banding 2022 dan diberitakan kembali 2025."
  },
  {
    id: "rec-sroyo-kades-doc",
    village: "sroyo",
    name: "H. Yulianto, S.T.",
    role: "Kepala Desa",
    organization: "pemdes",
    sourceIds: ["opendata-sroyo-struktur"],
    sourceYear: 2022,
    status: "needs-confirmation",
    reviewedAt: "2026-10-02",
    note: "Tercantum dalam dokumen profil resmi tanpa rincian masa jabatan spesifik."
  }
];
