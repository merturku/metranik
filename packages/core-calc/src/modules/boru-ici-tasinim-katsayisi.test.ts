import { describe, it, expect } from "vitest";
import { boruIciTasinimKatsayisi, boruIciTasinimKatsayisiInputSchema } from "./boru-ici-tasinim-katsayisi";

// ≈ 60 °C su: ν = 0,475 mm²/s (0,475·10⁻⁶ m²/s), k = 0,654 W/(m·K), Pr = 2,99
const su = {
  hiz_ms: 1,
  icCap_mm: 25,
  kinematikViskozite_mm2s: 0.475,
  isilIletkenlik_WmK: 0.654,
  prandtl: 2.99,
  isiAkisYonu: "isitma" as const,
  sinirKosulu: "sabitSicaklik" as const,
};

describe("Boru İçi Taşınım Katsayısı", () => {
  it("1 m/s, Ø25 mm: Re = 52 632; Petukhov f = (0,790 ln Re − 1,64)⁻² = 0,02071", () => {
    const r = boruIciTasinimKatsayisi.compute(su);
    expect(r.intermediates.reynolds_sayisi).toBeCloseTo(52631.58, 1);
    expect(r.intermediates.surtunme_katsayisi_f).toBeCloseTo(0.0207139, 6);
  });

  it("Gnielinski Nu = (f/8)(Re − 1000)Pr / [1 + 12,7√(f/8)(Pr^(2/3) − 1)] = 235,82 → h = Nu·k/D = 6169 W/(m²·K)", () => {
    const r = boruIciTasinimKatsayisi.compute(su);
    expect(r.intermediates.nusselt_gnielinski).toBeCloseTo(235.8248, 3);
    expect(r.value.h_Wm2K).toBeCloseTo(6169.18, 1);
  });

  it("Karşılaştırma: Dittus-Boelter (ısıtma, n = 0,4) Nu = 0,023·Re^0,8·Pr^0,4 = 213,30", () => {
    const r = boruIciTasinimKatsayisi.compute(su);
    expect(r.intermediates.nusselt_dittus_boelter).toBeCloseTo(213.3013, 3);
  });

  it("Laminer (Re = 2105): tam gelişmiş Nu = 3,66 (sabit yüzey sıcaklığı) → h = 119,7; sabit ısı akısında 4,36 → 142,6", () => {
    const laminer = { ...su, hiz_ms: 0.05, icCap_mm: 20 };
    const r = boruIciTasinimKatsayisi.compute(laminer);
    expect(r.intermediates.akis_rejimi).toBe("laminer");
    expect(r.value.h_Wm2K).toBeCloseTo(119.682, 3);
    const q = boruIciTasinimKatsayisi.compute({ ...laminer, sinirKosulu: "sabitIsiAkisi" });
    expect(q.value.h_Wm2K).toBeCloseTo(142.572, 3);
    expect(r.intermediates.nusselt_dittus_boelter).toBe("geçerli değil (Re < 10 000)");
  });

  it("Re = 2600 geçiş bölgesinde Gnielinski kullanılır ve rejim işaretlenir; şema sıfır çapı reddeder", () => {
    const r = boruIciTasinimKatsayisi.compute({ ...su, hiz_ms: 0.0494 });
    expect(r.intermediates.akis_rejimi).toBe("geçiş (belirsizlik yüksek)");
    expect(r.intermediates.nusselt_gnielinski).toBeCloseTo(13.9132, 3);
    expect(boruIciTasinimKatsayisiInputSchema.safeParse({ ...su, icCap_mm: 0 }).success).toBe(false);
  });
});
