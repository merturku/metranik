import { describe, expect, it } from "vitest";
import { boruYalitimYuzeySicakligi } from "./boru-yalitim-yuzey-sicakligi";

describe("boru-yalitim-yuzey-sicakligi", () => {
  it("k=0.04, r1=30mm, r2=60mm, T1=150°C, Tamb=20°C, h=10 W/m²K → yüzey ~31.4°C, uygun", () => {
    const r = boruYalitimYuzeySicakligi.compute({
      izolasyonIsiIletkenligi_k_WmK: 0.04,
      boruDisYaricapi_r1_mm: 30,
      izolasyonDisYaricapi_r2_mm: 60,
      icSicaklik_T1_C: 150,
      ortamSicakligi_Tamb_C: 20,
      disTasinimKatsayisi_h_Wm2K: 10,
      izinVerilenMaxYuzeySicakligi_C: 60,
    });

    expect(r.intermediates.iletimDirenci_mKW).toBeCloseTo(2.758, 2);
    expect(r.intermediates.tasinimDirenci_mKW).toBeCloseTo(0.2653, 3);
    expect(r.intermediates.isiAkisi_Wm).toBeCloseTo(43.0, 1);
    expect(r.value.yuzeySicakligi_C).toBeCloseTo(31.41, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
});
