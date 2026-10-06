import React from "react";
import { useParams, Link } from "react-router-dom";
import { getVillageBySlug, getAllVillages } from "../content/villages";
import { NotFoundPage } from "./NotFoundPage";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { StatCard } from "../components/StatCard";
import { VillageSectionNav } from "../components/VillageSectionNav";
import { VillageMap } from "../components/VillageMap";
import { OrganizationTree } from "../components/OrganizationTree";
import { ContactCard } from "../components/ContactCard";
import { ServiceCard } from "../components/ServiceCard";
import { SourceNote } from "../components/SourceNote";
import { SourceList } from "../components/SourceList";
import { PublicNotice } from "../components/PublicNotice";
import {
  BuildingIcon,
  ChartBarIcon,
  UsersIcon,
  MapPinIcon,
  ShieldCheckIcon,
  FileTextIcon,
  QuoteIcon,
  CompassIcon,
  BookOpenIcon,
  LandmarkIcon,
  AwardIcon,
  PhoneIcon
} from "../components/Icons";
import { usePageMeta } from "../utils/seo";
import { getVillageImage } from "../utils/villageImages";
import { districtContact } from "../content/site";
import { LoadingImage } from "../components/Loading";

export const VillagePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const village = slug ? getVillageBySlug(slug) : undefined;

  usePageMeta(
    village ? `Profil Desa ${village.name}: Kecamatan Jaten` : "Profil Desa",
    village?.summary?.value || `Informasi statistik wilayah, demografi, kelembagaan, dan profil Desa ${village?.name || ""}, Kecamatan Jaten.`
  );

  if (!village) {
    return <NotFoundPage attemptedSlug={slug} />;
  }

  const allVillages = getAllVillages();
  const otherVillages = allVillages.filter((v) => v.slug !== village.slug);
  const currentIndex = allVillages.findIndex((v) => v.slug === village.slug);
  const prevVillage = currentIndex > 0 ? allVillages[currentIndex - 1] : allVillages[allVillages.length - 1];
  const nextVillage = currentIndex < allVillages.length - 1 ? allVillages[currentIndex + 1] : allVillages[0];

  const hasProfile = Boolean(village.vision || village.mission || village.history);
  const hasTerritory = Boolean(village.areaHa || village.population || village.administration);
  const hasGovernment = Boolean(village.government?.structure || village.government?.officials);
  const hasServices = Boolean(village.services && village.services.length > 0);
  const hasPublicInfo = Boolean(village.publicInformation && village.publicInformation.length > 0);
  const hasContact = true;

  // Administrative codes lookup based on PRD Section 19.2
  const villageCodes: Record<string, { kemendagri?: string; kodePos?: string }> = {
    dagen: { kemendagri: "33.13.11.2004", kodePos: "57731" },
    ngringo: { kodePos: "57772" },
    sroyo: { kemendagri: "33.13.11.2007", kodePos: "57731" }
  };
  const codes = villageCodes[village.slug] || {};
  const photoUrl = getVillageImage(village.slug);

  // Calculations for gender balance display
  const totalPop = village.population?.value.total || 0;
  const malePop = village.population?.value.male || 0;
  const femalePop = village.population?.value.female || 0;
  const malePct = totalPop > 0 ? ((malePop / totalPop) * 100).toFixed(1) : "50.0";
  const femalePct = totalPop > 0 ? ((femalePop / totalPop) * 100).toFixed(1) : "50.0";

  // Leader official lookup
  const headOfficial = village.government?.officials?.value.find((o) =>
    o.role.toLowerCase().includes("kepala desa") || o.role.toLowerCase().includes("lurah")
  );
  const otherOfficials = village.government?.officials?.value.filter((o) => o !== headOfficial) || [];

  return (
    <div>
      <div className="container">
        {/* 1. Breadcrumbs */}
        <Breadcrumbs items={[{ label: `Desa ${village.name}` }]} />

        {/* 2. Authentic Civic Photo Hero Banner */}
        <header
          className="village-hero-banner"
        >
          <LoadingImage key={photoUrl} className="village-hero-photo" src={photoUrl} loading="eager" />
          <div className="village-hero-content">
            <div className="village-hero-eyebrow">
              <LandmarkIcon size={14} color="#BAE6FD" />
              <span>WILAYAH DESA • KECAMATAN JATEN • KAB. KARANGANYAR</span>
            </div>

            <h1 className="village-hero-title">
              Profil Desa {village.name}
            </h1>

            <p className="village-hero-desc">
              Pusat profil terpadu wilayah administrasi Desa {village.name}, mencakup struktur demografi penduduk 2024, bagan kelembagaan pemerintahan desa, sarana publik, dan rujukan dokumen terbuka.
            </p>

            <div className="village-hero-badges">
              {codes.kemendagri && (
                <div className="village-hero-pill">
                  <span>Kode Wilayah:</span>
                  <strong>{codes.kemendagri}</strong>
                </div>
              )}
              {codes.kodePos && (
                <div className="village-hero-pill">
                  <span>Kode Pos:</span>
                  <strong>{codes.kodePos}</strong>
                </div>
              )}
              <div className="village-hero-pill">
                <span>Rilis Data:</span>
                <strong>BPS 2024 (Publikasi 2025)</strong>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* 3. Section Navigation (Sticky anchor bar) */}
      <VillageSectionNav
        hasProfile={hasProfile}
        hasTerritory={hasTerritory}
        hasGovernment={hasGovernment}
        hasServices={hasServices}
        hasPublicInfo={hasPublicInfo}
        hasContact={hasContact}
      />

      {/* 4. Two-Column Layout (Main Content + Sidebar) */}
      <div className="container">
        <div className="village-layout">
          {/* Main Content Column */}
          <div className="village-main">
            {/* Sekilas & Statistics Dashboard */}
            <section aria-labelledby="sekilas-heading" style={{ marginBottom: "2.5rem" }}>
              <h2 id="sekilas-heading" className="sr-only">
                Sekilas Desa {village.name}
              </h2>

              {/* Executive Briefing Lead Card */}
              {village.summary && (
                <div className="village-lead-card">
                  <div className="village-lead-icon">
                    <BuildingIcon size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="village-lead-text">
                      {village.summary.value}
                    </p>
                    <div style={{ marginTop: "0.5rem" }}>
                      <SourceNote sourceIds={village.summary.sourceIds} asOf={village.summary.asOf} />
                    </div>
                  </div>
                </div>
              )}

              {/* Key Indicators Grid */}
              <div className="stat-grid">
                {village.population && (
                  <StatCard
                    label="Total Penduduk"
                    value={village.population.value.total.toLocaleString("id-ID")}
                    unit="jiwa"
                    asOf={village.population.asOf}
                    sourceIds={village.population.sourceIds}
                    icon={<UsersIcon size={18} color="var(--color-primary)" />}
                    variant="primary"
                  />
                )}

                {village.areaHa && (
                  <StatCard
                    label="Luas Wilayah"
                    value={village.areaHa.value.toLocaleString("id-ID")}
                    unit="ha"
                    asOf={village.areaHa.asOf}
                    sourceIds={village.areaHa.sourceIds}
                    icon={<MapPinIcon size={18} color="var(--color-primary)" />}
                  />
                )}

                {village.densityPerKm2 && (
                  <StatCard
                    label="Kepadatan Penduduk"
                    value={village.densityPerKm2.value.toLocaleString("id-ID")}
                    unit="jiwa/km²"
                    asOf={village.densityPerKm2.asOf}
                    sourceIds={village.densityPerKm2.sourceIds}
                    icon={<ChartBarIcon size={18} color="var(--color-primary)" />}
                  />
                )}

                {village.administration && (
                  <StatCard
                    label="Pembagian Wilayah"
                    value={`${village.administration.value.dusun} Dusun`}
                    unit={`(${village.administration.value.rw} RW / ${village.administration.value.rt} RT)`}
                    asOf={village.administration.asOf}
                    sourceIds={village.administration.sourceIds}
                    icon={<BuildingIcon size={18} color="var(--color-primary)" />}
                  />
                )}
              </div>
            </section>

            {/* Profil / Visi-Misi / Sejarah */}
            {hasProfile && (
              <section id="profil" className="village-section" aria-labelledby="profil-title">
                <h2 id="profil-title" className="village-section-title">
                  <BuildingIcon size={22} color="var(--color-primary)" />
                  Profil, Visi, dan Sejarah
                </h2>

                {/* Visi Pembangunan */}
                {village.vision && (
                  <div className="vision-card">
                    <div className="vision-card-header">
                      <QuoteIcon size={24} color="#BAE6FD" />
                      <span className="vision-badge">Visi Pembangunan Desa</span>
                    </div>
                    <blockquote className="vision-quote">
                      "{village.vision.value}"
                    </blockquote>
                    <SourceNote sourceIds={village.vision.sourceIds} />
                  </div>
                )}

                {/* Misi Pembangunan */}
                {village.mission && (
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ marginBottom: "1rem", fontSize: "1.15rem", color: "var(--color-primary-dark)" }}>
                      Misi Pembangunan Desa
                    </h3>
                    <div className="mission-grid">
                      {village.mission.value.map((m, idx) => (
                        <div key={idx} className="mission-card">
                          <div className="mission-number">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <p className="mission-text">{m}</p>
                        </div>
                      ))}
                    </div>
                    <SourceNote sourceIds={village.mission.sourceIds} />
                  </div>
                )}

                {/* Asal-Usul & Tradisi Sejarah */}
                {village.history && (
                  <div className="history-card">
                    <div className="history-card-header">
                      <CompassIcon size={20} color="var(--color-primary)" />
                      <h3 className="history-card-title">Asal-Usul & Tradisi Sejarah</h3>
                    </div>
                    <p className="history-card-body">{village.history.value}</p>
                    <SourceNote sourceIds={village.history.sourceIds} />
                  </div>
                )}
              </section>
            )}

            {/* Wilayah & Demografi */}
            {hasTerritory && (
              <section id="wilayah" className="village-section" aria-labelledby="wilayah-title">
                <h2 id="wilayah-title" className="village-section-title">
                  <MapPinIcon size={22} color="var(--color-primary)" />
                  Wilayah & Demografi Penduduk
                </h2>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                  Rincian data kependudukan berdasarkan jenis kelamin dan pembagian kewilayahan bersumber dari BPS Kabupaten Karanganyar 2024.
                </p>

                <VillageMap villageSlug={village.slug} title={`Peta wilayah Desa ${village.name}`} />

                {/* Visual Distribution Summary */}
                {village.population && (
                  <div className="demography-visual-grid">
                    {/* Gender Balance Card */}
                    <div className="gender-card">
                      <div className="gender-card-header">
                        <h3 className="gender-card-title">Distribusi Penduduk Berdasarkan Jenis Kelamin</h3>
                        <span style={{ fontSize: "0.78rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>
                          Total: {village.population.value.total.toLocaleString("id-ID")} Jiwa
                        </span>
                      </div>
                      <div className="gender-split-bar">
                        <div
                          className="gender-bar-male"
                          style={{ width: `${malePct}%` }}
                          title={`Laki-laki: ${malePop.toLocaleString("id-ID")} (${malePct}%)`}
                        />
                        <div
                          className="gender-bar-female"
                          style={{ width: `${femalePct}%` }}
                          title={`Perempuan: ${femalePop.toLocaleString("id-ID")} (${femalePct}%)`}
                        />
                      </div>
                      <div className="gender-stat-row">
                        <div className="gender-stat-item">
                          <span className="gender-indicator indicator-male" />
                          <div>
                            <strong>{malePop.toLocaleString("id-ID")}</strong>
                            <span style={{ color: "var(--color-text-subtle)", fontSize: "0.78rem", marginLeft: "0.3rem" }}>
                              Laki-Laki ({malePct}%)
                            </span>
                          </div>
                        </div>
                        <div className="gender-stat-item">
                          <span className="gender-indicator indicator-female" />
                          <div>
                            <strong>{femalePop.toLocaleString("id-ID")}</strong>
                            <span style={{ color: "var(--color-text-subtle)", fontSize: "0.78rem", marginLeft: "0.3rem" }}>
                              Perempuan ({femalePct}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Territory Units Summary */}
                    {village.administration && (
                      <div className="territory-units-card">
                        <h3 className="gender-card-title">Struktur Lingkungan Kewilayahan</h3>
                        <div className="territory-units-grid">
                          <div className="unit-box">
                            <div className="unit-box-value">{village.administration.value.dusun}</div>
                            <div className="unit-box-label">Dusun / Kebayanan</div>
                          </div>
                          <div className="unit-box">
                            <div className="unit-box-value">{village.administration.value.rw}</div>
                            <div className="unit-box-label">Rukun Warga (RW)</div>
                          </div>
                          <div className="unit-box">
                            <div className="unit-box-value">{village.administration.value.rt}</div>
                            <div className="unit-box-label">Rukun Tetangga (RT)</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Structured Data Table */}
                <div className="table-wrapper">
                  <table className="data-table" aria-label={`Tabel Demografi Desa ${village.name}`}>
                    <thead>
                      <tr>
                        <th scope="col">Indikator Kependudukan & Wilayah</th>
                        <th scope="col" style={{ textAlign: "right" }}>Nilai / Rincian</th>
                        <th scope="col" style={{ textAlign: "center" }}>Tahun Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Luas Wilayah Total</td>
                        <td style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                          {village.areaHa?.value.toLocaleString("id-ID")} ha
                        </td>
                        <td style={{ textAlign: "center", color: "var(--color-text-subtle)" }}>
                          {village.areaHa?.asOf || "2024"}
                        </td>
                      </tr>
                      <tr>
                        <td>Penduduk Laki-Laki</td>
                        <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>
                          {village.population?.value.male.toLocaleString("id-ID")} Jiwa
                        </td>
                        <td style={{ textAlign: "center", color: "var(--color-text-subtle)" }}>
                          {village.population?.asOf || "2024"}
                        </td>
                      </tr>
                      <tr>
                        <td>Penduduk Perempuan</td>
                        <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>
                          {village.population?.value.female.toLocaleString("id-ID")} Jiwa
                        </td>
                        <td style={{ textAlign: "center", color: "var(--color-text-subtle)" }}>
                          {village.population?.asOf || "2024"}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: 700, backgroundColor: "var(--color-primary-light)" }}>
                        <td>Total Jumlah Penduduk</td>
                        <td style={{ textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--color-primary-dark)" }}>
                          {village.population?.value.total.toLocaleString("id-ID")} Jiwa
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {village.population?.asOf || "2024"}
                        </td>
                      </tr>
                      <tr>
                        <td>Kepadatan Penduduk Rata-Rata</td>
                        <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>
                          {village.densityPerKm2?.value.toLocaleString("id-ID")} Jiwa/km²
                        </td>
                        <td style={{ textAlign: "center", color: "var(--color-text-subtle)" }}>
                          {village.densityPerKm2?.asOf || "2024"}
                        </td>
                      </tr>
                      <tr>
                        <td>Jumlah Dusun / Kebayanan</td>
                        <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>
                          {village.administration?.value.dusun} Dusun
                        </td>
                        <td style={{ textAlign: "center", color: "var(--color-text-subtle)" }}>
                          {village.administration?.asOf || "2024"}
                        </td>
                      </tr>
                      <tr>
                        <td>Jumlah Rukun Warga (RW)</td>
                        <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>
                          {village.administration?.value.rw} RW
                        </td>
                        <td style={{ textAlign: "center", color: "var(--color-text-subtle)" }}>
                          {village.administration?.asOf || "2024"}
                        </td>
                      </tr>
                      <tr>
                        <td>Jumlah Rukun Tetangga (RT)</td>
                        <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>
                          {village.administration?.value.rt} RT
                        </td>
                        <td style={{ textAlign: "center", color: "var(--color-text-subtle)" }}>
                          {village.administration?.asOf || "2024"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Pemerintahan */}
            {hasGovernment && (
              <section id="pemerintahan" className="village-section" aria-labelledby="pemerintahan-title">
                <h2 id="pemerintahan-title" className="village-section-title">
                  <UsersIcon size={22} color="var(--color-primary)" />
                  Struktur Pemerintahan & Perangkat Desa
                </h2>

                {/* Leadership Executive Showcase (if Kepala Desa recorded) */}
                {headOfficial && (
                  <div className="leadership-showcase-card">
                    <div className="leadership-avatar">
                      <AwardIcon size={26} color="var(--color-primary)" />
                    </div>
                    <div>
                      <div className="leadership-role">{headOfficial.role}</div>
                      <div className="leadership-name">{headOfficial.name}</div>
                      <div className="leadership-term">{headOfficial.termOrAsOf}</div>
                    </div>
                  </div>
                )}

                {/* Hierarchical Structure Diagram */}
                {village.government?.structure && (
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem", color: "var(--color-primary-dark)" }}>
                      Bagan Struktur Organisasi Pemerintah Desa
                    </h3>
                    <OrganizationTree
                      nodes={village.government.structure.value}
                      sourceNote={
                        <SourceNote
                          sourceIds={village.government.structure.sourceIds}
                          asOf={village.government.structure.asOf}
                        />
                      }
                    />
                  </div>
                )}

                {/* Perangkat Desa Official Roster */}
                {otherOfficials.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem", color: "var(--color-primary-dark)" }}>
                      Daftar Aparatur & Perangkat yang Tercatat
                    </h3>

                    <div className="table-wrapper">
                      <table className="data-table" aria-label={`Daftar Pejabat Tercatat Desa ${village.name}`}>
                        <thead>
                          <tr>
                            <th scope="col">Jabatan / Fungsi</th>
                            <th scope="col">Nama Aparatur</th>
                            <th scope="col">Keterangan Sumber / Periode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {otherOfficials.map((officer, idx) => (
                            <tr key={idx}>
                              <td>
                                <strong>{officer.role}</strong>
                              </td>
                              <td>{officer.name}</td>
                              <td style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                                {officer.termOrAsOf}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {village.government?.officials?.sourceIds && (
                      <SourceNote sourceIds={village.government.officials.sourceIds} />
                    )}
                  </div>
                )}
              </section>
            )}

            {/* Layanan & Informasi Publik */}
            <section id="layanan" className="village-section" aria-labelledby="layanan-title">
              <h2 id="layanan-title" className="village-section-title">
                <ShieldCheckIcon size={22} color="var(--color-primary)" />
                Layanan & Alur Administrasi Warga
              </h2>

              <PublicNotice type="warning">
                <p>
                  <strong>Pemberitahuan Layanan Publik:</strong> Permohonan administrasi kependudukan dapat diajukan melalui Kantor Desa setempat atau aplikasi resmi Disdukcapil Kabupaten Karanganyar.
                </p>
              </PublicNotice>

              {village.services && village.services.length > 0 ? (
                <div className="service-grid">
                  {village.services.map((srv) => (
                    <ServiceCard key={srv.id} service={srv} />
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--color-text-subtle)", fontStyle: "italic" }}>
                  Informasi alur layanan administrasi belum dipublikasikan.
                </p>
              )}
            </section>

            {/* Potensi & Fasilitas Publik */}
            {hasPublicInfo && (
              <section id="potensi" className="village-section" aria-labelledby="potensi-title">
                <h2 id="potensi-title" className="village-section-title">
                  <ChartBarIcon size={22} color="var(--color-primary)" />
                  Fasilitas Publik & Potensi Wilayah
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.25rem" }}>
                  {village.publicInformation?.map((item, idx) => {
                    const isEdu = item.title.toLowerCase().includes("pendidikan") || item.title.toLowerCase().includes("sekolah");
                    return (
                      <div key={idx} className="feature-card">
                        <div className="feature-card-header">
                          <div className="feature-card-icon">
                            {isEdu ? (
                              <BookOpenIcon size={20} color="var(--color-primary)" />
                            ) : (
                              <ShieldCheckIcon size={20} color="var(--color-primary)" />
                            )}
                          </div>
                          <h3 className="feature-card-title">{item.title}</h3>
                        </div>
                        <p className="feature-card-desc">{item.description}</p>
                        <SourceNote sourceIds={item.sourceIds} asOf={item.dataYear?.toString()} />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Kontak & Lokasi */}
            <section id="kontak" className="village-section" aria-labelledby="kontak-title">
              <h2 id="kontak-title" className="village-section-title">
                <MapPinIcon size={22} color="var(--color-primary)" />
                Kontak & Lokasi Kantor
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.5rem" }}>
                <div>
                  <ContactCard
                    villageName={village.name}
                    contact={village.contact?.value}
                    sourceIds={village.contact?.sourceIds}
                    status={village.contact?.status}
                  />
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "1.5rem",
                      boxShadow: "var(--shadow-xs)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
                      <div className="service-icon-wrap">
                        <LandmarkIcon size={20} color="var(--color-primary)" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.05rem", margin: 0, color: "var(--color-primary-dark)" }}>
                          Kantor Kecamatan Jaten
                        </h3>
                        <span style={{ fontSize: "0.78rem", color: "var(--color-text-subtle)" }}>
                          Instansi Induk Administratif Wilayah
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: "1rem", lineHeight: 1.6 }}>
                      Apabila saluran komunikasi desa belum dapat dihubungi, permohonan informasi dapat dikoordinasikan langsung ke Pemerintah Kecamatan Jaten.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <MapPinIcon size={16} color="var(--color-primary)" />
                        <span>{districtContact.address}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <PhoneIcon size={16} color="var(--color-primary)" />
                        <span>{districtContact.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="peta-kantor" className="village-section" aria-labelledby="peta-kantor-title">
              <h2 id="peta-kantor-title" className="village-section-title">
                <MapPinIcon size={22} color="var(--color-primary)" />
                Peta Lokasi Pelayanan
              </h2>
              <p>Lihat lokasi desa dan rujukan kantor pelayanan. Pilih lokasi untuk membuka petunjuk arah atau pencarian alamat kantor.</p>
              <VillageMap villageSlug={village.slug} offices title={`Peta kantor pelayanan Desa ${village.name} dan Kecamatan Jaten`} />
            </section>

            {/* Sumber Halaman */}
            <section id="sumber-halaman" className="village-section" aria-labelledby="sumber-title">
              <h2 id="sumber-title" className="village-section-title">
                <FileTextIcon size={22} color="var(--color-primary)" />
                Daftar Rujukan Sumber Khusus Desa {village.name}
              </h2>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                Berikut dokumen dan basis data resmi yang dijadikan dasar penyusunan seluruh data di halaman ini:
              </p>
              <SourceList sourceIds={village.sourceIds} />
            </section>
          </div>

          {/* Sidebar Column (Quick Info & Navigation) */}
          <aside className="village-sidebar" aria-label="Informasi Cepat dan Navigasi Samping">
            {/* Sidebar Card 1: Identitas & Indikator Pokok */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Ringkasan Wilayah</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
                {codes.kemendagri && (
                  <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.4rem" }}>
                    <span style={{ color: "var(--color-text-subtle)" }}>Kode Kemendagri</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{codes.kemendagri}</span>
                  </li>
                )}
                {codes.kodePos && (
                  <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.4rem" }}>
                    <span style={{ color: "var(--color-text-subtle)" }}>Kode Pos</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{codes.kodePos}</span>
                  </li>
                )}
                <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--color-text-subtle)" }}>Luas Wilayah</span>
                  <strong>{village.areaHa?.value.toLocaleString("id-ID")} ha</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--color-text-subtle)" }}>Total Penduduk</span>
                  <strong>{village.population?.value.total.toLocaleString("id-ID")} jiwa</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--color-text-subtle)" }}>Kepadatan</span>
                  <strong>{village.densityPerKm2?.value.toLocaleString("id-ID")} jiwa/km²</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-text-subtle)" }}>Pembagian</span>
                  <strong>
                    {village.administration?.value.dusun} Dusun / {village.administration?.value.rw} RW
                  </strong>
                </li>
              </ul>
            </div>

            {/* Sidebar Card 2: Navigasi Bagian Cepat */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Navigasi Halaman</h3>
              <ul className="sidebar-nav-list">
                {hasProfile && (
                  <li>
                    <a href="#profil" className="sidebar-nav-link">
                      <BuildingIcon size={14} /> Profil & Sejarah
                    </a>
                  </li>
                )}
                {hasTerritory && (
                  <li>
                    <a href="#wilayah" className="sidebar-nav-link">
                      <MapPinIcon size={14} /> Wilayah & Demografi
                    </a>
                  </li>
                )}
                {hasGovernment && (
                  <li>
                    <a href="#pemerintahan" className="sidebar-nav-link">
                      <UsersIcon size={14} /> Pemerintahan
                    </a>
                  </li>
                )}
                {hasServices && (
                  <li>
                    <a href="#layanan" className="sidebar-nav-link">
                      <ShieldCheckIcon size={14} /> Layanan Publik
                    </a>
                  </li>
                )}
                {hasPublicInfo && (
                  <li>
                    <a href="#potensi" className="sidebar-nav-link">
                      <ChartBarIcon size={14} /> Fasilitas & Potensi
                    </a>
                  </li>
                )}
                <li>
                  <a href="#kontak" className="sidebar-nav-link">
                    <PhoneIcon size={14} /> Kontak Kantor
                  </a>
                </li>
                <li>
                  <a href="#peta-kantor" className="sidebar-nav-link">
                    <MapPinIcon size={14} /> Peta Pelayanan
                  </a>
                </li>
                <li>
                  <a href="#sumber-halaman" className="sidebar-nav-link">
                    <FileTextIcon size={14} /> Rujukan Dokumen
                  </a>
                </li>
              </ul>
            </div>

            {/* Sidebar Card 3: Desa Lainnya di Jaten (Interactive switcher) */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Desa Lainnya di Jaten</h3>
              <div className="other-villages-list">
                {otherVillages.map((other) => (
                  <Link
                    key={other.slug}
                    to={`/desa/${other.slug}`}
                    className="other-village-item"
                    title={`Buka profil Desa ${other.name}`}
                  >
                    <div
                      className="other-village-thumb"
                      style={{
                        backgroundImage: `url('${getVillageImage(other.slug)}')`
                      }}
                    />
                    <div className="other-village-info">
                      <span className="other-village-name">Desa {other.name}</span>
                      <span className="other-village-stats">
                        {other.population?.value.total.toLocaleString("id-ID")} jiwa • {other.areaHa?.value} ha
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Link to="/" className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                  Semua Tiga Desa (Beranda)
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Prev / Next Village Bottom Nav */}
        <nav className="prev-next-nav" aria-label="Navigasi Bawah Antar Desa">
          <Link to={`/desa/${prevVillage.slug}`} className="btn btn-secondary">
            ← Profil Desa {prevVillage.name}
          </Link>
          <Link to="/" className="btn btn-primary">
            Kembali ke Beranda
          </Link>
          <Link to={`/desa/${nextVillage.slug}`} className="btn btn-secondary">
            Profil Desa {nextVillage.name} →
          </Link>
        </nav>
      </div>
    </div>
  );
};
