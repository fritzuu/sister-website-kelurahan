export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt?: string; // ISO date jika tersedia
  dataYear?: number;
  accessedAt: string; // ISO date
  scope: string;
  note?: string;
};

export type Sourced<T> = {
  value: T;
  sourceIds: string[];
  asOf?: string; // misalnya "2024" atau tanggal konfirmasi
  verifiedAt?: string; // tanggal pemeriksaan
  status: "verified" | "needs-confirmation" | "historical";
};

export type OfficialRecord = {
  id: string;
  village: "dagen" | "ngringo" | "sroyo";
  name: string;
  role: string;
  organization: "pemdes" | "bpd" | "rt-rw" | "other";
  territory?: { dusun?: string; rw?: string; rt?: string };
  sourceIds: string[];
  sourceDate?: string;
  sourceYear?: number;
  termStart?: string;
  termEnd?: string;
  status: "historical" | "needs-confirmation" | "confirmed";
  reviewedAt: string;
  note?: string;
};

export type ServiceInfo = {
  id: string;
  title: string;
  level: "kabupaten" | "kecamatan" | "desa";
  summary: string;
  requirements?: string[];
  village?: "dagen" | "ngringo" | "sroyo";
  sourceIds: string[];
  sourceDate?: string;
  status: "verified" | "needs-confirmation" | "historical";
  reviewedAt: string;
};

export type Village = {
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
    structure?: Sourced<Array<{ title: string; reportsTo?: string }>>;
    officials?: Sourced<Array<{ role: string; name: string; termOrAsOf: string }>>;
  };
  publicInformation?: Array<{
    title: string;
    description: string;
    sourceIds: string[];
    dataYear?: number;
  }>;
  services?: ServiceInfo[];
  contact?: Sourced<{
    address?: string;
    publicPhone?: string;
    email?: string;
    website?: string;
    instagram?: string;
    mapUrl?: string;
  }>;
  media?: Array<{
    src: string;
    alt: string;
    credit: string;
    licenseOrPermission: string;
  }>;
  updatedAt: string;
  sourceIds: string[];
};
