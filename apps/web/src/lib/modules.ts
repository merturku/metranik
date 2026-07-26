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
const YANGIN_POMPASI_PERFORMANS_KONTROLU: ModuleEntry = {
  id: "yangin-pompasi-performans-kontrolu",
  title: "Yangın Pompası Performans Kontrolü",
  href: "/yangin-pompasi-performans-kontrolu",
  standard: "NFPA 20",
};
const PANO_SICAKLIK_ARTISI_KONTROLU: ModuleEntry = {
  id: "pano-sicaklik-artisi-kontrolu",
  title: "Pano Sıcaklık Artışı Kontrolü",
  href: "/pano-sicaklik-artisi-kontrolu",
  standard: "IEC 61439",
};
const KAR_YUKU_HESABI: ModuleEntry = {
  id: "kar-yuku-hesabi",
  title: "Kar Yükü Hesabı",
  href: "/kar-yuku-hesabi",
  standard: "EN 1991-1-3",
};
const ASKILAMA_HESABI: ModuleEntry = {
  id: "askilama-hesabi",
  title: "Askılama Hesabı",
  href: "/askilama-hesabi",
  standard: "—",
};
const GERILIM_DUSUMU_KONTROLU: ModuleEntry = {
  id: "gerilim-dusumu-kontrolu",
  title: "Gerilim Düşümü Kontrolü",
  href: "/gerilim-dusumu-kontrolu",
  standard: "IEC 60364-5-52",
};
const RUZGAR_YUKU_HESABI: ModuleEntry = {
  id: "ruzgar-yuku-hesabi",
  title: "Rüzgar Yükü Hesabı",
  href: "/ruzgar-yuku-hesabi",
  standard: "TS EN 1991-1-4",
};
const MERDIVEN_BASAMAK_HESABI: ModuleEntry = {
  id: "merdiven-basamak-hesabi",
  title: "Merdiven Basamak Hesabı",
  href: "/merdiven-basamak-hesabi",
  standard: "Blondel Formülü",
};
const TRAFO_GUC_SECIMI: ModuleEntry = {
  id: "trafo-guc-secimi",
  title: "Trafo Güç Seçimi",
  href: "/trafo-guc-secimi",
  standard: "—",
};
const JENERATOR_SECIMI: ModuleEntry = {
  id: "jenerator-secimi",
  title: "Jeneratör Seçimi",
  href: "/jenerator-secimi",
  standard: "—",
};
const YANGIN_DOLABI_DEBI_BASINC: ModuleEntry = {
  id: "yangin-dolabi-debi-basinc",
  title: "Yangın Dolabı Debi/Basınç",
  href: "/yangin-dolabi-debi-basinc",
  standard: "TS 9811",
};
const KLIMA_KAPASITE_SECIMI: ModuleEntry = {
  id: "klima-kapasite-secimi",
  title: "Klima (Split) Kapasite Seçimi",
  href: "/klima-kapasite-secimi",
  standard: "—",
};
const GUNES_PANELI_KAPASITE_HESABI: ModuleEntry = {
  id: "gunes-paneli-kapasite-hesabi",
  title: "Güneş Paneli (GES) Kapasite Hesabı",
  href: "/gunes-paneli-kapasite-hesabi",
  standard: "—",
};
const SU_DEPOSU_HACMI_HESABI: ModuleEntry = {
  id: "su-deposu-hacmi-hesabi",
  title: "Su Deposu Hacmi Hesabı",
  href: "/su-deposu-hacmi-hesabi",
  standard: "—",
};
const ISI_YALITIM_KALINLIGI_HESABI: ModuleEntry = {
  id: "isi-yalitim-kalinligi-hesabi",
  title: "Isı Yalıtım Kalınlığı Hesabı",
  href: "/isi-yalitim-kalinligi-hesabi",
  standard: "TS 825",
};
const EV_TESISATI_SIGORTA_YUKU_KONTROLU: ModuleEntry = {
  id: "ev-tesisati-sigorta-yuku-kontrolu",
  title: "Ev Tesisatı Sigorta Yükü Kontrolü",
  href: "/ev-tesisati-sigorta-yuku-kontrolu",
  standard: "IEC 60364",
};
const DONATI_KENETLENME_BOYU: ModuleEntry = {
  id: "donati-kenetlenme-boyu",
  title: "Donatı Kenetlenme Boyu",
  href: "/donati-kenetlenme-boyu",
  standard: "TS 500 / TBDY 2018",
};
const CELIK_BULON_SIKMA_MOMENTI: ModuleEntry = {
  id: "celik-bulon-sikma-momenti",
  title: "Çelik Yapı Bulon Sıkma Momenti",
  href: "/celik-bulon-sikma-momenti",
  standard: "TS EN 1090-2",
};
const TAZE_BETON_KALIP_BASINCI: ModuleEntry = {
  id: "taze-beton-kalip-basinci",
  title: "Taze Beton Kalıp Basıncı",
  href: "/taze-beton-kalip-basinci",
  standard: "ACI 347",
};
const KABLO_TAVA_DOLULUK_ORANI: ModuleEntry = {
  id: "kablo-tava-doluluk-orani",
  title: "Kablo Tava Doluluk Oranı",
  href: "/kablo-tava-doluluk-orani",
  standard: "TS EN 61537",
};
const PARATONER_KORUMA_YARICAPI: ModuleEntry = {
  id: "paratoner-koruma-yaricapi",
  title: "Paratoner Koruma Yarıçapı",
  href: "/paratoner-koruma-yaricapi",
  standard: "TS EN 62305",
};
const KOLON_BOYUTLANDIRMA: ModuleEntry = {
  id: "kolon-boyutlandirma",
  title: "Kolon Boyutlandırma (Eksenel Kapasite)",
  href: "/kolon-boyutlandirma",
  standard: "TS 500 / TBDY 2018",
};
const KIRIS_BOYUTLANDIRMA: ModuleEntry = {
  id: "kiris-boyutlandirma",
  title: "Kiriş Boyutlandırma (Moment Kapasitesi)",
  href: "/kiris-boyutlandirma",
  standard: "TS 500 / TBDY 2018",
};
const TEMEL_TASIMA_KAPASITESI_MEYERHOF: ModuleEntry = {
  id: "temel-tasima-kapasitesi-meyerhof",
  title: "Temel Taşıma Kapasitesi (Meyerhof)",
  href: "/temel-tasima-kapasitesi-meyerhof",
  standard: "Meyerhof",
};
const KABLO_AKIM_TASIMA_KAPASITESI_DUZELTMESI: ModuleEntry = {
  id: "kablo-akim-tasima-kapasitesi-duzeltmesi",
  title: "Kablo Akım Taşıma Kapasitesi Düzeltmesi",
  href: "/kablo-akim-tasima-kapasitesi-duzeltmesi",
  standard: "IEC 60364-5-52",
};
const YANGIN_ALGILAMA_LOOP_GERILIM_DUSUMU: ModuleEntry = {
  id: "yangin-algilama-loop-gerilim-dusumu",
  title: "Yangın Algılama Loop Gerilim Düşümü",
  href: "/yangin-algilama-loop-gerilim-dusumu",
  standard: "EN 54",
};
const DOSEME_KALINLIGI: ModuleEntry = {
  id: "doseme-kalinligi",
  title: "Döşeme Kalınlığı (Sehim Kontrolü)",
  href: "/doseme-kalinligi",
  standard: "TS 500 / TBDY 2018",
};
const SU_YALITIM_MEMBRAN_BINDIRME_KONTROLU: ModuleEntry = {
  id: "su-yalitim-membran-bindirme-kontrolu",
  title: "Su Yalıtımı Membran Bindirme Kontrolü",
  href: "/su-yalitim-membran-bindirme-kontrolu",
  standard: "DIN 18533",
};
const MOTOR_YOL_VERME_AKIMI: ModuleEntry = {
  id: "motor-yol-verme-akimi",
  title: "Motor Yol Verme Akımı",
  href: "/motor-yol-verme-akimi",
  standard: "—",
};
const UPS_BATARYA_KAPASITESI: ModuleEntry = {
  id: "ups-batarya-kapasitesi",
  title: "UPS / Batarya Kapasitesi",
  href: "/ups-batarya-kapasitesi",
  standard: "—",
};
const BARA_AKIM_TASIMA_KAPASITESI: ModuleEntry = {
  id: "bara-akim-tasima-kapasitesi",
  title: "Bara (Busbar) Akım Taşıma Kapasitesi",
  href: "/bara-akim-tasima-kapasitesi",
  standard: "—",
};

const YAGMUR_SUYU_DEBISI: ModuleEntry = {
  id: "yagmur-suyu-debisi",
  title: "Yağmur Suyu Debisi (Rasyonel Yöntem)",
  href: "/yagmur-suyu-debisi",
  standard: "Rasyonel Yöntem",
};
const ATIK_SU_DEBISI: ModuleEntry = {
  id: "atik-su-debisi",
  title: "Atık Su Debisi (Deşarj Birimi Yöntemi)",
  href: "/atik-su-debisi",
  standard: "EN 12056-2",
};
const EMNIYET_VENTILI_KAPASITESI: ModuleEntry = {
  id: "emniyet-ventili-kapasitesi",
  title: "Emniyet Ventili Kapasitesi",
  href: "/emniyet-ventili-kapasitesi",
  standard: "TS EN 12828",
};
const BUHAR_HAT_CAPI: ModuleEntry = {
  id: "buhar-hat-capi",
  title: "Buhar Hat Çapı",
  href: "/buhar-hat-capi",
  standard: "—",
};
const HAVA_KOMPRESORU_SECIMI: ModuleEntry = {
  id: "hava-kompresoru-secimi",
  title: "Hava Kompresörü Seçimi (FAD)",
  href: "/hava-kompresoru-secimi",
  standard: "—",
};
const ESANJOR_BOYUTLANDIRMA: ModuleEntry = {
  id: "esanjor-boyutlandirma",
  title: "Eşanjör Boyutlandırma (LMTD)",
  href: "/esanjor-boyutlandirma",
  standard: "—",
};
const ISI_POMPASI_KOMPRESOR_GUCU: ModuleEntry = {
  id: "isi-pompasi-kompresor-gucu",
  title: "Isı Pompası Kompresör Gücü",
  href: "/isi-pompasi-kompresor-gucu",
  standard: "—",
};
const RADYATOR_KAPASITE_DUZELTME: ModuleEntry = {
  id: "radyator-kapasite-duzeltme",
  title: "Radyatör Kapasite Düzeltmesi",
  href: "/radyator-kapasite-duzeltme",
  standard: "EN 442",
};
const GUNES_KOLLEKTORU_ALANI: ModuleEntry = {
  id: "gunes-kollektoru-alani",
  title: "Güneş Kollektörü Alanı",
  href: "/gunes-kollektoru-alani",
  standard: "—",
};
const FCU_SU_DEBISI: ModuleEntry = {
  id: "fcu-su-debisi",
  title: "FCU Su Debisi",
  href: "/fcu-su-debisi",
  standard: "—",
};

export const MODUL_GRUPLARI: ModuleGroup[] = [
  {
    label: "Mekanik Tesisat",
    subgroups: [
      {
        label: "Isıtma-Soğutma",
        modules: [
          ISITMA_YUKU,
          SOGUTMA_YUKU,
          EMNIYET_VENTILI_KAPASITESI,
          ESANJOR_BOYUTLANDIRMA,
          ISI_POMPASI_KOMPRESOR_GUCU,
          RADYATOR_KAPASITE_DUZELTME,
          GUNES_KOLLEKTORU_ALANI,
          FCU_SU_DEBISI,
        ],
      },
      {
        label: "Sıhhi Tesisat",
        modules: [
          HIDRONIK_SU_DEBISI,
          BORU_BASINC_KAYBI,
          POMPA_SECIMI,
          GENLESME_TANKI,
          SICAK_SU_BOYLER,
          ASKILAMA_HESABI,
          YAGMUR_SUYU_DEBISI,
          ATIK_SU_DEBISI,
        ],
      },
      { label: "Havalandırma", modules: [KANAL_BOYUTLANDIRMA, TAZE_HAVA_DEBISI] },
      { label: "Yangın", modules: [SPRINKLER, YANGIN_DOLABI_DEBI_BASINC] },
      { label: "Buhar", modules: [BUHAR_HAT_CAPI] },
      { label: "Basınçlı Hava", modules: [HAVA_KOMPRESORU_SECIMI] },
      {
        label: "Test & Kontrol",
        modules: [HIDROSTATIK_BASINC_TESTI, HAVALANDIRMA_DEBI_KONTROLU, YANGIN_POMPASI_PERFORMANS_KONTROLU],
      },
    ],
  },
  {
    label: "Elektrik Tesisat",
    subgroups: [
      {
        label: "Elektrik Tesisat",
        modules: [
          KABLO_KESITI,
          KISA_DEVRE_AKIMI,
          AYDINLATMA,
          KOMPANZASYON,
          TRAFO_GUC_SECIMI,
          JENERATOR_SECIMI,
          PARATONER_KORUMA_YARICAPI,
          KABLO_AKIM_TASIMA_KAPASITESI_DUZELTMESI,
          MOTOR_YOL_VERME_AKIMI,
          UPS_BATARYA_KAPASITESI,
          BARA_AKIM_TASIMA_KAPASITESI,
        ],
      },
      {
        label: "Test & Kontrol",
        modules: [
          TOPRAKLAMA_DIRENCI_TESTI,
          YALITIM_DIRENCI_TESTI,
          KESICI_KISA_DEVRE_KONTROLU,
          PANO_SICAKLIK_ARTISI_KONTROLU,
          GERILIM_DUSUMU_KONTROLU,
          KABLO_TAVA_DOLULUK_ORANI,
          YANGIN_ALGILAMA_LOOP_GERILIM_DUSUMU,
        ],
      },
    ],
  },
  {
    label: "İnşaat Hesapları",
    subgroups: [
      {
        label: "İnşaat Hesapları",
        modules: [
          DEPREM_TABAN_KESME,
          KAR_YUKU_HESABI,
          RUZGAR_YUKU_HESABI,
          MERDIVEN_BASAMAK_HESABI,
          DONATI_KENETLENME_BOYU,
          CELIK_BULON_SIKMA_MOMENTI,
          TAZE_BETON_KALIP_BASINCI,
          KOLON_BOYUTLANDIRMA,
          KIRIS_BOYUTLANDIRMA,
          TEMEL_TASIMA_KAPASITESI_MEYERHOF,
          DOSEME_KALINLIGI,
          SU_YALITIM_MEMBRAN_BINDIRME_KONTROLU,
        ],
      },
      {
        label: "Test & Kontrol",
        modules: [ZEMIN_TASIMA_GUCU_KONTROLU, BETON_BASINC_DAYANIMI_KONTROLU],
      },
    ],
  },
  {
    label: "Ev",
    subgroups: [
      {
        label: "Ev",
        modules: [
          KLIMA_KAPASITE_SECIMI,
          GUNES_PANELI_KAPASITE_HESABI,
          SU_DEPOSU_HACMI_HESABI,
          ISI_YALITIM_KALINLIGI_HESABI,
          EV_TESISATI_SIGORTA_YUKU_KONTROLU,
        ],
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
