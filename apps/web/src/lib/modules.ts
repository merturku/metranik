export interface ModuleEntry {
  id: string;
  title: string;
  href: string;
  standard: string;
}

export interface ModuleSubGroup {
  label: string;
  modules: ModuleEntry[];
}

export interface ModuleGroup {
  label: string;
  subgroups: ModuleSubGroup[];
}

const ISITMA_YUKU: ModuleEntry = { id: "isitma-yuku-ts825", title: "Isıtma Yükü", href: "/isitma-yuku", standard: "TS 825" };
const SOGUTMA_YUKU: ModuleEntry = { id: "sogutma-yuku", title: "Soğutma Yükü", href: "/sogutma-yuku", standard: "—" };
const HIDRONIK_SU_DEBISI: ModuleEntry = {
  id: "hidronik-su-debisi",
  title: "Hidronik Su Debisi",
  href: "/hidronik-su-debisi",
  standard: "—",
};
const BORU_BASINC_KAYBI: ModuleEntry = {
  id: "boru-basinc-kaybi",
  title: "Boru Basınç Kaybı",
  href: "/boru-basinc-kaybi",
  standard: "—",
};
const POMPA_SECIMI: ModuleEntry = { id: "pompa-secimi", title: "Pompa Seçimi", href: "/pompa-secimi", standard: "—" };
const GENLESME_TANKI: ModuleEntry = {
  id: "genlesme-tanki",
  title: "Genleşme Tankı",
  href: "/genlesme-tanki",
  standard: "—",
};
const SICAK_SU_BOYLER: ModuleEntry = {
  id: "sicak-su-boyler-din4708",
  title: "Sıcak Su / Boyler",
  href: "/sicak-su-boyler",
  standard: "—",
};
const KANAL_BOYUTLANDIRMA: ModuleEntry = {
  id: "kanal-boyutlandirma-smacna",
  title: "Kanal Boyutlandırma",
  href: "/kanal-boyutlandirma",
  standard: "SMACNA",
};
const TAZE_HAVA_DEBISI: ModuleEntry = {
  id: "taze-hava-ashrae62",
  title: "Taze Hava Debisi",
  href: "/taze-hava-debisi",
  standard: "ASHRAE 62.1",
};
const SPRINKLER: ModuleEntry = {
  id: "sprinkler-nfpa13",
  title: "Sprinkler Debi/Basınç",
  href: "/sprinkler",
  standard: "NFPA 13",
};
const KABLO_KESITI: ModuleEntry = {
  id: "kablo-kesiti-iec60364",
  title: "Kablo Kesiti + Gerilim Düşümü",
  href: "/kablo-kesiti",
  standard: "IEC 60364",
};
const KISA_DEVRE_AKIMI: ModuleEntry = {
  id: "kisa-devre-akimi",
  title: "Kısa Devre Akımı",
  href: "/kisa-devre-akimi",
  standard: "—",
};
const AYDINLATMA: ModuleEntry = {
  id: "aydinlatma-en12464",
  title: "Aydınlatma (Lüks Yöntemi)",
  href: "/aydinlatma",
  standard: "EN 12464-1",
};
const KOMPANZASYON: ModuleEntry = { id: "kompanzasyon", title: "Kompanzasyon", href: "/kompanzasyon", standard: "—" };
const DEPREM_TABAN_KESME: ModuleEntry = {
  id: "deprem-taban-kesme-tbdy2018",
  title: "Deprem Taban Kesme",
  href: "/deprem-taban-kesme",
  standard: "TBDY 2018",
};
const HIDROSTATIK_BASINC_TESTI: ModuleEntry = {
  id: "hidrostatik-basinc-testi",
  title: "Hidrostatik Basınç Testi",
  href: "/hidrostatik-basinc-testi",
  standard: "ASME B31 / NFPA 13",
};
const TOPRAKLAMA_DIRENCI_TESTI: ModuleEntry = {
  id: "topraklama-direnci-testi",
  title: "Topraklama Direnci Testi",
  href: "/topraklama-direnci-testi",
  standard: "IEC 60364-4-41",
};
const YALITIM_DIRENCI_TESTI: ModuleEntry = {
  id: "yalitim-direnci-testi",
  title: "Yalıtım Direnci Testi",
  href: "/yalitim-direnci-testi",
  standard: "IEC 60364-6",
};
const KESICI_KISA_DEVRE_KONTROLU: ModuleEntry = {
  id: "kesici-kisa-devre-kontrolu",
  title: "Kesici Kısa Devre Kapasitesi Kontrolü",
  href: "/kesici-kisa-devre-kontrolu",
  standard: "IEC 60947-2",
};
const ZEMIN_TASIMA_GUCU_KONTROLU: ModuleEntry = {
  id: "zemin-tasima-gucu-kontrolu",
  title: "Zemin Taşıma Gücü Kontrolü",
  href: "/zemin-tasima-gucu-kontrolu",
  standard: "—",
};
const HAVALANDIRMA_DEBI_KONTROLU: ModuleEntry = {
  id: "havalandirma-debi-kontrolu",
  title: "Havalandırma Debi Kontrolü",
  href: "/havalandirma-debi-kontrolu",
  standard: "—",
};
const BETON_BASINC_DAYANIMI_KONTROLU: ModuleEntry = {
  id: "beton-basinc-dayanimi-kontrolu",
  title: "Beton Basınç Dayanımı Kontrolü",
  href: "/beton-basinc-dayanimi-kontrolu",
  standard: "TS 500 / TS EN 13791",
};

export const MODUL_GRUPLARI: ModuleGroup[] = [
  {
    label: "Mekanik Tesisat",
    subgroups: [
      { label: "Isıtma-Soğutma", modules: [ISITMA_YUKU, SOGUTMA_YUKU] },
      {
        label: "Sıhhi Tesisat",
        modules: [HIDRONIK_SU_DEBISI, BORU_BASINC_KAYBI, POMPA_SECIMI, GENLESME_TANKI, SICAK_SU_BOYLER],
      },
      { label: "Havalandırma", modules: [KANAL_BOYUTLANDIRMA, TAZE_HAVA_DEBISI] },
      { label: "Yangın", modules: [SPRINKLER] },
      { label: "Test & Kontrol", modules: [HIDROSTATIK_BASINC_TESTI, HAVALANDIRMA_DEBI_KONTROLU] },
    ],
  },
  {
    label: "Elektrik Tesisat",
    subgroups: [
      {
        label: "Elektrik Tesisat",
        modules: [KABLO_KESITI, KISA_DEVRE_AKIMI, AYDINLATMA, KOMPANZASYON],
      },
      {
        label: "Test & Kontrol",
        modules: [TOPRAKLAMA_DIRENCI_TESTI, YALITIM_DIRENCI_TESTI, KESICI_KISA_DEVRE_KONTROLU],
      },
    ],
  },
  {
    label: "İnşaat Hesapları",
    subgroups: [
      { label: "İnşaat Hesapları", modules: [DEPREM_TABAN_KESME] },
      {
        label: "Test & Kontrol",
        modules: [ZEMIN_TASIMA_GUCU_KONTROLU, BETON_BASINC_DAYANIMI_KONTROLU],
      },
    ],
  },
];

export const TUM_MODULLER: ModuleEntry[] = MODUL_GRUPLARI.flatMap((g) =>
  g.subgroups.flatMap((sg) => sg.modules),
);

export function grupBasinaModulSayisi(grup: ModuleGroup): number {
  return grup.subgroups.reduce((toplam, sg) => toplam + sg.modules.length, 0);
}

export interface ModuleLocation {
  grup: string;
  altGrup: string;
  modul: ModuleEntry;
}

export function modulKonumu(moduleId: string): ModuleLocation | null {
  for (const grup of MODUL_GRUPLARI) {
    for (const sg of grup.subgroups) {
      const modul = sg.modules.find((m) => m.id === moduleId);
      if (modul) return { grup: grup.label, altGrup: sg.label, modul };
    }
  }
  return null;
}

export function ilgiliModuller(moduleId: string, limit = 4): ModuleEntry[] {
  for (const grup of MODUL_GRUPLARI) {
    for (const sg of grup.subgroups) {
      if (sg.modules.some((m) => m.id === moduleId)) {
        return sg.modules.filter((m) => m.id !== moduleId).slice(0, limit);
      }
    }
  }
  return [];
}
