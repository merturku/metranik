import { describe, it, expect } from "vitest";
import { eslikIsitmaGucIhtiyaci } from "./eslik-isitma-guc-ihtiyaci";

const g = { boruDisCapi_mm: 60.3, yalitimKalinligi_mm: 40, lambda_WmK: 0.04, tutulanSicaklik_C: 5, ortamSicakligi_C: -20, uzunluk_m: 100, pay: 0.2 };

describe("Eşlik Isıtma Güç İhtiyacı", () => {
  it("D1 60,3, t 40 (D2 140,3), λ 0,04, ΔT 25 K: q = 7,4406 W/m; 100 m, %20 pay → 892,87 W", () => {
    const r = eslikIsitmaGucIhtiyaci.compute(g);
    expect(r.value.birimKayip_Wm).toBeCloseTo(7.44056, 4);
    expect(r.intermediates.D2_mm as number).toBeCloseTo(140.3, 8);
    expect(r.intermediates.toplam_guc_W as number).toBeCloseTo(892.867, 2);
  });
  it("ΔT iki katı → q iki katı; ortam sıcaklığı tutulan sıcaklıktan yüksekse 0", () => {
    const a = eslikIsitmaGucIhtiyaci.compute(g).value.birimKayip_Wm;
    expect(eslikIsitmaGucIhtiyaci.compute({ ...g, ortamSicakligi_C: -45 }).value.birimKayip_Wm / a).toBeCloseTo(2, 10);
    expect(eslikIsitmaGucIhtiyaci.compute({ ...g, ortamSicakligi_C: 10 }).value.birimKayip_Wm).toBe(0);
  });
});
