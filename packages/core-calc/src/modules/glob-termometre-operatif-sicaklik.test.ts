import { describe, it, expect } from "vitest";
import {
  globTermometreOperatifSicaklik,
  globTermometreOperatifSicaklikInputSchema,
} from "./glob-termometre-operatif-sicaklik";

const olcum = { globSicakligi_C: 25, havaSicakligi_C: 22, havaHizi_ms: 0.1, globCapi_m: 0.15, globYayiciligi: 0.95 };

describe("Ortalama Işınım ve Operatif Sıcaklık (Glob Termometre)", () => {
  it("tg = 25, ta = 22 °C, va = 0,1 m/s, D = 0,15 m: hcg zorlanmış 3,380 > doğal 2,961 → t̄r = 26,74 °C; A = 0,5 → to = 24,37 °C", () => {
    const r = globTermometreOperatifSicaklik.compute(olcum);
    expect(r.intermediates.tasinim_turu).toBe("Zorlanmış taşınım");
    expect(r.intermediates.tasinim_katsayisi_hcg_Wm2K).toBeCloseTo(3.3799, 4);
    expect(r.intermediates.ortalama_isinim_sicakligi_C).toBeCloseTo(26.7425, 3);
    expect(r.value.operatifSicaklik_C).toBeCloseTo((22 + 26.7425) / 2, 3);
  });

  it("Durgun hava (va = 0,01): doğal taşınım belirleyici → t̄r = 26,56 °C", () => {
    const r = globTermometreOperatifSicaklik.compute({ ...olcum, havaHizi_ms: 0.01 });
    expect(r.intermediates.tasinim_turu).toBe("Doğal taşınım");
    expect(r.intermediates.ortalama_isinim_sicakligi_C).toBeCloseTo(26.5625, 3);
  });

  it("Işınımlı ortam tg = 55, ta = 30 °C, va = 0,3 m/s: t̄r = 74,44 °C; A = 0,6 → to = 0,6×30 + 0,4×74,44 = 47,78 °C", () => {
    const r = globTermometreOperatifSicaklik.compute({ ...olcum, globSicakligi_C: 55, havaSicakligi_C: 30, havaHizi_ms: 0.3 });
    expect(r.intermediates.ortalama_isinim_sicakligi_C).toBeCloseTo(74.4433, 3);
    expect(r.intermediates.agirlik_katsayisi_A).toBe(0.6);
    expect(r.value.operatifSicaklik_C).toBeCloseTo(0.6 * 30 + 0.4 * 74.4433, 3);
  });

  it("Glob ile hava sıcaklığı eşitse t̄r = ta = to", () => {
    const r = globTermometreOperatifSicaklik.compute({ ...olcum, globSicakligi_C: 22 });
    expect(r.intermediates.ortalama_isinim_sicakligi_C).toBeCloseTo(22, 9);
    expect(r.value.operatifSicaklik_C).toBeCloseTo(22, 9);
  });

  it("Hava hızı 1 m/s'yi aşamaz (operatif sıcaklık katsayıları bu aralık için)", () => {
    expect(globTermometreOperatifSicaklikInputSchema.safeParse({ ...olcum, havaHizi_ms: 1.5 }).success).toBe(false);
  });
});
