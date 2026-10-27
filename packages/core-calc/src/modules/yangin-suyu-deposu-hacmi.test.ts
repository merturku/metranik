import { describe, it, expect } from "vitest";
import { yanginSuyuDeposuHacmi, yanginSuyuDeposuHacmiInputSchema } from "./yangin-suyu-deposu-hacmi";

// TS EN 12845 Olağan Tehlike OH3: 5 mm/dk yoğunluk, 216 m² tasarım alanı, 60 dk; sprinkler başına 12 m²,
// K = 80, OH asgari basınç 0,35 bar
const oh3 = {
  tasarimYogunlugu_mm_dk: 5,
  tasarimAlani_m2: 216,
  sprinklerKorumaAlani_m2: 12,
  kFaktoru_Ldk_bar05: 80,
  asgariSprinklerBasinci_bar: 0.35,
  hortumDebisi_Ldk: 0,
  calismaSuresi_dk: 60,
};

const GAL = 3.785411784; // L
const FT2 = 0.09290304; // m²
const PSI = 0.0689475729; // bar

describe("Sprinkler Tasarım Debisi ve Yangın Suyu Deposu Hacmi", () => {
  it("EN 12845 OH3: 18 sprinkler × 60 L/dk = 1080 L/dk, 60 dk → 64,8 m³", () => {
    const r = yanginSuyuDeposuHacmi.compute(oh3);
    expect(r.intermediates.calisan_sprinkler_sayisi).toBe(18);
    expect(r.intermediates.sprinkler_toplam_debisi_Ldk).toBeCloseTo(1080, 6);
    expect(r.value.depoHacmi_m3).toBeCloseTo(64.8, 6);
  });

  it("OH3: belirleyici yoğunluk, sprinkler basıncı (60/80)² = 0,5625 bar", () => {
    const r = yanginSuyuDeposuHacmi.compute(oh3);
    expect(r.intermediates.belirleyici).toBe("Tasarım yoğunluğu");
    expect(r.intermediates.sprinkler_basinci_bar).toBeCloseTo(0.5625, 6);
  });

  it("EN 12845 Hafif Tehlike (2,25 mm/dk, 84 m², 21 m²/sprinkler, K = 57, 0,7 bar): asgari basınç belirleyici", () => {
    const r = yanginSuyuDeposuHacmi.compute({
      tasarimYogunlugu_mm_dk: 2.25,
      tasarimAlani_m2: 84,
      sprinklerKorumaAlani_m2: 21,
      kFaktoru_Ldk_bar05: 57,
      asgariSprinklerBasinci_bar: 0.7,
      hortumDebisi_Ldk: 0,
      calismaSuresi_dk: 30,
    });
    // D·As = 47,25 L/dk < K√0,7 = 47,69 L/dk
    expect(r.intermediates.belirleyici).toBe("Asgari sprinkler basıncı");
    expect(r.intermediates.sprinkler_basina_debi_Ldk).toBeCloseTo(57 * Math.sqrt(0.7), 6);
    expect(r.intermediates.sprinkler_basinci_bar).toBeCloseTo(0.7, 10);
    expect(r.value.depoHacmi_m3).toBeCloseTo((4 * 57 * Math.sqrt(0.7) * 30) / 1000, 6);
  });

  it("NFPA 13 OH2 metrik girdiyle ABD birimli el hesabını üretir: 0,20 gpm/ft² × 1500 ft², 130 ft², K 5,6, 250 gpm hortum, 90 dk", () => {
    const r = yanginSuyuDeposuHacmi.compute({
      tasarimYogunlugu_mm_dk: (0.2 * GAL) / FT2,
      tasarimAlani_m2: 1500 * FT2,
      sprinklerKorumaAlani_m2: 130 * FT2,
      kFaktoru_Ldk_bar05: (5.6 * GAL) / Math.sqrt(PSI),
      asgariSprinklerBasinci_bar: 7 * PSI,
      hortumDebisi_Ldk: 250 * GAL,
      calismaSuresi_dk: 90,
    });
    // ABD: n = ⌈1500/130⌉ = 12, q = 0,2 × 130 = 26 gpm, P = (26/5,6)² = 21,56 psi,
    // Q = 12 × 26 + 250 = 562 gpm, V = 562 × 90 = 50 580 gal
    expect(r.intermediates.calisan_sprinkler_sayisi).toBe(12);
    expect((r.intermediates.sprinkler_basinci_bar as number) / PSI).toBeCloseTo((26 / 5.6) ** 2, 6);
    expect((r.intermediates.toplam_debi_Ldk as number) / GAL).toBeCloseTo(562, 6);
    expect(r.value.depoHacmi_m3).toBeCloseTo((50580 * GAL) / 1000, 6);
    // Teorik D·A = 300 gpm < n·q = 312 gpm (tam sprinkler sayısına yuvarlama)
    expect((r.intermediates.yogunluk_alan_debisi_DxA_Ldk as number) / GAL).toBeCloseTo(300, 6);
  });

  it("Alan tam bölünüyorsa fazladan sprinkler sayılmaz; şema negatif yoğunluğu reddeder", () => {
    // JS'de 1,1/0,1 = 11,000000000000002
    const r = yanginSuyuDeposuHacmi.compute({ ...oh3, tasarimAlani_m2: 1.1, sprinklerKorumaAlani_m2: 0.1 });
    expect(r.intermediates.calisan_sprinkler_sayisi).toBe(11);
    expect(yanginSuyuDeposuHacmiInputSchema.safeParse({ ...oh3, tasarimYogunlugu_mm_dk: -5 }).success).toBe(false);
  });
});
